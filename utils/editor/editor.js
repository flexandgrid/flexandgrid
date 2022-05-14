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
      children.forEach((child) => elem.appendChild(child));
    }

    static addEventListeners(elem, options) {
      Object.entries(options).forEach(([event, listener]) => {
        elem.addEventListener(event, listener);
      });
    }

    static createElement(tagName, attributes, textContent = '') {
      const elem = document.createElement(tagName);
      Tag.setAttributes(elem, attributes);
      elem.textContent = textContent;
      return elem;
    }

    get dataset() {
      return this.elem.dataset;
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
    constructor({ className, children = [] }) {
      super({ className, children });
      this.children = children;
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

    // 드롭다운 한 줄 높이
    static DROPDOWN_HEIGHT = 30;

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

    // CSS 프로퍼티 목록
    static CSS_PROPS = Object.keys(Editor.CSS_PROPS_INFO);

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

    constructor(elem, editorId) {
      this._editorId = editorId;
      this._editor = new Tag({ elem });
      this._snippetIndex = 0;
      this._snippets = [];
      this._itemCountVariation = new Map();
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
      for (let i = 0; i < Editor.EXTRA_CODE_LINE; i++) {
        codeLines.push('');
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
          : ['container'];
      const itemCount = this._previewWrapper.querySelectorAll('.item').length;
      const items = [...Array(itemCount)].map((_, index) => `item${index + 1}`);
      return [...containers, ...items];
    }

    // Init
    // ------------------------------------------------------------------------------

    _init() {
      this._initMode();
      this._initSnippets();
      this._initCurCss();
      this._initElements();
    }

    _initMode() {
      const { mode = 'snippet' } = this._editor.dataset;
      this._mode = mode;
    }

    _initSnippets() {
      const { item: defaultItemCount } = this._editor.dataset;
      const codes = this._editor.querySelectorAll('code');
      codes.forEach(({ dataset: { snippet, item }, textContent }) => {
        let snippetName;
        if (this._mode === 'snippet' && !snippet) {
          snippetName = '제목없음';
        } else {
          snippetName = snippet ?? 'main';
        }

        this._snippets.push({
          name: snippetName,
          html: [
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
              ].map(
                (_, i) => new PreviewTag({ className: 'item', index: i + 1 })
              )
            })
          ],
          css: Editor.parseCssText(textContent)
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

    _initElements() {
      this._initPreview();
      this._initCode();
      this._initSnippetList();
      this._initButtons();
    }

    _initPreview() {
      this._preview = new Tag({ className: 'preview' });
      this._previewWrapper = new Tag({ className: 'wrapper-preview' });
      const containers = this._curSnippet.html;
      containers.forEach((container) => {
        container.render();
        this._previewWrapper.appendChild(container);
      });
      this._preview.appendChild(this._previewWrapper);
    }

    _initCode() {
      this._code = new Tag({ className: 'code' });
      this._codeWrapper = new Tag({ className: 'wrapper-code' });
      const table = this._createCssCodeTable();
      this._codeWrapper.appendChild(table);
      this._code.appendChild(this._codeWrapper);

      this._isDropdownOpen = false;
      // free 모드에서는 css를 클릭해서 수정하지 않고 텍스트로 직접 수정하도록 할 예정
      if (this._mode === 'snippet') {
        this._code.addEventListener('click', (e) =>
          this._codeClickEventListener(e)
        );
      }
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

    // Create
    // ------------------------------------------------------------------------------

    _createCssCodeTable() {
      let selectorIndex = 0;
      let propIndex = 0;

      const table = document.createElement('table');
      this._cssCodeLines.forEach((line, index) => {
        const row = document.createElement('tr');

        const lineNumber = Tag.createElement(
          'td',
          {
            class: 'number-line'
          },
          index + 1
        );

        const codeLine = Tag.createElement('td', { class: 'code-line' });
        if (line[0] === '.') {
          this._createSelectorCodeLine(line, codeLine, selectorIndex);
        } else if (line.includes(':')) {
          this._createPropCodeLine(line, codeLine, selectorIndex, propIndex);
          propIndex += 1;
        } else {
          codeLine.textContent = line;
          if (line === '') {
            const addButton = this._createAddCodeButton(selectorIndex);
            codeLine.appendChild(addButton);
          } else if (line === '}') {
            selectorIndex += 1;
            propIndex = 0;
          }
        }

        Tag.appendChildren(row, [lineNumber, codeLine]);
        table.appendChild(row);
      });

      return table;
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
        document.createTextNode('.'),
        selectorSpan,
        document.createTextNode('\u00A0{')
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
      if (Editor.CSS_PROPS_INFO[prop] === 'text') {
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

    _createPropCodeLine(line, codeLine, selectorIndex, propIndex) {
      const [prop, value] = line.split(':');
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
        document.createTextNode('\u00A0\u00A0'),
        propSpan,
        document.createTextNode(':\u00A0'),
        valueElem,
        document.createTextNode(';'),
        addButton
      ]);
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
          this._updateCode();
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
          this._updateCode();
        });
      } else {
        elem.setAttribute('class', 'button-add button-add-selector');
        elem.addEventListener('click', () =>
          this._addCodeClickEventListener(selectorIndex)
        );
      }
      return elem;
    }

    _createSelectorDropdown(targetCode, selectorIndex) {
      const handleClick = (targetItem) => {
        const duplicate = this._curCss.find(
          ({ selector }) => selector.slice(1) === targetItem.textContent
        );
        const curSelector = this._curCss[selectorIndex];
        if (duplicate) {
          curSelector.props.push(...duplicate.props);
          this._curCss.splice(this._curCss.indexOf(duplicate), 1);
        }
        curSelector.selector = '.' + targetItem.textContent;
      };
      this._dropdown = this._createDropdown(
        (list) => this._createSelectorDropdownItems(targetCode)(list),
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

    _createSelectorDropdownItems(targetCode) {
      return (list) => {
        this._classList.forEach((selector) => {
          if (selector !== targetCode.textContent) {
            const item = Tag.createElement('li', {}, selector);
            list.appendChild(item);
          }
        });
      };
    }

    _createPropDropdownItems() {
      return (list) => {
        Editor.CSS_PROPS.forEach((prop) => {
          const item = Tag.createElement('li', {}, prop);
          list.appendChild(item);
        });
      };
    }

    _createValueDropdownItems(targetCode) {
      return (list) => {
        const { selectorIndex, propIndex } = targetCode.dataset;
        const curProp = this._curCss[selectorIndex].props[propIndex].prop;
        Editor.CSS_PROPS_INFO[curProp].forEach((value) => {
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
        this._updateCode();
      });
      return elem;
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
        this._createSelectorDropdown(targetCode, selectorIndex);
      }
      if (targetCode.classList.contains('prop-code')) {
        this._createPropDropdown(selectorIndex, propIndex);
        scrollTop =
          Editor.CSS_PROPS.indexOf(targetCode.textContent) *
          Editor.DROPDOWN_HEIGHT;
      }
      if (targetCode.classList.contains('value-code')) {
        this._createValueDropdown(targetCode, selectorIndex, propIndex);
        const prop = this._curCss[selectorIndex].props[propIndex].prop;
        scrollTop =
          Editor.CSS_PROPS_INFO[prop].indexOf(targetCode.textContent) *
          Editor.DROPDOWN_HEIGHT;
      }
      targetCode.appendChild(this._dropdown);
      this._dropdown.scrollTop = scrollTop;
      this._isDropdownOpen = true;
    }

    // snippetList에서 snippet을 변경했을 때 실행
    _snippetChangeEventListener(index) {
      const prevHtml = this._curSnippet.html;
      this._snippetIndex = index;
      const curHtml = this._curSnippet.html;
      this._restoreItemCountVariation();
      this._initCurCss();
      this._updatePreviewDOM(prevHtml, curHtml);
      this._updateCode();
      this._updatePreviewTextAndClassName();
    }

    _addItemClickEventListener() {
      const container = this._previewWrapper.querySelector('.container');
      const item = new PreviewTag({ className: 'item' });
      container.appendChild(item.elem);
      this._updateItemCountVariation(container, 1);
      this._updatePreviewTextAndClassName();
      this._updatePreviewStyle();
    }

    _removeItemClickEventListener() {
      const container = this._previewWrapper.querySelector('.container');
      const lastChild = container.lastElementChild;
      if (lastChild) {
        container.removeChild(lastChild);
        this._updateItemCountVariation(container, -1);
        this._updatePreviewTextAndClassName();
        this._updatePreviewStyle();
      }
    }

    _addCodeClickEventListener(selectorIndex) {
      this._curCss.splice(selectorIndex, 0, {
        selector: '.' + '\u00A0'.repeat(8),
        props: [{ prop: '\u00A0'.repeat(4), value: '\u00A0'.repeat(4) }]
      });
      this._updateCode();
    }

    _removeCodeClickEventListener(selectorIndex) {
      this._curCss.splice(selectorIndex, 1);
      this._updateCode();
    }

    // Update
    // ------------------------------------------------------------------------------

    // 이전 상태와 비교하여 변경된 부분만 수정(transition을 살리기 위함)
    _updatePreviewDOM(prev, cur, curElem = this._previewWrapper.elem) {
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
        this._updatePreviewDOM(
          prev[i].children,
          cur[i].children,
          curElem.children[i]
        );
      }
    }

    // preview의 모든 자손 요소들의 style을 초기화 후, _curCss를 기준으로 다시 style 설정
    _updatePreviewStyle() {
      this._previewWrapper.initAllChildrenStyle();
      this._curCss.forEach(({ selector, props }) => {
        const elems = this._previewWrapper.querySelectorAll(selector);
        elems.forEach(
          (elem) =>
            (elem.style = props
              .map(({ prop, value }) => `${prop}:${value};`)
              .join(''))
        );
      });
    }

    // preview의 모든 item 요소들에 숫자 textContent와 고유한 className 부여
    _updatePreviewTextAndClassName() {
      const items = this._previewWrapper.querySelectorAll('.item');
      items.forEach((item, index) => {
        item.classList.add(`item${index + 1}`);
        item.textContent = index + 1;
      });
    }

    // code 안에 table을 통째로 교체
    // _cssTable은 _curCss를 기준으로 생성됨
    _updateCode() {
      this._curCss.forEach(({ props }, index) => {
        if (!props.length) {
          this._curCss.splice(index, 1);
        }
      });
      const table = this._createCssCodeTable();
      this._codeWrapper.removeAllChildren();
      this._codeWrapper.appendChild(table);
      this._updatePreviewStyle();
    }

    _updateItemCountVariation(container, variation) {
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
          this._updateItemCountVariation(container, -1);
        }
        while (this._itemCountVariation.get(container) < 0) {
          container.appendChild(new PreviewTag({ className: 'item' }).elem);
          this._updateItemCountVariation(container, 1);
        }
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
      } else {
        this._appendToEditor([this._preview, this._code]);
      }
      this._updatePreviewTextAndClassName();
      this._updatePreviewStyle();
      console.log(this);
    }
  }

  const findEditors = () => {
    return [...document.querySelectorAll('.fg-editor')];
  };

  findEditors().forEach((editor, index) => new Editor(editor, index).render());
})();
