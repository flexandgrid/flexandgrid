(async function () {
  const PAGE_NAME = window.location.pathname.split('/')[1];

  const normalize = (markdown) => {
    return markdown
      .replace(/\r\n?/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .split('\n');
  };

  const parse = (token, { regex, tagName, replace }) => {
    return token.replace(regex, replace ?? `<${tagName}>$1</${tagName}>`);
  };

  const codeBlockStart = {
    regex: /^\s*`{3}(.+)/,
    replace: '<pre><code>$1'
  };

  const codeBlockEnd = {
    regex: /(.*)`{3}\s*$/,
    replace: '$1</code></pre>'
  };

  const unorderedListItem = {
    regex: /^\s*-\s(.+)/,
    replace: '<li>$1'
  };

  const orderedListItem = {
    regex: /^\s*(\d+\.\s.+)/,
    replace: '<li>$1'
  };

  const tableRow = {
    regex: /^\|(.+)\|$/,
    replace: (_, group) => {
      const heads = group
        .split('|')
        .map((text) => `<td>${text.trim()}</td>`)
        .join('');
      return `<tr>${heads}</tr>`;
    }
  };

  const tableDivision = {
    regex: /^\|(([-|]|\s)+)\|$/,
    replace: ''
  };

  const heading = {
    regex: /^\s*(#+)\s(.+)/,
    replace: (_, mark, group) => {
      const tagName = `h${mark.length + 1}`;
      return `<${tagName} id="${group.replace(
        /(\*{2})|`/g,
        ''
      )}">${group}</${tagName}>`;
    }
  };

  const figure = {
    regex: /^\s*!\[(.*)\]\((.+)\)/,
    replace: (_, g1, g2) => {
      const width = g2.match(/^\d+_{2}(\d+)\..+$/)?.[1];
      return `<figure><img src="${
        window.location.origin
      }/src/pages/${PAGE_NAME}/images/${g2}"${
        width ? ` style="width: ${width}px;"` : ''
      }>${g1 ? `<figcaption>${g1}</figcaption>` : ''}</figure>`;
    }
  };

  const paragraph = {
    regex: /(?<=^|\n)(.+)$/,
    tagName: 'p',
    replace: (matched) =>
      /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img|code)/.test(matched)
        ? matched
        : '<p>' + matched + '</p>'
  };

  const link = {
    regex: /\[(.+)\]\((.+)\)/g,
    replace: '<a href="$2">$1</a>'
  };

  const strong = {
    regex: /\*{2}(([^*])+)\*{2}/g,
    tagName: 'strong'
  };

  const code = {
    regex: /`([^`]+)`/g,
    tagName: 'code'
  };

  const listDepth = (token) => {
    const indentation = token.match(/^\s*(?=-|(\d+\.))/)[0].length;
    return indentation % 2 ? indentation - 1 : indentation;
  };

  const blockRules = [
    codeBlockStart,
    unorderedListItem,
    orderedListItem,
    tableDivision,
    tableRow,
    heading,
    figure
  ];

  const inlineRules = [link, strong, code];

  const parseMarkdown = (markdown) => {
    const tokens = normalize(markdown);
    let isEditor = false;
    let codeBlockStartIndex = -1;
    let tableStartIndex = -1;
    let curListDepth = -1;
    const listStack = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      // 코드 블럭이 아닐 때
      if (codeBlockStartIndex === -1) {
        const rule =
          blockRules.find(({ regex }) => regex.test(token)) ?? paragraph;
        tokens[i] = parse(token, rule);

        switch (rule) {
          case codeBlockStart:
            codeBlockStartIndex = i;
            const codeType = tokens[i].match(/<code>(.+)$/)?.[1];
            if (codeType === 'editor') {
              isEditor = true;
              tokens[i] = '';
            } else {
              tokens[i] = tokens[i].replace(codeType, '');
            }
            break;

          case unorderedListItem:
          case orderedListItem:
            const tagName = rule === unorderedListItem ? 'ul' : 'ol';
            const depth = listDepth(token);
            if (depth > curListDepth) {
              tokens[i] = `<${tagName}>` + tokens[i];
              listStack.push(`</${tagName}>`);
            } else if (depth < curListDepth) {
              let depthDiff = (curListDepth - depth) / 2;
              while (depthDiff) {
                const tag = listStack.pop();
                tokens[i - 1] += tag;
                if (tag === `</${tagName}>`) {
                  depthDiff--;
                }
              }
              tokens[i - 1] += listStack.pop();
            } else {
              tokens[i - 1] += listStack.pop();
            }
            curListDepth = depth;
            listStack.push('</li>');
            break;

          case tableRow:
            if (tableStartIndex === -1) {
              tableStartIndex = i;
              tokens[i] = '<table>' + tokens[i].replace(/(\<\/?)td>/g, '$1th>');
            }
            break;

          default:
            if (token.trim() === '') {
              if (listStack.length) {
                while (listStack.length) {
                  tokens[i - 1] += listStack.pop();
                }
                curListDepth = -1;
              }

              if (tableStartIndex >= 0) {
                tokens[i - 1] += '</table>';
                tableStartIndex = -1;
              }

              isEditor = false;
            }
        }
        // 코드 블럭일 때
      } else {
        if (token.trim() === '') {
          tokens[i] = '\n\n';
        }
        if (!isEditor) {
          tokens[i] = token
            .replaceAll('<', '&#60;')
            .replaceAll('>', '&#62;')
            .replaceAll(' ', '&nbsp;');
        }
        if (codeBlockEnd.regex.test(token)) {
          tokens[i] = parse(token, codeBlockEnd);
          codeBlockStartIndex = -1;
          isEditor = false;
        } else {
          tokens[i] += '\n';
        }
      }
    }

    tokens.forEach((_, index) => {
      inlineRules.forEach((rule) => {
        if (rule.regex.test(tokens[index])) {
          tokens[index] = parse(tokens[index], rule);
        }
      });
    });

    return tokens.filter(Boolean);
  };

  const fetchMarkdown = async () => {
    const res = await fetch(
      `${window.location.origin}/src/pages/${PAGE_NAME}/article.md`
    );
    const markdown = await res.text();
    return markdown;
  };

  const renderMenu = (html) => {
    const menuTitles = html
      .filter((v) => /^<h\d+\sid=/.test(v))
      .map((heading) => {
        const title = heading
          .replace(/^<h(\d+)\sid="(.+)">(.+)<\/h\d>$/, '$1 $2')
          .split(' ');
        return [Number(title[0]), title.slice(1).join(' ')];
      });

    let subMenu = null;

    const mainList = document.createElement('ol');
    mainList.setAttribute('class', 'list-drawer-menu');

    menuTitles.forEach(([depth, title]) => {
      if (depth === 2) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', `#${title}`);
        link.setAttribute('class', 'tit-drawer-menu');
        link.textContent = title;
        const list = document.createElement('ol');
        list.setAttribute('class', 'subtit-drawer-menu');
        item.appendChild(link);
        item.appendChild(list);
        mainList.appendChild(item);
        subMenu = list;
      } else {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.setAttribute('href', `#${title}`);
        link.textContent = title;
        item.appendChild(link);
        subMenu.appendChild(item);
      }
    });

    const button = document.querySelector(`.btn-${PAGE_NAME}`);
    button.appendChild(mainList);
  };

  const renderContent = (html) => {
    const div = document.querySelector(`.cont-${PAGE_NAME}`);
    const innerHTML = [...html];
    let isFirst = true;
    innerHTML.forEach((token, index) => {
      if (/^<h\d+/.test(token) && token.match(/^<h(\d+)/)[1] === '2') {
        if (isFirst) {
          innerHTML[index] = '<article>' + token;
          isFirst = false;
        } else {
          innerHTML[index - 1] += '</article>';
          innerHTML[index] = '<article>' + token;
        }
      }
      if (index === innerHTML.length - 1) {
        innerHTML[index] += '</article>';
      }
    });
    div.innerHTML = innerHTML.join('');
  };

  const render = async () => {
    const markdown = await fetchMarkdown();
    const html = parseMarkdown(markdown);
    renderMenu(html);
    renderContent(html);
    window.dispatchEvent(new Event('markdownParsed'));
  };

  render();
})();
