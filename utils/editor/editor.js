(function () {
  class Tag {
    constructor({ className, elem }) {
      if (className) {
        this._className = className;
      }
      this.elem = elem ?? document.createElement('div');
      this.setClassName();
    }

    get className() {
      return this._className;
    }

    static setAttributes(elem, options) {
      Object.entries(options).forEach(([attribute, value]) =>
        elem.setAttribute(attribute, value)
      );
    }

    static appendChildren(elem, children) {
      children.forEach((child) => elem.appendChild(child));
    }

    static addEventListeners(elem, options) {
      Object.entries(options).forEach(([event, listener]) => {
        elem.addEventListener(event, listener);
      });
    }

    setClassName() {
      if (this._className) {
        this.elem.setAttribute('class', this._className);
      }
    }

    appendChild(child) {
      if (Array.isArray(child)) {
        child.forEach((elem) => this.elem.appendChild(elem));
      } else if (child instanceof Tag) {
        this.elem.appendChild(child.elem);
      } else {
        this.elem.appendChild(child);
      }
    }

    removeChild(child) {
      if (Array.isArray(child)) {
        child.forEach((elem) => this.elem.removeChild(elem));
      } else if (child instanceof Tag) {
        this.elem.removeChild(child.elem);
      } else {
        this.elem.removeChild(child);
      }
    }

    querySelector(selector) {
      return this.elem.querySelector(selector);
    }

    querySelectorAll(selector) {
      return [...this.elem.querySelectorAll(selector)];
    }

    removeAllChildren = () => {
      while (this.elem.lastElementChild) {
        this.elem.removeChild(this.elem.lastElementChild);
      }
    };
  }

  // preview 안에 있는 container, item 요소들
  class PreviewTag extends Tag {
    constructor({ className, children = [] }) {
      super({ className, children });
      this.children = children;
      this.setClassName();
    }

    _setTextContent(text) {
      this.elem.textContent = text;
    }

    clone() {
      return new PreviewTag({
        className: this._className,
        children: [...this.children]
      });
    }

    // 재귀적으로 모든 자손 요소 추가
    render() {
      this.removeAllChildren(this.elem);
      this.children.forEach((child) => {
        child.render();
        this.elem.appendChild(child.elem);
      });
    }
  }

  class Editor {
    // CSS 파싱을 위한 정규표현식
    static CSS_STRING = /\.((container)|(item\d?))(:.*)?(::.*)?\{[^{}]*\}/g;

    // data-item을 입력하지 않았을 경우 기본값
    static DEFAULT_ITEM = 3;

    // 여분 코드 라인
    static EXTRA_CODE_LINE = 3;

    // CSS 프로퍼티 목록
    static CSS_PROPS = [
      'align-content',
      'align-items',
      'align-self',
      'column-gap',
      'display',
      'flex',
      'flex-basis',
      'flex-direction',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'gap',
      'grid',
      'grid-area',
      'grid-auto-columns',
      'grid-auto-rows',
      'grid-column',
      'grid-column-end',
      'grid-column-start',
      'grid-template-areas',
      'grid-template-columns',
      'grid-template-rows',
      'grid-row',
      'grid-row-end',
      'grid-row-start',
      'height',
      'justify-content',
      'order',
      'row-gap',
      'width'
    ];

    // CSS 프로퍼티 정보
    static CSS_PROPS_INFO = {
      'align-content': [
        'center',
        'flex-end',
        'flex-start',
        'normal',
        'space-around',
        'space-between',
        'space-evenly'
      ],
      'align-items': ['center', 'flex-end', 'flex-start', 'normal'],
      'align-self': [
        'center',
        'flex-end',
        'flex-start',
        'normal',
        'space-around',
        'space-between',
        'space-evenly'
      ],
      'column-gap': 'text',
      display: ['block', 'flex'],
      flex: 'text',
      'flex-basis': 'text',
      'flex-direction': ['column', 'column-reverse', 'row', 'row-reverse'],
      'flex-grow': 'text',
      'flex-shrink': 'text',
      'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
      gap: 'text',
      grid: 'text',
      'grid-area': [],
      'grid-auto-columns': [],
      'grid-auto-rows': [],
      'grid-column': [],
      'grid-column-end': [],
      'grid-column-start': [],
      'grid-template-areas': [],
      'grid-template-columns': [],
      'grid-template-rows': [],
      'grid-row': [],
      'grid-row-end': [],
      'grid-row-start': [],
      height: 'text',
      'justify-content': [
        'center',
        'flex-end',
        'flex-start',
        'normal',
        'space-around',
        'space-between',
        'space-evenly'
      ],
      order: 'text',
      'row-gap': 'text',
      width: 'text'
    };

    constructor(elem, editorId) {
      this._editorId = editorId;
      this._editor = new Tag({ elem });
      this._snippetIndex = 0;
      this._snippets = [];
      this._html = new Map();
      this._css = new Map();
      this._itemCountVariation = new Map();
      this._init();
    }

    _init() {
      // mode, snippetPos 초기화
      const {
        mode = 'snippet',
        snippetPos = 'up',
        item: defaultItemCount
      } = this._editor.elem.dataset;
      this._mode = mode;
      this._snippetPos = snippetPos;

      // snippets, css, html 초기화
      const codes = this._editor.querySelectorAll('code');
      codes.forEach(({ dataset: { snippet, item }, textContent }) => {
        if (this._mode === 'snippet' && !snippet) {
          throw new Error('snippet 이름이 유효하지 않습니다.');
        }

        const snippetName = snippet ?? 'main';
        this._snippets.push(snippetName);

        this._css.set(snippetName, Editor.parseCssText(textContent));
        this._html.set(snippetName, [
          new PreviewTag({
            className: 'container',
            children: [
              ...Array(
                Number.isInteger(Number(item))
                  ? Number(item)
                  : defaultItemCount
                  ? Number(defaultItemCount)
                  : Editor.DEFAULT_ITEM
              )
            ].map((_, i) => new PreviewTag({ className: 'item', index: i + 1 }))
          })
        ]);
      });
      this._initCurCss();

      // snippetList, preview, code, buttons 초기화
      this._initPreview();
      this._initCode();
      this._initSnippetList();
      this._initButtons();
    }

    // code 태그에 있는 문자열을 파싱하여 객체로 변환
    static parseCssText(cssText) {
      const trimmedCss = cssText.replaceAll(/\s+/g, '');
      const matchedCssArr = trimmedCss.match(Editor.CSS_STRING);
      if (!matchedCssArr) {
        return [];
      }
      return matchedCssArr.map((matchedCss) => {
        const index = matchedCss.indexOf('{');
        const selector = matchedCss.slice(0, index);
        const props = matchedCss
          .slice(index + 1, -1)
          .split(';')
          .filter((css) => css)
          .map((css) => {
            const [prop, value] = css.split(':');
            return { prop, value };
          });
        return { selector, props };
      });
    }

    // 현재 snippet명 반환
    get _curSnippet() {
      return this._snippets[this._snippetIndex];
    }

    // 각 코드 라인별로 들어갈 정보를 배열로 반환
    get _cssCodeLines() {
      const codeLines = [];
      for (const { selector, props } of this._curCss) {
        codeLines.push(selector);
        codeLines.push(...props.map(({ prop, value }) => `${prop}:${value}`));
        codeLines.push('}', '');
      }
      for (let i = 0; i < Editor.EXTRA_CODE_LINE; i++) {
        codeLines.push('');
      }
      return codeLines;
    }

    // 위 _cssCodeLines를 순회하면서 실제 화면에 보일 코드 생성
    get _cssTable() {
      const table = document.createElement('table');

      let selectorCount = 0;
      let propCount = 0;

      this._cssCodeLines.forEach((line, index) => {
        const row = document.createElement('tr');

        const lineNumber = document.createElement('td');
        lineNumber.setAttribute('class', 'number-line');
        lineNumber.textContent = index + 1;

        const codeLine = document.createElement('td');
        codeLine.setAttribute('class', 'code-line');
        if (line[0] === '.') {
          propCount = 0;
          const selectorSpan = document.createElement('span');
          Tag.setAttributes(selectorSpan, {
            class: 'button-code selector-code',
            'data-selector-index': selectorCount
          });
          selectorSpan.textContent = line.slice(1);
          if (line.slice(1).trim() === '') {
            selectorSpan.classList.add('button-blank');
          }

          const deleteButton = this._createDeleteCodeButton(selectorCount);

          Tag.appendChildren(codeLine, [
            deleteButton,
            document.createTextNode('.'),
            selectorSpan,
            document.createTextNode('\u00A0{')
          ]);
        } else if (line.includes(':')) {
          const [prop, value] = line.split(':');

          const propSpan = document.createElement('span');
          Tag.setAttributes(propSpan, {
            class: 'button-code prop-code',
            'data-selector-index': selectorCount,
            'data-prop-index': propCount
          });
          propSpan.textContent = prop;
          if (prop.trim() === '') {
            propSpan.classList.add('button-blank');
          }

          let valueElem;
          if (Editor.CSS_PROPS_INFO[prop] === 'text') {
            valueElem = document.createElement('input');
            Tag.setAttributes(valueElem, {
              class: 'button-code value-code',
              value,
              spellcheck: false,
              'data-selector-index': selectorCount,
              'data-prop-index': propCount
            });
            valueElem.style.width =
              (value.length ? (value.length + 1) * 9 : 30) + 'px';

            Tag.addEventListeners(valueElem, {
              click: this._codeInputEventListener,
              keydown: this._codeInputEventListener,
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
                this._updateCode();
                this._setPreviewStyle();
              }
            });
          } else {
            valueElem = document.createElement('span');
            Tag.setAttributes(valueElem, {
              class: 'button-code value-code',
              'data-selector-index': selectorCount,
              'data-prop-index': propCount
            });
          }

          valueElem.textContent = value;
          if (value.trim() === '') {
            valueElem.classList.add('button-blank');
          }

          const deleteButton = this._createDeleteCodeButton(
            selectorCount,
            propCount
          );
          const addButton = this._createAddCodeButton(selectorCount, propCount);

          Tag.appendChildren(codeLine, [
            deleteButton,
            document.createTextNode('\u00A0\u00A0'),
            propSpan,
            document.createTextNode(':\u00A0'),
            valueElem,
            document.createTextNode(';'),
            addButton
          ]);

          propCount += 1;
        } else {
          codeLine.textContent = line;
          if (line === '') {
            const addButton = this._createAddCodeButton(selectorCount);
            codeLine.appendChild(addButton);
          } else if (line === '}') {
            selectorCount += 1;
          }
        }

        Tag.appendChildren(row, [lineNumber, codeLine]);
        table.appendChild(row);
      });

      return table;
    }

    _codeInputEventListener({ currentTarget, currentTarget: { value } }) {
      if (currentTarget.value.trim() === '') {
        currentTarget.value = '';
      }
      currentTarget.style.width =
        (value.length > 4 ? (value.length + 1) * 9 : 50) + 'px';
    }

    _createDeleteCodeButton(selectorIndex, propIndex) {
      const elem = document.createElement('button');
      if (typeof propIndex === 'number') {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-delete',
          'data-selector-index': selectorIndex,
          'data-prop-index': propIndex
        });
        elem.addEventListener('click', () => {
          this._curCss[selectorIndex].props.splice(propIndex, 1);
          this._updateCode();
          this._setPreviewStyle();
        });
      } else {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-delete',
          'data-selector-index': selectorIndex
        });
        elem.addEventListener('click', () => {
          this._curCss.splice(selectorIndex, 1);
          this._updateCode();
          this._setPreviewStyle();
        });
      }
      elem.textContent = '-';
      return elem;
    }

    _createAddCodeButton(selectorIndex, propIndex) {
      const elem = document.createElement('button');
      if (typeof propIndex === 'number') {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-add',
          'data-selector-index': selectorIndex,
          'data-prop-index': propIndex
        });
        elem.addEventListener('click', () => {
          this._curCss[selectorIndex].props.splice(propIndex + 1, 0, {
            prop: '\u00A0'.repeat(4),
            value: '\u00A0'.repeat(4)
          });
          this._updateCode();
          this._setPreviewStyle();
        });
      } else {
        Tag.setAttributes(elem, {
          type: 'button',
          class: 'button-add button-add-selector',
          'data-selector-index': selectorIndex
        });
        elem.addEventListener('click', () => {
          this._curCss.splice(selectorIndex, 0, {
            selector: '.' + '\u00A0'.repeat(8),
            props: [{ prop: '\u00A0'.repeat(4), value: '\u00A0'.repeat(4) }]
          });
          this._updateCode();
          this._setPreviewStyle();
        });
      }
      elem.textContent = '+';
      return elem;
    }

    // _css는 처음 마크업에 입력된 css를 저장하는 것이라면,
    // _curCss는 현재 snippet에서의 css를 기록한다.
    // code에서 css 수정할 때 즉시 preview에 반영하기 위함
    _initCurCss() {
      const cssArr = [...this._css.get(this._curSnippet)];
      this._curCss = cssArr.map(({ selector, props }) => ({
        selector,
        props: [...props.map((prop) => ({ ...prop }))]
      }));
    }

    _initPreview() {
      this._preview = new Tag({ className: 'preview' });
      this._preview.removeAllChildren();
      const containers = this._html.get(this._curSnippet);
      containers.forEach((container) => {
        container.render();
        this._preview.appendChild(container);
      });
    }

    // 이전 상태와 비교하여 변경된 부분만 수정(transition을 살리기 위함)
    _updatePreview(prev, cur, curElem = this._preview.elem) {
      let lengthDiff = prev.length - cur.length;
      while (lengthDiff > 0) {
        curElem.removeChild(curElem.lastElementChild);
        lengthDiff--;
      }
      while (lengthDiff < 0) {
        const container = cur[cur.length + lengthDiff];
        container.render();
        curElem.appendChild(container.elem);
        lengthDiff++;
      }

      const minLength = Math.min(prev.length, cur.length);
      for (let i = 0; i < minLength; i++) {
        if (prev[i].className !== cur[i].className) {
          const prevElem = curElem.children[i];
          cur[i].render();
          curElem.insertBefore(cur[i].elem, prevElem);
          curElem.removeChild(prevElem);
        }
        this._updatePreview(
          prev[i].children,
          cur[i].children,
          curElem.children[i]
        );
      }
    }

    // preview의 모든 자손 요소들의 style을 초기화 후, _curCss를 기준으로 다시 style 설정
    _setPreviewStyle() {
      this._preview.querySelectorAll('*').forEach((elem) => (elem.style = ''));
      this._curCss.forEach(({ selector, props }) => {
        const elems = this._preview.querySelectorAll(selector);
        elems.forEach(
          (elem) =>
            (elem.style = props
              .map(({ prop, value }) => `${prop}:${value};`)
              .join(''))
        );
      });
    }

    // preview의 모든 item 요소들에 숫자 textContent와 고유한 className 부여
    _setPreviewTextAndClassName() {
      const items = this._preview.querySelectorAll('.item');
      items.forEach((item, index) => {
        item.classList.add(`item${index + 1}`);
        item.textContent = index + 1;
      });
    }

    _initCode() {
      const elem = document.createElement('div');
      const wrapper = document.createElement('div');
      this._codeWrapper = new Tag({
        className: 'wrapper-code',
        wrapper
      });

      const table = this._cssTable;
      this._codeWrapper.appendChild(table);

      this._isDropdownOpen = false;
      let scrollTop = 0;
      // free 모드에서는 css를 클릭해서 수정하지 않고 텍스트로 직접 수정하도록 할 예정
      if (this._mode === 'snippet') {
        elem.addEventListener('click', ({ target: targetCode }) => {
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

          this._dropdownParent = targetCode;
          const { selectorIndex, propIndex } = targetCode.dataset;
          if (targetCode.classList.contains('selector-code')) {
            this._dropdown = this._createDropdown(
              targetCode,
              'selector',
              (targetItem) => {
                const duplicate = this._curCss.find(
                  ({ selector }) => selector.slice(1) === targetItem.textContent
                );
                const curSelector = this._curCss[selectorIndex];
                if (duplicate) {
                  curSelector.props.push(...duplicate.props);
                  this._curCss.splice(this._curCss.indexOf(duplicate), 1);
                }
                curSelector.selector = '.' + targetItem.textContent;
              }
            );
          } else if (targetCode.classList.contains('prop-code')) {
            this._dropdown = this._createDropdown(
              targetCode,
              'prop',
              (targetItem) => {
                const curSelector = this._curCss[selectorIndex];
                curSelector.props[propIndex].prop = targetItem.textContent;
              }
            );
            scrollTop = Editor.CSS_PROPS.indexOf(targetCode.textContent) * 30;
          } else if (targetCode.classList.contains('value-code')) {
            this._dropdown = this._createDropdown(
              targetCode,
              'value',
              (targetItem) => {
                const curSelector = this._curCss[selectorIndex];
                curSelector.props[propIndex].value = targetItem.textContent;
              }
            );
            const prop = this._curCss[selectorIndex].props[propIndex].prop;
            scrollTop =
              Editor.CSS_PROPS_INFO[prop].indexOf(targetCode.textContent) * 30;
          }
          targetCode.appendChild(this._dropdown);
          this._dropdown.scrollTop = scrollTop;
          this._isDropdownOpen = true;
        });
      }

      this._code = new Tag({
        className: 'code',
        elem
      });

      this._code.appendChild(this._codeWrapper);
    }

    // code 안에 table을 통째로 교체
    // _cssTable은 _curCss를 기준으로 생성됨
    _updateCode() {
      this._curCss.forEach(({ props }, index) => {
        if (!props.length) {
          this._curCss.splice(index, 1);
        }
      });
      const table = this._cssTable;
      this._codeWrapper.removeAllChildren();
      this._codeWrapper.appendChild(table);
    }

    _initSnippetList() {
      const elem = document.createElement('div');
      const form = document.createElement('form');
      this._snippets.forEach((snippet, index) => {
        const input = document.createElement('input');
        Tag.setAttributes(input, {
          type: 'radio',
          id: `editor${this._editorId}-snippet${index + 1}`,
          name: `snippet`,
          class: 'input-snippet'
        });
        if (!index) {
          input.setAttribute('checked', true);
        }

        const label = document.createElement('label');
        Tag.setAttributes(label, {
          for: `editor${this._editorId}-snippet${index + 1}`,
          class: 'label-snippet'
        });
        label.textContent = snippet;

        const handleChange = () => {
          this.changeSnippet(index);
        };
        input.addEventListener('change', handleChange);

        Tag.appendChildren(form, [input, label]);
      });
      elem.appendChild(form);
      this._snippetList = new Tag({
        className: 'list-snippet',
        elem
      });
    }

    _initButtons() {
      const elem = document.createElement('div');

      const addButton = document.createElement('button');
      Tag.setAttributes(addButton, {
        type: 'button',
        class: 'button button-add'
      });
      addButton.textContent = '+ Add Box';
      const handleClickAdd = () => {
        const container = this._preview.querySelector('.container');
        const item = new PreviewTag({ className: 'item' });
        container.appendChild(item.elem);
        this._setItemCountVariation(container, 1);
        this._setPreviewTextAndClassName();
        this._setPreviewStyle();
      };
      addButton.addEventListener('click', handleClickAdd.bind(this));

      const removeButton = document.createElement('button');
      Tag.setAttributes(removeButton, {
        type: 'button',
        class: 'button button-remove'
      });
      removeButton.textContent = '- Remove Box';
      const handleClickRemove = () => {
        const container = this._preview.querySelector('.container');
        const lastChild = container.lastElementChild;
        if (lastChild) {
          container.removeChild(lastChild);
          this._setItemCountVariation(container, -1);
          this._setPreviewTextAndClassName();
          this._setPreviewStyle();
        }
      };
      removeButton.addEventListener('click', handleClickRemove.bind(this));

      elem.appendChild(addButton);
      elem.appendChild(removeButton);
      this._buttons = new Tag({ className: 'buttons', elem });
    }

    _setItemCountVariation(container, variation) {
      const value = this._itemCountVariation.get(container);
      if (value) {
        this._itemCountVariation.set(container, value + variation);
      } else {
        this._itemCountVariation.set(container, variation);
      }
    }

    // 현재 snippet과 비교하여 add item, remove item을 하여 변동된 item 개수를 복원함
    // snippet 변경시 이전 snippet에서 현재 snippet과 비교하기 전에
    // 이전 snippet의 원래 상태로 복원하기 위함
    _restoreItemCountVariation() {
      for (const [container] of this._itemCountVariation) {
        while (this._itemCountVariation.get(container) > 0) {
          container.removeChild(container.lastElementChild);
          this._setItemCountVariation(container, -1);
        }
        while (this._itemCountVariation.get(container) < 0) {
          container.appendChild(new PreviewTag({ className: 'item' }).elem);
          this._setItemCountVariation(container, 1);
        }
      }
    }

    // css를 클릭하면 나오는 dropdown
    _createDropdown(target, type, handleClick) {
      const elem = document.createElement('div');
      elem.setAttribute('class', 'dropdown');
      const list = document.createElement('ul');
      switch (type) {
        case 'selector': {
          const containerCount =
            this._preview.querySelectorAll('.container').length;
          const containers =
            containerCount > 1
              ? [...Array(containerCount)].map(
                  (_, index) => `container${index + 1}`
                )
              : ['container'];
          const itemCount = this._preview.querySelectorAll('.item').length;
          const items = [...Array(itemCount)].map(
            (_, index) => `item${index + 1}`
          );
          [...containers, ...items].forEach((selector) => {
            if (selector !== target.textContent) {
              const item = document.createElement('li');
              item.textContent = selector;
              list.appendChild(item);
            }
          });
          break;
        }
        case 'prop': {
          Editor.CSS_PROPS.forEach((prop) => {
            const item = document.createElement('li');
            item.textContent = prop;
            list.appendChild(item);
          });
          break;
        }
        case 'value': {
          const { selectorIndex, propIndex } = target.dataset;
          const curProp = this._curCss[selectorIndex].props[propIndex].prop;
          Editor.CSS_PROPS_INFO[curProp].forEach((value) => {
            const item = document.createElement('li');
            item.textContent = value;
            list.appendChild(item);
          });
          break;
        }
      }
      elem.appendChild(list);
      elem.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
          return;
        }
        handleClick(target);
        this._updateCode();
        this._setPreviewStyle();
      });
      return elem;
    }

    // _editor에 children을 순서대로 append
    _appendToEditor(children) {
      const fragment = document.createDocumentFragment();
      children.forEach((child) => fragment.appendChild(child.elem));
      this._editor.appendChild(fragment);
    }

    // snippetList에서 snippet을 변경했을 때 실행
    changeSnippet(index) {
      const prevHtml = this._html.get(this._curSnippet);
      this._snippetIndex = index;
      const curHtml = this._html.get(this._curSnippet);
      this._restoreItemCountVariation();
      this._initCurCss();
      this._updatePreview(prevHtml, curHtml);
      this._updateCode();
      this._setPreviewTextAndClassName();
      this._setPreviewStyle();
    }

    render() {
      this._editor.removeAllChildren();
      if (this._mode === 'snippet') {
        if (this._snippetPos === 'up') {
          this._appendToEditor([
            this._snippetList,
            this._preview,
            this._code,
            this._buttons
          ]);
        } else if (this._snippetPos === 'down') {
          this._appendToEditor([
            this._buttons,
            this._preview,
            this._code,
            this._snippetList
          ]);
        }
      } else {
        this._appendToEditor([this._preview, this._code]);
      }
      this._setPreviewTextAndClassName();
      this._setPreviewStyle();
      console.log(this);
    }
  }

  const findEditors = () => {
    return [...document.querySelectorAll('.fg-editor')];
  };

  findEditors().forEach((editor, index) => new Editor(editor, index).render());
})();
