(function () {
  class Tag {
    constructor({ className, elem }) {
      this.className = className;
      this._initElem(elem);
      this._initClassName();
    }

    static setAttributes(elem, options) {
      Object.entries(options).forEach(([attribute, value]) =>
        elem.setAttribute(attribute, value)
      );
    }

    static appendChildren(elem, children) {
      children.forEach((child) => {
        if (typeof child === 'string') {
          elem.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          elem.appendChild(child);
        } else if (child instanceof Tag) {
          elem.appendChild(child.elem);
        }
      });
    }

    static addEventListeners(elem, options) {
      Object.entries(options).forEach(([event, listener]) => {
        elem.addEventListener(event, listener);
      });
    }

    static createElement(tagName, attributes = {}, textContent = '') {
      const elem = document.createElement(tagName);
      Tag.setAttributes(elem, attributes);
      elem.textContent = textContent;
      return elem;
    }

    static getLetterWidth(elem, text = 'a') {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = getComputedStyle(elem).font;
      return context.measureText(text).width;
    }

    get dataset() {
      return this.elem.dataset;
    }

    get classList() {
      return this.elem.classList;
    }

    get scrollTop() {
      return this.elem.scrollTop;
    }

    set scrollTop(value) {
      this.elem.scrollTop = value;
    }

    _initElem(elem) {
      if (typeof elem === 'string') {
        this.elem = document.createElement(elem);
      } else if (elem instanceof HTMLElement) {
        this.elem = elem;
      } else {
        this.elem = document.createElement('div');
      }
    }

    _initClassName() {
      if (this.className) {
        this.elem.setAttribute('class', this.className);
      }
    }

    initAllChildrenStyle() {
      this.querySelectorAll('*').forEach((elem) => (elem.style = ''));
    }

    appendChild(child) {
      if (Array.isArray(child)) {
        child.forEach((elem) => this.appendChild(elem));
      } else if (child instanceof Tag) {
        this.elem.appendChild(child.elem);
      } else if (child instanceof Node) {
        this.elem.appendChild(child);
      }
    }

    insertBefore(newNode, refNode) {
      const ref = refNode instanceof Tag ? refNode.elem : refNode;
      if (newNode instanceof Tag) {
        this.elem.insertBefore(newNode.elem, ref);
      } else if (newNode instanceof Node) {
        this.elem.insertBefore(newNode, ref);
      }
    }

    removeChild(child) {
      if (Array.isArray(child)) {
        child.forEach((elem) => this.elem.removeChild(elem));
      } else if (child instanceof Tag) {
        this.elem.removeChild(child.elem);
      } else if (child instanceof Node) {
        this.elem.removeChild(child);
      }
    }

    removeAllChildren = () => {
      while (this.elem.lastElementChild) {
        this.elem.removeChild(this.elem.lastElementChild);
      }
    };

    addEventListener(type, listener) {
      this.elem.addEventListener(type, listener);
    }

    querySelector(selector) {
      return this.elem.querySelector(selector);
    }

    querySelectorAll(selector) {
      return [...this.elem.querySelectorAll(selector)];
    }
  }

  // preview 안에 있는 container, item 요소들
  class PreviewTag extends Tag {
    constructor({ className, parent = null, text = null }) {
      super({ className });
      this.children = [];
      this.parent = parent;
      this.text = text;
    }

    removeChild(child) {
      super.removeChild(child);
      this.remove(child);
    }

    push(child) {
      this.children.push(child);
      child.parent = this;
    }

    remove(child) {
      let tag;
      if (typeof child === 'number') {
        tag = this.children[child];
      } else if (child instanceof Tag) {
        tag = child;
      }
      if (this.children.includes(child)) {
        this.children.splice(this.children.indexOf(child), 1);
      }
    }

    // 재귀적으로 모든 자손 요소 추가
    render() {
      this.removeAllChildren();
      this.children.forEach((child) => {
        child.render();
        this.elem.appendChild(child.elem);
      });
    }
  }

  class Editor {
    // CSS 선택자 파싱을 위한 정규표현식 문자열
    static CSS_SELECTOR =
      '((\\.((container\\d*)|(item\\d*)))+(\\[[^:{}]*\\])?(:[^:{}]*)?(::[^:{}]*)?\\s*)+';

    // CSS 파싱을 위한 정규표현식
    static CSS_STRING = new RegExp(
      `${Editor.CSS_SELECTOR}(,\\s*${Editor.CSS_SELECTOR})*\\{[^{}]*\\}`,
      'g'
    );

    // data-item을 입력하지 않았을 경우 기본값
    static DEFAULT_ITEM = 3;

    // 여분 코드 라인
    static EXTRA_CODE_LINE = 3;

    // 드롭다운 한 줄 높이
    static DROPDOWN_HEIGHT = 30;

    // 코드 라인 한 줄 높이
    static CODE_HEIGHT = 24;

    // flex 속성
    static CSS_FLEX_PROPS = [
      {
        prop: 'align-content',
        values: [
          'center',
          'flex-end',
          'flex-start',
          'space-around',
          'space-between',
          'space-evenly'
        ]
      },
      {
        prop: 'align-items',
        values: ['center', 'flex-end', 'flex-start', 'stretch']
      },
      {
        prop: 'align-self',
        values: ['auto', 'center', 'flex-end', 'flex-start', 'stretch']
      },
      {
        prop: 'column-gap',
        values: ['text']
      },
      {
        prop: 'display',
        values: ['block', 'flex']
      },
      {
        prop: 'flex',
        values: ['text']
      },
      {
        prop: 'flex-basis',
        values: ['text']
      },
      {
        prop: 'flex-direction',
        values: ['column', 'column-reverse', 'row', 'row-reverse']
      },
      {
        prop: 'flex-grow',
        values: ['text']
      },
      {
        prop: 'flex-shrink',
        values: ['text']
      },
      {
        prop: 'flex-wrap',
        values: ['nowrap', 'wrap', 'wrap-reverse']
      },
      {
        prop: 'gap',
        values: ['text']
      },
      {
        prop: 'height',
        values: ['text']
      },
      {
        prop: 'justify-content',
        values: [
          'center',
          'flex-end',
          'flex-start',
          'space-around',
          'space-between',
          'space-evenly',
          'stretch'
        ]
      },
      {
        prop: 'order',
        values: ['text']
      },
      {
        prop: 'row-gap',
        values: ['text']
      },
      {
        prop: 'width',
        values: ['text']
      }
    ];

    // grid 속성
    static CSS_GRID_PROPS = [
      {
        prop: 'align-content',
        values: [
          'center',
          'end',
          'space-around',
          'space-between',
          'space-evenly',
          'start'
        ]
      },
      {
        prop: 'align-items',
        values: ['center', 'end', 'start', 'stretch']
      },
      {
        prop: 'align-self',
        values: ['auto', 'center', 'end', 'start', 'stretch']
      },
      {
        prop: 'column-gap',
        values: ['text']
      },
      {
        prop: 'display',
        values: ['block', 'grid']
      },
      {
        prop: 'gap',
        values: ['text']
      },
      {
        prop: 'grid',
        values: ['texts']
      },
      {
        prop: 'grid-area',
        values: ['texts']
      },
      {
        prop: 'grid-auto-columns',
        values: ['text']
      },
      {
        prop: 'grid-auto-rows',
        values: ['text']
      },
      {
        prop: 'grid-column',
        values: ['text']
      },
      {
        prop: 'grid-column-end',
        values: ['text']
      },
      {
        prop: 'grid-column-start',
        values: ['text']
      },
      {
        prop: 'grid-template-areas',
        values: ['texts']
      },
      {
        prop: 'grid-template-columns',
        values: ['text']
      },
      {
        prop: 'grid-template-rows',
        values: ['text']
      },
      {
        prop: 'grid-row',
        values: ['text']
      },
      {
        prop: 'grid-row-end',
        values: ['text']
      },
      {
        prop: 'grid-row-start',
        values: ['text']
      },
      {
        prop: 'height',
        values: ['text']
      },
      {
        prop: 'justify-content',
        values: [
          'center',
          'end',
          'space-around',
          'space-between',
          'space-evenly',
          'start',
          'stretch'
        ]
      },
      {
        prop: 'justify-items',
        values: ['center', 'end', 'start', 'stretch']
      },
      {
        prop: 'justify-self',
        values: ['auto', 'center', 'end', 'start', 'stretch']
      },
      {
        prop: 'order',
        values: ['text']
      },
      {
        prop: 'place-items',
        values: ['text']
      },
      {
        prop: 'row-gap',
        values: ['text']
      },
      {
        prop: 'width',
        values: ['text']
      }
    ];

    // code 태그에 있는 문자열을 파싱하여 객체로 변환
    static parseCssText(cssText) {
      const trimmedCss = cssText.replace(/\s{2,}/g, (match) => {
        if (match.includes('\n')) {
          return '\n';
        }
        return ' ';
      });
      const matchedCssArr = trimmedCss.match(Editor.CSS_STRING);
      if (!matchedCssArr) {
        return [];
      }
      return matchedCssArr.map((matchedCss) => {
        const index = matchedCss.indexOf('{');
        const selector = matchedCss
          .slice(0, index)
          .replaceAll('\n', ' ')
          .split(',')
          .map((v) => v.trim())
          .join(', ');
        const props = matchedCss
          .slice(index + 1, -1)
          .trim()
          .split(';')
          .filter((css) => css)
          .map((css) => {
            const [prop, value = ''] = css.split(':');
            let trimmedValue = value;
            // 한 줄인데 줄바꿈 한 경우
            if (value.match(/\n/g)?.length === 1 && value.indexOf('\n') === 0) {
              trimmedValue = trimmedValue.slice(1);
            }
            // trim(맨 앞에 공백문자 ' '만 제거하고 \n는 살림, 맨 뒤는 다 없앰)
            trimmedValue = trimmedValue.replace(/^\u0020+|\s+$/u, '');
            return {
              prop: prop.trim(),
              value: trimmedValue
            };
          });
        return { selector, props };
      });
    }

    static parseHtmlStructureText(structText) {
      const container = [];
      const structure = structText.replace(/\d+/g, (match) =>
        'i'.repeat(+match)
      );
      let curContainer = container;
      for (const text of structure) {
        switch (text) {
          case '[':
            const child = new PreviewTag({
              className:
                curContainer === container ? 'container' : 'item container'
            });
            curContainer.push(child);
            curContainer = child;
            break;

          case 'i':
            curContainer.push(new PreviewTag({ className: 'item' }));
            break;

          case ']':
            curContainer = curContainer.parent ?? container;
            break;

          default:
            throw new Error('올바르지 않은 형식입니다');
        }
      }
      return container;
    }

    constructor(elem, editorId) {
      this._editorId = editorId;
      this._editor = new Tag({ elem });
      this._snippetIndex = 0;
      this._snippets = [];
      this._init();
    }

    get _curSnippet() {
      return this._snippets[this._snippetIndex];
    }

    // 각 코드 라인별로 들어갈 정보를 배열로 반환
    get _cssCodeLines() {
      const codeLines = [];
      for (const { selector, props } of this._curCss) {
        codeLines.push(
          selector,
          ...props.map(({ prop, value }) => `${prop}:${value}`),
          '}',
          ''
        );
      }
      if (this._mode === 'snippet') {
        for (let i = 0; i < Editor.EXTRA_CODE_LINE; i++) {
          codeLines.push('');
        }
      } else if (this._mode === 'free') {
        if (!codeLines.length) {
          codeLines.push('');
        }
      }
      return codeLines;
    }

    get _classList() {
      const containerCount =
        this._previewWrapper.querySelectorAll('.container').length;
      const containers =
        containerCount > 1
          ? [...Array(containerCount)].map(
              (_, index) => `container${index + 1}`
            )
          : ['container', 'item'];
      const itemCount = this._previewWrapper.querySelectorAll('.item').length;
      const items = [...Array(itemCount)].map((_, index) => `item${index + 1}`);
      return [...containers, ...items];
    }

    // Init
    // ------------------------------------------------------------------------------

    _init() {
      this._initMode();
      this._initProps();
      this._initSnippets();
      this._initCurCss();
      this._initCurHtml();

      if (this._mode === 'free') {
        this._initTitle();
      }

      this._initElements();
    }

    _initMode() {
      const { mode = 'snippet' } = this._editor.dataset;
      this._mode = mode;
      if (this._mode === 'snippet') {
        this._editor.classList.add('snippet-mode');
      } else if (this._mode === 'free') {
        this._editor.classList.add('free-mode', `editor-${this._editorId}`);
      } else if (this._mode === 'carousel') {
        this._mode = 'free';
        this._layout = 'carousel';
        this._editor.classList.add(
          'free-mode',
          `editor-${this._editorId}`,
          'carousel-layout'
        );
      }
    }

    _initProps() {
      let props;
      if (this._editor.classList.contains('css-flex')) {
        props = Editor.CSS_FLEX_PROPS;
      } else if (this._editor.classList.contains('css-grid')) {
        props = Editor.CSS_GRID_PROPS;
      } else {
        props = [];
        Editor.CSS_FLEX_PROPS.forEach(
          ({ prop: flexProp, values: flexValues }) => {
            const duplicate = props.find(({ prop }) => prop === flexProp);
            if (duplicate) {
              duplicate.values.push(...flexValues);
            } else {
              props.push({ prop: flexProp, values: [...flexValues] });
            }
          }
        );
        Editor.CSS_GRID_PROPS.forEach(
          ({ prop: gridProp, values: gridValues }) => {
            const duplicate = props.find(({ prop }) => prop === gridProp);
            if (duplicate) {
              duplicate.values.push(...gridValues);
            } else {
              props.push({ prop: gridProp, values: [...gridValues] });
            }
          }
        );
        props.forEach(
          ({ values }, i) => (props[i].values = [...new Set(values)])
        );
      }
      this._props = props.map(({ prop }) => prop);
      this._propsInfo = props.reduce((acc, { prop, values }) => {
        acc[prop] = values;
        return acc;
      }, {});
    }

    _initTitle() {
      const { title = '' } = this._editor.dataset;
      this._title = title;
    }

    _initSnippets() {
      const codes = this._editor.querySelectorAll('code');
      codes.forEach(({ dataset: { snippet, item, struct }, textContent }) => {
        let snippetName;
        if (this._mode === 'snippet' && !snippet) {
          snippetName = '제목없음';
        } else {
          snippetName = snippet ?? 'main';
        }

        let html;
        let structure = item ? `[${item}]` : '[3]';
        if (this._mode === 'snippet') {
          const { item: defaultItemCount } = this._editor.dataset;
          html = this._createSingleContainerHtml(defaultItemCount, item);
        } else if (this._mode === 'free') {
          const { item: defaultItemCount } = codes[0].dataset;
          if (defaultItemCount) {
            html = this._createSingleContainerHtml(defaultItemCount);
          } else {
            structure = struct ?? structure;
            html = Editor.parseHtmlStructureText(structure);
          }
        }

        let stylesheet = '';
        if (this._mode === 'free') {
          stylesheet = this._createStylesheet(textContent);
        }

        this._snippets.push({
          name: snippetName,
          html,
          css: Editor.parseCssText(textContent),
          stylesheet,
          structure
        });
      });
    }

    _initCurCss() {
      const cssArr = [...this._curSnippet.css];
      this._curCss = cssArr.map(({ selector, props }) => ({
        selector,
        props: [...props.map((prop) => ({ ...prop }))]
      }));
    }

    _initCurHtml() {
      this._curHtml = Editor.parseHtmlStructureText(this._curSnippet.structure);
    }

    _initElements() {
      this._initPreview();
      this._initCode();
      this._initSnippetList();
      if (this._mode === 'snippet') {
        this._initButtons();
      }
      if (this._layout === 'carousel') {
        this._initIndicators();
      }
    }

    _initPreview() {
      this._preview = new Tag({ className: 'preview' });
      this._previewWrapper = new Tag({ className: 'wrapper-preview' });
      const containers = this._curHtml;
      containers.forEach((container) => {
        container.render();
        this._previewWrapper.appendChild(container);
      });

      if (this._mode === 'free') {
        this._style = document.createElement('style');
        this._style.textContent = this._curSnippet.stylesheet;
        this._preview.appendChild(this._style);
      }

      this._preview.appendChild(this._previewWrapper);
    }

    _initCode() {
      this._curCode = 'CSS';
      this._code = new Tag({ className: 'code' });
      this._codeWrapper = new Tag({ className: 'wrapper-code' });
      const code = this._createCssCodeElements();
      this._codeWrapper.appendChild(code);

      if (this._mode === 'snippet') {
        this._code.appendChild(this._codeWrapper);
        this._code.addEventListener('click', (e) =>
          this._codeClickEventListener(e)
        );
      } else if (this._mode === 'free') {
        const header = this._createCodeHeader();
        const inner = new Tag({ className: 'inner-code' });
        inner.appendChild(this._codeWrapper);
        this._code.appendChild([header, inner]);
      }

      this._isDropdownOpen = false;
    }

    _initSnippetList() {
      this._snippetList = new Tag({ className: 'list-snippet' });
      const form = document.createElement('form');

      this._snippets.forEach(({ name }, index) => {
        const input = Tag.createElement('input', {
          type: 'radio',
          id: `editor${this._editorId}-snippet${index + 1}`,
          name: `snippet`,
          class: 'input-snippet'
        });
        if (!index) {
          input.setAttribute('checked', true);
        }

        const label = Tag.createElement(
          'label',
          {
            for: `editor${this._editorId}-snippet${index + 1}`,
            class: 'label-snippet'
          },
          name
        );

        input.addEventListener('change', () =>
          this._snippetChangeEventListener(index)
        );

        Tag.appendChildren(form, [input, label]);
      });
      this._snippetList.appendChild(form);
    }

    _initButtons() {
      this._buttons = new Tag({ className: 'buttons' });

      const addButton = Tag.createElement(
        'button',
        {
          type: 'button',
          class: 'button button-add'
        },
        '+ Add Box'
      );
      addButton.addEventListener('click', () =>
        this._addItemClickEventListener()
      );

      const removeButton = Tag.createElement(
        'button',
        {
          type: 'button',
          class: 'button button-remove'
        },
        '- Remove Box'
      );
      removeButton.addEventListener('click', () =>
        this._removeItemClickEventListener()
      );

      this._buttons.appendChild([addButton, removeButton]);
    }

    _initIndicators() {
      this._carouselIndicators = new Tag({ className: 'container-indicators' });
      for (let i = 0; i < this._snippets.length; i++) {
        const indicator = new Tag({ elem: 'button', className: 'indicator' });
        indicator.elem.setAttribute('type', 'button');
        if (i === 0) {
          indicator.classList.add('selected');
        }
        this._carouselIndicators.appendChild(indicator);
      }
      this._carouselIndicators.addEventListener(
        'click',
        ({ currentTarget, target }) => {
          if (target.tagName !== 'BUTTON') {
            return;
          }
          const children = [...currentTarget.querySelectorAll('.indicator')];
          const index = children.indexOf(target);
          children[this._snippetIndex].classList.remove('selected');
          target.classList.add('selected');
          this._snippetChangeEventListener(index);
        }
      );
    }

    // Create
    // ------------------------------------------------------------------------------

    _createCssCodeElements() {
      if (this._mode === 'snippet') {
        return this._createCssCodeButtonTable();
      } else if (this._mode === 'free') {
        if (this._curCode === 'CSS') {
          return this._createCssCodeTextTable();
        } else if (this._curCode === 'HTML') {
          return this._createHtmlCodeButtonTable();
        }
      }
    }

    _createCssCodeButtonTable() {
      let numberIndex = 1;
      let selectorIndex = 0;
      let propIndex = 0;

      const table = document.createElement('table');

      this._cssCodeLines.forEach((line, index) => {
        const row = document.createElement('tr');
        let extraRows = [];

        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          numberIndex++
        );

        const codeLine = Tag.createElement('td', { class: 'code-line' });
        if (line[0] === '.') {
          this._createSelectorCodeLine(line, codeLine, selectorIndex);
        } else if (line.includes(':')) {
          const [prop, value] = line.split(':');
          if (this._propsInfo[prop]?.[0] === 'texts') {
            extraRows = this._createPropCodeLines(
              prop,
              value.split('\n'),
              numberIndex - 1,
              selectorIndex,
              propIndex
            );
            numberIndex += extraRows.length - 1;
          } else {
            this._createPropCodeLine(
              prop,
              value,
              codeLine,
              selectorIndex,
              propIndex
            );
          }
          propIndex += 1;
        } else {
          codeLine.textContent = line;
          if (line.trim() === '') {
            const addButton = this._createAddCodeButton(selectorIndex);
            codeLine.appendChild(addButton);
          } else if (line === '}') {
            selectorIndex += 1;
            propIndex = 0;
          }
        }

        if (extraRows.length) {
          Tag.appendChildren(table, extraRows);
        } else {
          Tag.appendChildren(row, [lineNumber, codeLine]);
          table.appendChild(row);
        }
      });
      return table;
    }

    _createCssCodeTextTable() {
      let numberIndex = 1;
      const table = Tag.createElement('table', { tabindex: '-1' });

      this._cssCodeLines.forEach((line) => {
        const row = document.createElement('tr');
        let extraRows = [];

        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          numberIndex++
        );

        const codeLine = Tag.createElement('td', {
          class: 'code-line',
          'data-index': numberIndex - 2
        });
        if (line[0] === '.') {
          this._updateSelectorCodeLineStyle(line, codeLine);
        } else if (line.includes(':')) {
          const [prop, value] = line.split(':');
          const valueArr = value.split('\n');
          if (valueArr.length === 1) {
            this._updatePropCodeLineStyle(prop, value, codeLine);
          } else {
            extraRows = this._createStyledPropCodeLines(
              prop,
              valueArr,
              numberIndex - 1
            );
            numberIndex += extraRows.length - 1;
          }
        } else {
          codeLine.textContent = line;
        }

        if (extraRows.length) {
          Tag.appendChildren(table, extraRows);
        } else {
          Tag.appendChildren(row, [lineNumber, codeLine]);
          table.appendChild(row);
        }
      });

      Tag.addEventListeners(table, {
        mousedown: (e) => this._textTableMousedownEventListener(e),
        mouseup: (e) => this._textTableMouseUpEventListener(e),
        keydown: (e) => this._textTableKeydownEventListener(e)
      });

      return table;
    }

    // 여기에 CssCodeTextTable을 클릭했을 때 대체될 div와 textarea 생성
    _createCssCodeTextarea() {
      const textareaWrapper = Tag.createElement('div', {
        class: 'wrapper-textarea'
      });
      const numbers = new Tag({ className: 'container-number' });
      const textarea = Tag.createElement('textarea', {
        spellcheck: false,
        class: 'textarea-code'
      });

      const codeLines = [];
      let numberIndex = 1;
      this._cssCodeLines.forEach((line) => {
        const lineNumber = Tag.createElement(
          'span',
          {
            class: 'number-line'
          },
          numberIndex++
        );
        numbers.appendChild(lineNumber);

        if (line[0] === '.') {
          codeLines.push(`${line} {`);
        } else if (line.includes(':')) {
          const [prop, value] = line.split(':');
          const valueArr = value.split('\n');
          if (valueArr.length === 1) {
            codeLines.push(`  ${prop}: ${value};`);
          } else {
            valueArr.forEach((val, i) => {
              let lineText;
              if (i === 0) {
                if (val) {
                  lineText = `  ${prop}: ${val}`;
                } else {
                  lineText = `  ${prop}:`;
                }
              } else {
                lineText = `    ${val}`;
                const lineNumber = Tag.createElement(
                  'span',
                  {
                    class: 'number-line'
                  },
                  numberIndex++
                );
                numbers.appendChild(lineNumber);
              }
              if (i === valueArr.length - 1) {
                lineText += ';';
              }
              codeLines.push(lineText);
            });
          }
        } else {
          codeLines.push(line);
        }
      });
      textarea.value = codeLines.join('\n');
      textarea.style.height = codeLines.length * Editor.CODE_HEIGHT + 'px';
      Tag.addEventListeners(textarea, {
        input: () => this._updateLineNumbers(textarea, numbers),
        keydown: (e) => this._textareaKeydownEventListener(e, numbers),
        blur: () => this._textTableBlurEventListener()
      });
      Tag.appendChildren(textareaWrapper, [numbers, textarea]);
      return textareaWrapper;
    }

    _createHtmlCodeButtonTable() {
      const table = Tag.createElement('table', { class: 'html-table' });

      // HTML 코드가 한 줄도 없으면 빈 줄 하나 만들기
      if (!this._curHtml.length) {
        const row = document.createElement('tr');
        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          1
        );
        const codeLine = Tag.createElement('td', {
          class: 'code-line html-code'
        });
        const addButton = this._createAddInnerTagButton();
        Tag.appendChildren(codeLine, [addButton]);
        Tag.appendChildren(row, [lineNumber, codeLine]);
        table.appendChild(row);
      }

      const codeLines = this._curHtml.reduce((acc, container) => {
        const code = this._createHtmlCodeLines(container);
        return [...acc, ...code];
      }, []);

      codeLines.forEach((line, index) => {
        const row = document.createElement('tr');
        Tag.addEventListeners(row, {
          mouseover: () => {
            line.tag.elem.classList.add('stressed');
          },
          mouseout: () => {
            line.tag.elem.classList.remove('stressed');
          }
        });

        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          index + 1
        );

        const codeLine = Tag.createElement('td', {
          class: 'code-line html-code'
        });
        const indentation = '\u00A0'.repeat(line.depth * 2);
        const { tagName } = line.tag.elem;
        const isRootContainer = !line.tag.children.length && !line.tag.parent;

        const openingTag = line.className
          ? this._createOpeningTag(tagName, line.className)
          : [];

        const textInput =
          typeof line.textContent === 'string' &&
          !isRootContainer &&
          this._layout !== 'carousel'
            ? Tag.createElement('input', {
                class: 'button-code text-code',
                value: line.textContent,
                spellcheck: false
              })
            : null;

        if (textInput) {
          const value = line.textContent;
          if (value.trim() === '') {
            textInput.classList.add('button-blank');
          }
          textInput.style.width =
            (value.length ? (value.length + 1) * 9 : 30) + 'px';
          Tag.addEventListeners(textInput, {
            click: this._codeInputEventListener,
            keydown: (e) => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                e.currentTarget.blur();
              } else {
                this._codeInputEventListener(e);
              }
            },
            keyup: this._codeInputEventListener,
            focus: ({ currentTarget }) => {
              currentTarget.classList.remove('button-blank');
            },
            blur: ({ currentTarget }) => {
              line.tag.elem.textContent = currentTarget.value;
              line.tag.text = currentTarget.value;
              currentTarget.style.width =
                (value.length ? (value.length + 1) * 9 : 30) + 'px';
              this._updateHtmlCode();
            }
          });
        }

        const closingTag =
          !(typeof line.textContent === 'string') && line.className
            ? null
            : `</${tagName.toLowerCase()}>`;

        const innerAddButton =
          textInput ||
          isRootContainer ||
          (openingTag.length && closingTag && this._layout === 'carousel')
            ? this._createAddInnerTagButton(line.tag, 'button-inner')
            : null;

        const deleteButton = this._createDeleteTagButton(line.tag);

        const addButton =
          openingTag.length && !closingTag
            ? this._createAddInnerTagButton(line.tag)
            : this._createAddAdjacentTagButton(line.tag, line.tag.parent);

        Tag.appendChildren(codeLine, [
          deleteButton,
          indentation,
          ...openingTag,
          textInput,
          innerAddButton,
          closingTag,
          addButton
        ]);
        Tag.appendChildren(row, [lineNumber, codeLine]);
        table.appendChild(row);
      });
      return table;
    }

    _createSingleContainerHtml(defaultItemCount, item) {
      const length = Number.isInteger(Number(item))
        ? Number(item)
        : defaultItemCount
        ? Number(defaultItemCount)
        : Editor.DEFAULT_ITEM;
      const container = new PreviewTag({ className: 'container' });
      for (let i = 0; i < length; i++) {
        container.push(new PreviewTag({ className: 'item' }));
      }
      return [container];
    }

    _createSelectorCodeLine(line, codeLine, selectorIndex) {
      const selectorSpan = Tag.createElement(
        'span',
        {
          class: 'button-code selector-code',
          'data-selector-index': selectorIndex
        },
        line.slice(1)
      );
      if (line.slice(1).trim() === '') {
        selectorSpan.classList.add('button-blank');
      }
      const deleteButton = this._createDeleteCodeButton(selectorIndex);

      Tag.appendChildren(codeLine, [
        deleteButton,
        '.',
        selectorSpan,
        '\u00A0{'
      ]);
    }

    _createPropCodeLine(prop, value, codeLine, selectorIndex, propIndex) {
      const propSpan = this._createPropCodeButton(
        prop,
        selectorIndex,
        propIndex
      );
      const valueElem = this._createValueCodeButton(
        prop,
        value,
        selectorIndex,
        propIndex
      );
      const deleteButton = this._createDeleteCodeButton(
        selectorIndex,
        propIndex
      );
      const addButton = this._createAddCodeButton(selectorIndex, propIndex);

      Tag.appendChildren(codeLine, [
        deleteButton,
        '\u00A0\u00A0',
        propSpan,
        ':\u00A0',
        valueElem,
        ';',
        addButton
      ]);
    }

    _createPropCodeButton(prop, selectorIndex, propIndex) {
      const propSpan = Tag.createElement(
        'span',
        {
          class: 'button-code prop-code',
          'data-selector-index': selectorIndex,
          'data-prop-index': propIndex
        },
        prop
      );
      if (prop.trim() === '') {
        propSpan.classList.add('button-blank');
      }
      return propSpan;
    }

    _createValueCodeButton(prop, value, selectorIndex, propIndex) {
      let valueElem;
      if (this._propsInfo[prop]?.[0] === 'text') {
        valueElem = Tag.createElement('input', {
          class: 'button-code value-code',
          value,
          spellcheck: false,
          'data-selector-index': selectorIndex,
          'data-prop-index': propIndex
        });
        valueElem.style.width =
          (value.length ? (value.length + 1) * 9 : 30) + 'px';

        Tag.addEventListeners(valueElem, {
          click: this._codeInputEventListener,
          keydown: (e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              e.currentTarget.blur();
            } else {
              this._codeInputEventListener(e);
            }
          },
          keyup: this._codeInputEventListener,
          focus: ({ currentTarget }) => {
            currentTarget.classList.remove('button-blank');
          },
          blur: ({ currentTarget }) => {
            const {
              dataset: { selectorIndex, propIndex },
              value
            } = currentTarget;
            this._curCss[selectorIndex].props[propIndex].value = value;
            currentTarget.style.width =
              (value.length ? (value.length + 1) * 9 : 30) + 'px';
            this._updateCssCode();
          }
        });
      } else {
        valueElem = Tag.createElement(
          'span',
          {
            class: 'button-code value-code',
            'data-selector-index': selectorIndex,
            'data-prop-index': propIndex
          },
          value
        );
      }
      if (value.trim() === '') {
        valueElem.classList.add('button-blank');
      }
      return valueElem;
    }

    _createDeleteCodeButton(selectorIndex, propIndex) {
      const elem = Tag.createElement('button', {}, '-');
      if (typeof propIndex === 'number') {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-delete',
          'data-selector-index': selectorIndex,
          'data-prop-index': propIndex
        });
        elem.addEventListener('click', () => {
          this._curCss[selectorIndex].props.splice(propIndex, 1);
          this._updateCssCode();
        });
      } else {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-delete',
          'data-selector-index': selectorIndex
        });
        elem.addEventListener('click', () =>
          this._removeCodeClickEventListener(selectorIndex)
        );
      }
      return elem;
    }

    _createAddCodeButton(selectorIndex, propIndex) {
      const elem = Tag.createElement(
        'button',
        {
          type: 'button',
          'data-selector-index': selectorIndex
        },
        '+'
      );
      if (typeof propIndex === 'number') {
        Tag.setAttributes(elem, {
          class: 'button-add',
          'data-prop-index': propIndex
        });
        elem.addEventListener('click', () => {
          this._curCss[selectorIndex].props.splice(propIndex + 1, 0, {
            prop: '\u00A0'.repeat(4),
            value: '\u00A0'.repeat(4)
          });
          this._updateCssCode();
        });
      } else {
        elem.setAttribute('class', 'button-add button-add-selector');
        elem.addEventListener('click', () =>
          this._addCodeClickEventListener(selectorIndex)
        );
      }
      return elem;
    }

    _createPropCodeLines(
      prop,
      valueArr,
      numberIndex,
      selectorIndex,
      propIndex
    ) {
      const output = [];
      let inputIndex = 0;
      valueArr.forEach((value, index) => {
        const row = document.createElement('tr');
        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          numberIndex++
        );
        const codeLine = Tag.createElement('td', { class: 'code-line' });
        const valueInput = this._createValueCodeInput(
          value,
          inputIndex,
          selectorIndex,
          propIndex
        );
        if (index === 0) {
          const propSpan = this._createPropCodeButton(
            prop,
            selectorIndex,
            propIndex
          );
          const deleteButton = this._createDeleteCodeButton(
            selectorIndex,
            propIndex
          );
          if (value) {
            Tag.appendChildren(codeLine, [
              deleteButton,
              '\u00A0\u00A0',
              propSpan,
              ':\u00A0',
              valueInput
            ]);
            inputIndex++;
          } else {
            if (valueArr.length === 1) {
              Tag.appendChildren(codeLine, [
                deleteButton,
                '\u00A0\u00A0',
                propSpan,
                ':\u00A0',
                valueInput
              ]);
            } else {
              Tag.appendChildren(codeLine, [
                deleteButton,
                '\u00A0\u00A0',
                propSpan,
                ':'
              ]);
            }
          }
        } else {
          Tag.appendChildren(codeLine, ['\u00A0'.repeat(4), valueInput]);
          inputIndex++;
        }
        if (index === valueArr.length - 1) {
          const addButton = this._createAddCodeButton(selectorIndex, propIndex);
          Tag.appendChildren(codeLine, [';', addButton]);
        }
        Tag.appendChildren(row, [lineNumber, codeLine]);
        output.push(row);
      });
      return output;
    }

    _createValueCodeInput(value, inputIndex, selectorIndex, propIndex) {
      const valueInput = Tag.createElement('input', {
        class: 'button-code value-code',
        value,
        spellcheck: false,
        'data-selector-index': selectorIndex,
        'data-prop-index': propIndex,
        'data-input-index': inputIndex
      });
      if (value.trim() === '') {
        valueInput.classList.add('button-blank');
      }
      valueInput.style.width =
        (value.length ? (value.length + 1) * 9 : 30) + 'px';

      Tag.addEventListeners(valueInput, {
        click: this._codeInputEventListener,
        keydown: (e) => {
          const { value, selectionStart, selectionEnd } = e.currentTarget;
          switch (e.key) {
            case 'Escape':
              e.currentTarget.blur();
              break;

            case 'Enter':
              {
                if (!value || (selectionStart === 0 && selectionEnd === 0)) {
                  return;
                }
                const curValue = value.slice(0, selectionStart);
                const nextValue = value.slice(selectionEnd);
                this._curCss[selectorIndex].props[propIndex].nextValueInfo = {
                  key: e.key,
                  inputIndex,
                  selectionStart,
                  selectionEnd,
                  prevValue: value,
                  curValue,
                  nextValue
                };
                e.currentTarget.blur();
                const nextElem = this._codeWrapper
                  .querySelectorAll('input')
                  .find(
                    ({ dataset }) =>
                      Number(dataset.selectorIndex) === selectorIndex &&
                      Number(dataset.propIndex) === propIndex &&
                      Number(dataset.inputIndex) === inputIndex + 1
                  );
                nextElem.focus();
              }
              break;

            case 'Backspace':
              {
                if (inputIndex === 0) {
                  return;
                }
                if (selectionStart || selectionEnd) {
                  return;
                }
                e.preventDefault();
                this._curCss[selectorIndex].props[propIndex].nextValueInfo = {
                  key: e.key,
                  inputIndex,
                  prevValue: value
                };
                e.currentTarget.blur();
                const nextElem = this._codeWrapper
                  .querySelectorAll('input')
                  .find(
                    ({ dataset }) =>
                      Number(dataset.selectorIndex) === selectorIndex &&
                      Number(dataset.propIndex) === propIndex &&
                      Number(dataset.inputIndex) === inputIndex - 1
                  );
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd =
                  nextElem.value.length - value.length;
              }
              break;

            case 'Delete':
              {
                const inputArr = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                );
                if (inputArr.length === inputIndex + 1) {
                  return;
                }
                if (
                  selectionStart < value.length ||
                  selectionEnd < value.length
                ) {
                  return;
                }
                e.preventDefault();
                this._curCss[selectorIndex].props[propIndex].nextValueInfo = {
                  key: e.key,
                  inputIndex,
                  prevValue: inputArr[inputIndex + 1].value
                };
                e.currentTarget.blur();
                const nextElem = this._codeWrapper
                  .querySelectorAll('input')
                  .find(
                    ({ dataset }) =>
                      Number(dataset.selectorIndex) === selectorIndex &&
                      Number(dataset.propIndex) === propIndex &&
                      Number(dataset.inputIndex) === inputIndex
                  );
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd = value.length;
              }
              break;

            case 'ArrowUp':
              {
                e.preventDefault();
                if (inputIndex === 0) {
                  return;
                }
                e.currentTarget.blur();
                const nextElem = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                )[inputIndex - 1];
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd =
                  selectionStart;
              }
              break;

            case 'ArrowDown':
              {
                e.preventDefault();
                const inputArr = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                );
                if (inputIndex === inputArr.length - 1) {
                  return;
                }
                e.currentTarget.blur();
                const nextElem = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                )[inputIndex + 1];
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd =
                  selectionStart;
              }
              break;

            case 'ArrowLeft':
              {
                if (selectionStart > 0 || inputIndex === 0) {
                  return;
                }
                e.preventDefault();
                e.currentTarget.blur();
                const nextElem = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                )[inputIndex - 1];
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd =
                  nextElem.value.length;
              }
              break;

            case 'ArrowRight':
              {
                const inputArr = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                );
                if (
                  selectionStart < value.length ||
                  inputIndex === inputArr.length - 1
                ) {
                  return;
                }
                e.preventDefault();
                e.currentTarget.blur();
                const nextElem = [
                  ...this._codeWrapper.querySelectorAll('input')
                ].filter(
                  ({ dataset }) =>
                    Number(dataset.selectorIndex) === selectorIndex &&
                    Number(dataset.propIndex) === propIndex
                )[inputIndex + 1];
                nextElem.focus();
                nextElem.selectionStart = nextElem.selectionEnd = 0;
              }
              break;

            default:
              this._codeInputEventListener(e);
          }
        },
        keyup: this._codeInputEventListener,
        focus: ({ currentTarget }) => {
          currentTarget.classList.remove('button-blank');
        },
        blur: ({ currentTarget }) => {
          const {
            dataset: {
              selectorIndex: targetSelectorIndex,
              propIndex: targetPropIndex
            },
            value
          } = currentTarget;
          const inputArr = [
            ...this._codeWrapper.querySelectorAll('input')
          ].filter(
            ({ dataset }) =>
              dataset.selectorIndex === targetSelectorIndex &&
              dataset.propIndex === targetPropIndex
          );
          const curProp = this._curCss[selectorIndex].props[targetPropIndex];
          const curValues = inputArr.map(({ value }) => value);
          let blankIndex = -1;
          if (curProp.nextValueInfo) {
            const {
              key,
              inputIndex: targetIndex,
              selectionStart,
              selectionEnd,
              prevValue,
              curValue,
              nextValue
            } = curProp.nextValueInfo;
            switch (key) {
              case 'Enter':
                {
                  curValues[targetIndex] = curValue;
                  curValues.splice(targetIndex + 1, 0, nextValue);
                  if (selectionStart === 0) {
                    blankIndex = targetIndex;
                  } else if (selectionEnd === prevValue.length) {
                    blankIndex = targetIndex + 1;
                  }
                }
                break;

              case 'Backspace':
                {
                  curValues[targetIndex - 1] += prevValue;
                  curValues.splice(targetIndex, 1);
                }
                break;

              case 'Delete':
                {
                  curValues[targetIndex] += prevValue;
                  curValues.splice(targetIndex + 1, 1);
                }
                break;
            }
          }
          const nextInputArr = curValues.filter(
            (value, i) => value || i === blankIndex
          );
          if (nextInputArr.length === 0) {
            nextInputArr.push('');
          }
          curProp.value =
            (nextInputArr.length > 1 ? '\n' : '') + nextInputArr.join('\n');
          curProp.nextValueInfo = null;
          currentTarget.style.width =
            (value.length ? (value.length + 1) * 9 : 30) + 'px';
          this._updateCssCode();
        }
      });
      return valueInput;
    }

    _createStyledPropCodeLines(prop, valueArr, numberIndex) {
      const output = [];
      valueArr.forEach((value, index) => {
        const row = document.createElement('tr');
        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          numberIndex++
        );
        const codeLine = Tag.createElement('td', {
          class: 'code-line',
          'data-index': numberIndex - 2
        });
        const valueSpan = Tag.createElement(
          'span',
          {
            class: 'value-code'
          },
          value
        );
        if (index === 0) {
          const propSpan = Tag.createElement(
            'span',
            {
              class: 'prop-code'
            },
            prop
          );
          if (value) {
            Tag.appendChildren(codeLine, [
              '\u00A0'.repeat(2),
              propSpan,
              ':\u00A0',
              valueSpan
            ]);
          } else {
            Tag.appendChildren(codeLine, ['\u00A0'.repeat(2), propSpan, ':']);
          }
        } else {
          Tag.appendChildren(codeLine, ['\u00A0'.repeat(4), valueSpan]);
        }
        if (index === valueArr.length - 1) {
          Tag.appendChildren(codeLine, [';']);
        }
        Tag.appendChildren(row, [lineNumber, codeLine]);
        output.push(row);
      });
      return output;
    }

    _createDeleteTagButton(tag) {
      const elem = Tag.createElement(
        'button',
        { type: 'button', class: 'button-delete' },
        '-'
      );
      elem.addEventListener('click', () => {
        const { parent } = tag;
        if (parent) {
          parent.removeChild(tag);
        } else {
          this._previewWrapper.removeChild(tag);
          this._curHtml.splice(this._curHtml.indexOf(tag), 1);
        }
        this._updateHtmlCode();
      });
      return elem;
    }

    _createAddAdjacentTagButton(tag, parent) {
      const elem = Tag.createElement(
        'button',
        { type: 'button', class: 'button-add' },
        '+'
      );

      if (parent) {
        elem.addEventListener('click', () => {
          const newTag = new PreviewTag({ className: 'item' });
          const index = parent.children.indexOf(tag);
          parent.children.splice(index + 1, 0, newTag);
          newTag.parent = parent;
          this._updatePreviewDOM();
          this._updateHtmlCode();
        });
      } else {
        elem.addEventListener('click', () => {
          const newTag = new PreviewTag({ className: 'container' });
          const index = this._curHtml.indexOf(tag);
          this._curHtml.splice(index + 1, 0, newTag);
          this._updatePreviewDOM();
          this._updateHtmlCode();
        });
      }

      return elem;
    }

    _createAddInnerTagButton(tag, className) {
      const elem = Tag.createElement(
        'button',
        { type: 'button', class: 'button-add' },
        '+'
      );
      if (className) {
        elem.classList.add(className);
      }

      // HTML 코드가 하나도 없는 경우
      if (!tag) {
        elem.addEventListener('click', () => {
          const newTag = new PreviewTag({ className: 'container' });
          this._curHtml.push(newTag);
          this._updatePreviewDOM();
          this._updateHtmlCode();
        });
        return elem;
      }

      elem.addEventListener('click', () => {
        const newTag = new PreviewTag({ className: 'item' });
        const { children } = tag;
        tag.text = null;
        if (!children.length) {
          tag.elem.textContent = '';
        }
        tag.children.unshift(newTag);
        newTag.parent = tag;
        this._updatePreviewDOM();
        this._updateHtmlCode();
      });

      return elem;
    }

    _createSelectorDropdown(selectorIndex) {
      const handleClick = (targetItem) => {
        const duplicate = this._curCss.find(
          ({ selector }) => selector.slice(1) === targetItem.textContent
        );
        const curSelector = this._curCss[selectorIndex];
        if (duplicate && duplicate !== curSelector) {
          duplicate.props.push(...curSelector.props);
          this._curCss.splice(this._curCss.indexOf(curSelector), 1);
        }
        curSelector.selector = '.' + targetItem.textContent;
      };
      this._dropdown = this._createDropdown(
        (list) => this._createSelectorDropdownItems()(list),
        handleClick
      );
    }

    _createPropDropdown(selectorIndex, propIndex) {
      const handleClick = (targetItem) => {
        const curSelector = this._curCss[selectorIndex];
        curSelector.props[propIndex].prop = targetItem.textContent;
      };
      this._dropdown = this._createDropdown(
        (list) => this._createPropDropdownItems()(list),
        handleClick
      );
    }

    _createValueDropdown(targetCode, selectorIndex, propIndex) {
      const handleClick = (targetItem) => {
        const curSelector = this._curCss[selectorIndex];
        curSelector.props[propIndex].value = targetItem.textContent;
      };
      this._dropdown = this._createDropdown(
        (list) => this._createValueDropdownItems(targetCode)(list),
        handleClick
      );
    }

    _createSelectorDropdownItems() {
      return (list) => {
        this._classList.forEach((selector) => {
          const item = Tag.createElement('li', {}, selector);
          list.appendChild(item);
        });
      };
    }

    _createPropDropdownItems() {
      return (list) => {
        this._props.forEach((prop) => {
          const item = Tag.createElement('li', {}, prop);
          list.appendChild(item);
        });
      };
    }

    _createValueDropdownItems(targetCode) {
      return (list) => {
        const { selectorIndex, propIndex } = targetCode.dataset;
        const curProp = this._curCss[selectorIndex].props[propIndex].prop;
        this._propsInfo[curProp].forEach((value) => {
          const item = Tag.createElement('li', {}, value);
          list.appendChild(item);
        });
      };
    }

    _createDropdown(createListItems, handleClick) {
      const elem = Tag.createElement('div', { class: 'dropdown' });
      const list = document.createElement('ul');
      createListItems(list);
      elem.appendChild(list);
      elem.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
          return;
        }
        handleClick(target);
        this._updateCssCode();
      });
      return elem;
    }

    _createStylesheet(styleText) {
      const stylesheet = styleText
        .replace(/\s+/g, ' ')
        .replace(Editor.CSS_STRING, (match) => {
          const index = match.indexOf('{');
          const selectors = match
            .slice(0, index)
            .split(', ')
            .map((selector) => selector.trim());
          const rest = match
            .slice(index)
            .replace(/((?<=[{}:;])\s+)|(\s+(?=[{}:;]))/g, '');
          return (
            selectors
              .map(
                (selector) => `.fg-editor.editor-${this._editorId} ${selector}`
              )
              .join(',') + rest
          );
        });
      return stylesheet;
    }

    _createCodeHeader() {
      const header = new Tag({ className: 'header-code' });
      const title = Tag.createElement(
        'p',
        {
          class: 'title'
        },
        this._title
      );
      const htmlButton = Tag.createElement(
        'button',
        {
          type: 'button',
          class: 'button-switch button-left'
        },
        'HTML'
      );
      const cssButton = Tag.createElement(
        'button',
        {
          type: 'button',
          class: 'button-switch button-right is-active'
        },
        'CSS'
      );

      htmlButton.addEventListener('click', () => {
        if (this._curCode === 'HTML') {
          return;
        }
        this._curCode = 'HTML';
        htmlButton.classList.add('is-active');
        cssButton.classList.remove('is-active');
        const table = this._createCssCodeElements();
        this._codeWrapper.removeAllChildren();
        this._codeWrapper.appendChild(table);
      });
      cssButton.addEventListener('click', () => {
        if (this._curCode === 'CSS') {
          return;
        }
        this._curCode = 'CSS';
        htmlButton.classList.remove('is-active');
        cssButton.classList.add('is-active');
        const table = this._createCssCodeElements();
        this._codeWrapper.removeAllChildren();
        this._codeWrapper.appendChild(table);
      });

      header.appendChild([title, htmlButton, cssButton]);
      return header;
    }

    _createHtmlCodeLines(tag, depth = 0) {
      const { elem, children } = tag;
      const { className, textContent } = elem;
      const childrenLines = [];
      children.forEach((child) => {
        childrenLines.push(...this._createHtmlCodeLines(child, depth + 1));
      });
      if (childrenLines.length) {
        return [{ depth, tag, className }, ...childrenLines, { depth, tag }];
      } else {
        return [
          {
            depth,
            className,
            textContent,
            tag
          }
        ];
      }
    }

    _createOpeningTag(tagName, className) {
      const attribute = Tag.createElement(
        'span',
        { class: 'attribute-code' },
        'class='
      );
      const value = Tag.createElement(
        'span',
        { class: 'attribute-value-code' },
        className
      );
      const leftQuotation = Tag.createElement(
        'span',
        { class: 'attribute-code' },
        '"'
      );
      const rightQuotation = Tag.createElement(
        'span',
        { class: 'attribute-code' },
        '"'
      );
      return [
        `<${tagName.toLowerCase()} `,
        attribute,
        leftQuotation,
        value,
        rightQuotation,
        '>'
      ];
    }

    // Event Listener
    // ------------------------------------------------------------------------------

    _codeInputEventListener({ currentTarget, currentTarget: { value } }) {
      if (currentTarget.value.trim() === '') {
        currentTarget.value = '';
      }
      currentTarget.style.width =
        (value.length > 4 ? (value.length + 1) * 9 : 50) + 'px';
    }

    _codeClickEventListener({ target: targetCode }) {
      if (this._isDropdownOpen) {
        this._dropdownParent.removeChild(this._dropdown);
        this._isDropdownOpen = false;

        if (this._dropdownParent === targetCode) {
          this._dropdownParent = null;
          return;
        }
      }

      if (!targetCode.classList.contains('button-code')) {
        return;
      }

      if (targetCode.tagName === 'INPUT') {
        return;
      }

      let scrollTop = 0;
      this._dropdownParent = targetCode;
      const { selectorIndex, propIndex } = targetCode.dataset;
      if (targetCode.classList.contains('selector-code')) {
        this._createSelectorDropdown(selectorIndex);
        scrollTop =
          this._classList.indexOf(targetCode.textContent) *
          Editor.DROPDOWN_HEIGHT;
      }
      if (targetCode.classList.contains('prop-code')) {
        this._createPropDropdown(selectorIndex, propIndex);
        scrollTop =
          this._props.indexOf(targetCode.textContent) * Editor.DROPDOWN_HEIGHT;
      }
      if (targetCode.classList.contains('value-code')) {
        const prop = this._curCss[selectorIndex].props[propIndex].prop;
        if (prop.trim() === '') {
          return;
        }
        this._createValueDropdown(targetCode, selectorIndex, propIndex);
        scrollTop =
          this._propsInfo[prop].indexOf(targetCode.textContent) *
          Editor.DROPDOWN_HEIGHT;
      }
      targetCode.appendChild(this._dropdown);
      if (this._dropdown) {
        this._dropdown.scrollTop = scrollTop;
      }
      this._isDropdownOpen = true;
    }

    // snippetList에서 snippet을 변경했을 때 실행
    _snippetChangeEventListener(index) {
      this._snippetIndex = index;
      this._initCurHtml();
      this._initCurCss();
      this._updateAllPreviewDOM();
      this._updateCssCode();
      this._updateHtmlCode();
      if (this._mode === 'free') {
        this._style.textContent = this._curSnippet.stylesheet;
      }
    }

    _addItemClickEventListener() {
      const item = new PreviewTag({ className: 'item' });
      this._curHtml[0].push(item);
      this._updatePreviewDOM();
      this._updateHtml();
      this._updatePreviewStyle();
    }

    _removeItemClickEventListener() {
      const children = this._curHtml[0].children;
      if (children.length) {
        this._curHtml[0].children.pop();
        this._updatePreviewDOM();
        this._updateHtml();
        this._updatePreviewStyle();
      }
    }

    _addCodeClickEventListener(selectorIndex) {
      this._curCss.splice(selectorIndex, 0, {
        selector: '.' + '\u00A0'.repeat(8),
        props: [{ prop: '\u00A0'.repeat(4), value: '\u00A0'.repeat(4) }]
      });
      this._updateCssCode();
    }

    _removeCodeClickEventListener(selectorIndex) {
      this._curCss.splice(selectorIndex, 1);
      this._updateCssCode();
    }

    _textTableMousedownEventListener({ target, button, offsetX, offsetY }) {
      if (target.classList.contains('number-line')) {
        return;
      }
      if (button) {
        return;
      }
      this._startX = offsetX;
      this._startY = offsetY;
    }

    _textTableMouseUpEventListener({
      currentTarget,
      target,
      button,
      offsetX,
      offsetY,
      clientY
    }) {
      if (target.classList.contains('number-line')) {
        return;
      }
      if (button) {
        return;
      }

      const diffX = Math.abs(this._startX - offsetX);
      const diffY = Math.abs(this._startY - offsetY);

      if (diffX < 3 && diffY < 3) {
        const letterWidth = Tag.getLetterWidth(
          currentTarget.querySelector('.code-line')
        );
        const { top } = currentTarget.getBoundingClientRect();
        const parentOffsetY = clientY - top;
        const letterX = Math.floor((offsetX - 30) / letterWidth + 0.5);
        const letterY = Math.floor(parentOffsetY / Editor.CODE_HEIGHT);

        const scrollTop = this._codeWrapper.scrollTop;
        this._codeWrapper.removeAllChildren();
        const textareaWrapper = this._createCssCodeTextarea();
        this._codeWrapper.appendChild(textareaWrapper);

        const textarea = textareaWrapper.querySelector('textarea');
        textarea.focus();
        this._codeWrapper.scrollTop = scrollTop;

        const textareaLines = textarea.value.split('\n');
        const letterPos =
          (letterX > textareaLines[letterY].length
            ? textareaLines[letterY].length
            : letterX) +
          textareaLines
            .slice(0, letterY)
            .reduce((acc, v) => acc + v.length + 1, 0);
        textarea.selectionStart = textarea.selectionEnd = letterPos;
      }
    }

    _textTableBlurEventListener() {
      const textarea = this._codeWrapper.querySelector('textarea');
      this._curCss = Editor.parseCssText(textarea.value).map(
        ({ selector, props }) => ({
          selector,
          props: [...props.map((prop) => ({ ...prop }))]
        })
      );
      this._style.textContent = this._createStylesheet(textarea.value);

      this._codeWrapper.removeAllChildren();
      const table = this._createCssCodeTextTable();
      this._codeWrapper.appendChild(table);
    }

    _textareaKeydownEventListener(e, numbers) {
      const { currentTarget, key } = e;
      const { value } = currentTarget;
      const startIndex = currentTarget.selectionStart;
      const endIndex = currentTarget.selectionEnd;
      const curValue = value.slice(startIndex, endIndex);

      switch (key) {
        case 'Enter':
          {
            if (curValue.includes('{') || curValue.includes('}')) {
              this._updateLineNumbers(currentTarget, numbers);
              return;
            }

            let openingIndex = startIndex;
            let closingIndex = endIndex;

            if (
              value[openingIndex - 1] === '{' &&
              value[closingIndex] === '}'
            ) {
              e.preventDefault();
              const prevValue = currentTarget.value;
              currentTarget.value =
                value.slice(0, startIndex) + '\n  \n' + value.slice(endIndex);
              currentTarget.selectionStart = currentTarget.selectionEnd =
                startIndex + 3;
              this._updateLineNumbers(currentTarget, numbers);

              if (endIndex === prevValue.length - 1) {
                this._codeWrapper.scrollTop += Editor.CODE_HEIGHT * 2;
              }
              return;
            }

            while (true) {
              openingIndex--;
              if (value[openingIndex] === '{') {
                break;
              }
              if (value[openingIndex] === '}' || openingIndex < 0) {
                this._updateLineNumbers(currentTarget, numbers);
                return;
              }
            }
            while (true) {
              closingIndex++;
              if (value[closingIndex] === '}') {
                break;
              }
              if (
                value[closingIndex] === '{' ||
                closingIndex === value.length
              ) {
                this._updateLineNumbers(currentTarget, numbers);
                return;
              }
            }

            e.preventDefault();

            currentTarget.value =
              value.slice(0, startIndex) + '\n  ' + value.slice(endIndex);
            currentTarget.selectionStart = currentTarget.selectionEnd =
              startIndex + 3;
          }
          break;

        case '{':
          currentTarget.value =
            value.slice(0, startIndex) + '}' + value.slice(endIndex);
          currentTarget.selectionStart = currentTarget.selectionEnd =
            startIndex;
          break;
      }

      this._updateLineNumbers(currentTarget, numbers);
    }

    _textTableKeydownEventListener() {
      const selection = window.getSelection();
      if (!selection.toString()) {
        return;
      }
      const { anchorNode, focusNode, anchorOffset, focusOffset } = selection;
      const selectedText = selection
        .toString()
        .replace(/\n\d+(?=\n)/g, '')
        .replaceAll('\u00A0', ' ')
        .replaceAll('}\n', '}\n\n');

      let anchorLine = anchorNode;
      let focusLine = focusNode;
      try {
        while (!anchorLine?.classList?.contains('code-line')) {
          anchorLine = anchorLine.parentElement;
        }
        while (!focusLine?.classList?.contains('code-line')) {
          focusLine = focusLine.parentElement;
        }
      } catch {
        return;
      }

      const [node, firstLine, offset] =
        anchorLine.dataset.index === focusLine.dataset.index
          ? anchorOffset < focusOffset
            ? [anchorNode, anchorLine, anchorOffset]
            : [focusNode, focusLine, focusOffset]
          : Number(anchorLine.dataset.index) < Number(focusLine.dataset.index)
          ? [anchorNode, anchorLine, anchorOffset]
          : [focusNode, focusLine, focusOffset];

      const firstLineChildNodes = [...firstLine.childNodes]
        .reduce((acc, node) => [...acc, node, ...(node.childNodes ?? [])], [])
        .filter((node) => node instanceof Text);
      const nodeIndex = firstLineChildNodes.indexOf(node);
      const startIndex =
        firstLineChildNodes.reduce(
          (acc, node, i) =>
            i < nodeIndex ? acc + node.textContent.length : acc,
          0
        ) + offset;

      const scrollTop = this._codeWrapper.scrollTop;
      this._codeWrapper.removeAllChildren();
      const textareaWrapper = this._createCssCodeTextarea();
      this._codeWrapper.appendChild(textareaWrapper);

      const textarea = textareaWrapper.querySelector('textarea');
      textarea.focus();
      this._codeWrapper.scrollTop = scrollTop;

      const textareaLines = textarea.value.split('\n');
      const prevLength = textareaLines
        .slice(0, firstLine.dataset.index)
        .reduce((acc, line) => acc + line.length + 1, 0);

      textarea.selectionStart = (textarea.value + '\n')
        .replaceAll('\u00A0', ' ')
        .indexOf(selectedText, prevLength + startIndex);
      textarea.selectionEnd = textarea.selectionStart + selectedText.length;
    }

    // Update
    // ------------------------------------------------------------------------------

    // curHtml의 elem으로 Preview DOM 교체
    _updatePreviewDOM(dom = this._previewWrapper.elem, tag = this._curHtml) {
      for (let i = 0; i < tag.length; i++) {
        const { elem } = tag[i];
        if (elem !== dom.children[i]) {
          dom.insertBefore(elem, dom.children[i]);
        }
      }

      while (dom.children.length > tag.length) {
        dom.removeChild(dom.lastElementChild);
      }

      const domChildren = [...dom.children];
      for (let i = 0; i < tag.length; i++) {
        this._updatePreviewDOM(domChildren[i], tag[i].children);
      }
    }

    // 기존 Preview DOM 요소로 curHtml의 elem을 교체
    _updateAllPreviewDOM(dom = this._previewWrapper.elem, tag = this._curHtml) {
      const minLength = Math.min(dom.children.length, tag.length);
      for (let i = 0; i < minLength; i++) {
        tag[i].elem = dom.children[i];
      }

      while (dom.children.length < tag.length) {
        const newElem = document.createElement('div');
        tag[dom.children.length].elem = newElem;
        dom.appendChild(newElem);
      }

      while (dom.children.length > tag.length) {
        dom.removeChild(dom.lastElementChild);
      }

      const domChildren = [...dom.children];
      for (let i = 0; i < tag.length; i++) {
        this._updateAllPreviewDOM(domChildren[i], tag[i].children);
      }
    }

    // preview의 모든 자손 요소들의 style을 초기화 후, _curCss를 기준으로 다시 style 설정
    _updatePreviewStyle() {
      if (this._mode === 'snippet') {
        this._previewWrapper.initAllChildrenStyle();
        const elems = this._previewWrapper.querySelectorAll('*');
        elems.forEach((elem) => {
          const classList = [...elem.classList].map(
            (className) => '.' + className
          );
          const styles = [];
          this._curCss.forEach(({ selector, props }) => {
            if (classList.includes(selector)) {
              styles.push(
                props.map(({ prop, value }) => `${prop}:${value};`).join('')
              );
            }
          });
          elem.style = styles.join('');
        });
      }
    }

    // preview의 모든 item 요소들에 숫자 textContent와 고유한 className 부여
    _updatePreviewTextAndClassName() {
      const items = this._previewWrapper.querySelectorAll('.item');
      items.forEach((item, index) => {
        item.classList.add(`item${index + 1}`);
        if (!item.children.length) {
          item.textContent = index + 1;
        }
      });
      const containers = this._previewWrapper.querySelectorAll('.container');
      containers.forEach((container, index) => {
        container.classList.add(`container${index + 1}`);
      });
    }

    // code 안에 table을 통째로 교체
    // _cssTable은 _curCss를 기준으로 생성됨
    _updateCssCode() {
      this._curCss.forEach(({ props }, index) => {
        if (!props.length) {
          this._curCss.splice(index, 1);
        }
      });
      const table = this._createCssCodeElements();
      this._codeWrapper.removeAllChildren();
      this._codeWrapper.appendChild(table);
      this._updatePreviewStyle();
    }

    _updateHtml(
      tag = this._curHtml,
      counts = {
        item: 1,
        container: 1
      }
    ) {
      if (!(tag instanceof PreviewTag)) {
        tag.forEach((container) => this._updateHtml(container, counts));
      } else {
        const classList = [];

        if (tag.parent) {
          classList.push('item');
        }

        if (tag.children.length || !tag.parent) {
          classList.push('container', `container${counts.container++}`);
        } else {
          if (this._layout !== 'carousel') {
            if (tag.text === null) {
              tag.elem.textContent = counts.item;
            } else {
              tag.elem.textContent = tag.text;
            }
          }
          classList.push(`item${counts.item++}`);
        }

        tag.elem.className = classList.join(' ');
        tag.children.forEach((child) => {
          this._updateHtml(child, counts);
        });
      }
    }

    _updateHtmlCode() {
      this._updateHtml();
      const table = this._createCssCodeElements();
      this._codeWrapper.removeAllChildren();
      this._codeWrapper.appendChild(table);
    }

    _updateSelectorCodeLineStyle(line, codeLine) {
      const selectorSpan = Tag.createElement(
        'span',
        {
          class: 'selector-code'
        },
        line.slice(1)
      );
      Tag.appendChildren(codeLine, ['.', selectorSpan, '\u00A0{']);
    }

    _updatePropCodeLineStyle(prop, value, codeLine) {
      const propSpan = Tag.createElement(
        'span',
        {
          class: 'prop-code'
        },
        prop
      );
      const valueElem = Tag.createElement(
        'span',
        {
          class: 'value-code'
        },
        //!!flag 임시 조치 -> 여러 줄일 때 코드 줄 여러 개 생성해서 보여줘야 함
        value.trim()
      );

      Tag.appendChildren(codeLine, [
        '\u00A0\u00A0',
        propSpan,
        ':\u00A0',
        valueElem,
        ';'
      ]);
    }

    _updateLineNumbers(textarea, numbers) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      numbers.removeAllChildren();
      for (let i = 0; i < textarea.scrollHeight / Editor.CODE_HEIGHT; i++) {
        const lineNumber = Tag.createElement(
          'span',
          {
            class: 'number-line'
          },
          i + 1
        );
        numbers.appendChild(lineNumber);
      }
    }

    // _editor에 children을 순서대로 append
    _appendToEditor(children) {
      const fragment = document.createDocumentFragment();
      children.forEach((child) => fragment.appendChild(child.elem));
      this._editor.appendChild(fragment);
    }

    render() {
      this._editor.removeAllChildren();
      if (this._mode === 'snippet') {
        this._appendToEditor([
          this._snippetList,
          this._preview,
          this._code,
          this._buttons
        ]);
      } else if (this._mode === 'free') {
        if (this._layout === 'carousel') {
          this._appendToEditor([
            this._preview,
            this._carouselIndicators,
            this._code
          ]);
        } else {
          this._appendToEditor([this._preview, this._code]);
        }
      }
      this._updateHtml();
      this._updatePreviewStyle();
      console.log(this);
    }
  }

  const findEditors = () => {
    return [...document.querySelectorAll('.fg-editor')];
  };

  findEditors().forEach((editor, index) => new Editor(editor, index).render());
})();
