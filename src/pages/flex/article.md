# 1. Flex

## 1.1. 들어가기에 앞서

기기가 다양해짐에 따라 화면 크기도 다양하게 변화되었다. 다양한 기기에 대응하기 위해 웹 서비스를 유연하게 만드는 것은 선택이 아닌 필수가 되었다.

웹 서비스를 만들기 전 서비스의 구조, 대응 기기, 레이아웃, 디자인 등을 계획하여 구현 우선순위를 정하게 된다. 여기서 페이지 레이아웃을 지정하는 방법은 CSS 기술이 발전함에 따라 많은 변화가 있었다. 다양한 화면의 크기에 맞추어 유연하게 대응할 수 있는 레이아웃을 만들기 위해 새롭게 추가된 속성이 Flex와 Grid이다. **Flex는 1차원 적인 레이아웃**을 잡을 때 사용하며, **grid는 2차원 적인 레이아웃**을 잡을 때 용이하다. 쉽게 설명하자면 다음과 같다.

Flex는 부모 요소(컨테이너) 아래에서 \***\*자식 요소(아이템)들이 한 방향으로 배치가 된다. 따라서 **행 또는 열\*\* 한 가지 방향으로 레이아웃을 배치해야 하는 경우에 사용한다. 또한 다양한 속성을 통해 자식 요소 사이를 일정한 간격으로 줄 수 있고 정렬하기가 매우 편하다.

Grid는 **행과 열** 두 가지 방향으로 레이아웃을 배치해야 하는 경우 사용한다. 원하는 요소를 어디서부터 어디까지, 어느 방향으로 차지하게 할 건지 정하고 배치하면 된다.

지금부터 ‘알아서 잘 딱 깔끔하고 센스 있게’ Flex를 배워보자.

## 1.2. Flex란?

Flexbox는 모던한 웹사이트를 위하여 제안된 CSS3의 새로운 레이아웃 방식이다. 공식적으로 “CSS Flexible Box Layout Module”이라고 정의된 Flexbox 레이아웃은 요소의 사이즈가 명확하지 않거나 동적으로 변화할 때, 방향은 물론 순서 등을 개선하기 위해 만들어진 CSS3의 새로운 레이아웃 방식이다.

Flexbox 레이아웃을 통해 요소의 위치를 더 간단하게 만들고 더 적은 코드로 복잡한 레이아웃을 만들 수 있기에 개발 과정을 편하게 도와주며 사용하기가 더 쉽다.

Flexbox 레이아웃은 블록이나 인라인 레벨 요소와는 달리 ‘방향’을 중심으로 구성한다.

## 1.3. 당신이 Flex를 알면 만들 수 있는 것들 : Flex 속성을 통해 만들 수 있는 레이아웃 소개

Flex는 레이아웃 배치에 용이한 속성이다. 아래의 그림과 같이 전체적인 카드를 순서대로 배치할 수 있고, 또한 각 카드 내부에서도 Flex를 이용해서 요소를 보다 쉽게 배치할 수 있다.

![flex로 구현된 UI - 1](01.png)

flex로 구현된 UI - 1

Flex를 활용한 홈페이지다. 전체적인 레이아웃을 Flex로 배치하고, 아이템들 또한 Flex를 사용한 것을 확인할 수 있다. 이처럼 Flex를 사용한다면, 기존에 float를 이용한 방법보다 더욱 쉽고 간편하게 요소들은 배치할 수 있다.

![flex로 구현된 UI - 2](02.png)

flex로 구현된 UI - 2

## 1.4. Flex의 특징

Flex는 ul과 li처럼 부모와 자식 태그가 필요하고, 부모 요소(`flex-container`)와 자식 요소(`flex-item`)에 적용하는 속성이 구분되어 있다는 특징을 갖는다.

flex-container에는 정렬 방식과 item의 배치 흐름을 정의하고, flex-item에는 크기, 속성, 순서를 정의한다.

`flex-container`의 속성으로는 **flex-direction, flex-wrap, justify-content, align-items, align-content**이 있고, `flex-item`은 **flex, flex-grow, flex-shrink, flex-basis, align-self, order, z-index** 등의 속성이 있다.

축이라는 개념이 있어서 이 축을 기준으로 정렬을 할 수도 있고, 흐름도 제어할 수 있다. 주축(main axis)에 따라 정렬되며, 방향은 flex-direction 속성으로 결정한다.

## 1.5. axis와 cross-axis

### 1.5.1. axis란?

Flex는 부모 요소의 속성을 통해 자식들의 방향을 제어할 수 있다. 이 속성을 통해 자식들을 가로(행 방향)로 배열할 수도 있고, 세로(열 방향)로 배열할 수도 있고 심지어 반대 방향으로도 배치가 가능하다.

**Axis는 축**을 의미하는데, 축이란 어떠한 것이 움직이는 데에 방향의 기준이 되는 것을 뜻한다. 지구의 자전축이 보이지 않듯, Flex에는 보이지 않지만 두 가지 축이 존재한다. Flex의 이 두 가지 축은 자식들이 어느 방향으로 정렬이 될지 정해주는 기준이 된다.

![1.png](03_336.png)

### 1.5.2. 주축과 교차축

- **Main Axis**

Flex의 주축이 되는 main axis의 방향은 `flex-direction` 이라는 속성에 의해 결정된다. 이는 다음과 같이 **네 가지의 경우**가 있다. 자세한 설명과 코드는 flex-direction 챕터에서 다루게된다.

1. `flex-direction: row` : `flex-direction` 의 기본값으로 아이템들이 행 방향, 가로로 배치된다.
2. `flex-direction: row-reverse` : 아이템들이 역순으로 가로로 배치된다.
3. `flex-direction: column` : 아이템들이 열 방향으로, 세로로 배치된다.
4. `flex-direction: column-reverse` : 아이템들이 역순으로 세로로 배치된다.

![flex-direction:row](04.png)

flex-direction:row

![flex-direction:column](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%201.png)

flex-direction:column

- **Cross Axis**

Cross axis는 Main axis 방향의 수직 방향이다. Main axis가 `flex-direction` 에 의해 결정되었다면, Cross axis는 main axis 방향에 따라 결정이 된다.

### 1.5.3. dir 특성

<aside>
💡 1.5.3 챕터와 1.5.4 챕터는 건너 뛰셨다가 필요할 때 찾아보기를 권고해드립니다.

</aside>

html 요소 텍스트의 방향성을 나타내는 열거된 속성이다. 기본값은 `auto`이다.

```html
<div dir="ltr / rtl / auto">...</div>
```

- `ltr` : 글자를 읽는 방법이 왼쪽에서 오른쪽으로 쓰이는 언어이다.
- `rtl` : 글자를 읽는 방법이 오른쪽에서 왼쪽으로 읽는 아랍권 국가에서 사용된다.
- `auto` : 기본 알고리즘을 사용하여 강한 방향성을 가진 문자를 찾을 때까지 요소 내부의 문자를 구문 분석하고 전체 요소에 해당 방향성을 적용한다.

**dir 속성에 따른 flex-Axis의 변화**

`flex-direction:row`와 `flex-direction:row-reverse`는 컨테이너의 방향성에 따라 영향을 받기 때문에 `dir`전역 속성을 확인해야 한다.

**ltr**

- `flex-direction:row` : flex-Axis는 왼쪽의 flex-start에서 오른쪽 flex-end이다.
- `flex-direction:row-reverse` : flex-Axis는 오른쪽 flex-start에서 왼쪽 flex-end이다.
- container에 `dir="ltr"` 입력

**rtl**

- `flex-direction:row` : flex-Axis는 오른쪽의 flex-start에서 왼쪽 flex-end이다.
- `flex-direction:row-reverse` : flex-Axis는 왼쪽 flex-start에서 오른쪽 flex-end이다.
- container에 `dir="rtl"` 입력

```html
<body>
  <div dir="rtl" class="container">
    //container가 rtl로 변환된다.
    <div class="item">1</div>
    <div class="item even">2</div>
    <div class="item">3</div>
  </div>
</body>
```

- `flex-direction:row`

![row.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/row.png)

```css
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
```

- `flex-direction:row-reverse`

![row-reverse.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/row-reverse.png)

```css
.container {
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
}
```

### 1.5.4. writing mode에 따라 바뀌는 축

**writing mode(읽기 모드)란?**

문서를 구성하는 텍스트 흐름 방향을 `writing mode`라고 한다.

**writing mode의 중요성**

최근 `flex` 박스와 `grid` 템플릿을 사용한 레이아웃이 많아지고 있다. 이때 우리는 자연스럽게 인라인 방향(텍스트 방향)을 왼쪽에서 오른쪽, 블록 방향(단락 방향)은 위에서 아래라고 생각한다. 표준 방향 `row`도, 인라인 방향이 가로인 것도 이상하다고 느끼지 않는다. 하지만 국가마다 설정된 `writing mode`가 다를 수 있다. 만약 우리가 만든 홈페이지를 전 세계에서 보게 된다면, `writing mode`를 고려해야 하는 상황이 생길 수도 있다. 아직은 영어권 국가에서 사용하는 `horizontal-tb` 방향 이외의 writing mode를 많이 사용하지 않지만, `flex`와 `grid` 시대를 맞이하며 `writing mode`에 대한 이해를 바탕으로 논리적 사고를 확장하는 것은 중요한 일이다.

![가로 방향으로 글을 작성할 때 일반적으로 적용되는 블록(단락)과 인라인(텍스트) 방향이다.](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%EA%B0%80%EB%A1%9C%EB%AA%A8%EB%93%9C.png)

가로 방향으로 글을 작성할 때 일반적으로 적용되는 블록(단락)과 인라인(텍스트) 방향이다.

![세로 방향으로 글을 작성할 때 적용되는 블록(단락)과 인라인(텍스트) 방향이다.](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%EC%84%B8%EB%A1%9C%EB%AA%A8%EB%93%9C.png)

세로 방향으로 글을 작성할 때 적용되는 블록(단락)과 인라인(텍스트) 방향이다.

**writing mode 종류**

**1) horizontal-tb**

텍스트를 왼쪽에서 시작하여 오른쪽으로 작성된다. 영어나 아랍어에서 주로 사용된다.

**2) vertical-rl**

텍스트가 오른쪽에서 왼쪽으로 세로로 작성된다. 한국, 일본, 중국 등의 아시아권 국가에서 세로 방향으로 글을 작성할 때에만 적용된다.

**3) vertical-lr**

텍스트가 왼쪽에서 오른쪽으로 세로로 작성된다. 대표적으로 몽골어가 있다.

**4) sideways-lr, side-rl**

horizontal-tb 속성처럼 텍스트가 가로로 작성된다. 하지만 `lr`와 `rl` 방향 변화는 파이어폭스에서만 확인 가능하다.

**writing mode에 따라 바뀌는 axis 방향**

**1) flex-direction: row**

**`horizontal-tb`**

인라인과 블록 방향이 모두 가로이며, `Main Axis`는 가로, `Cross Axis` 세로이다.

![쓰기모드_기본,horizontal-tb.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%EC%93%B0%EA%B8%B0%EB%AA%A8%EB%93%9C_%EA%B8%B0%EB%B3%B8horizontal-tb.png)

```css
.container {
  writing-mode: horizontal-tb;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

`**vertical-lr**`

인라인 방향과 블록 방향이 모두 세로이며 `Main Axis`는 세로, `Cross Axis`는 가로이다. 글씨가 눕혀지는 이유는 writing mode가 전환되면서 인라인과 블록 방향이 모두 세로로 바뀌었기 때문이다.

![쓰기모드_vertical-lr.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%EC%93%B0%EA%B8%B0%EB%AA%A8%EB%93%9C_vertical-lr.png)

```css
.container {
  writing-mode: vertical-lr;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

**2) flex-direction: column**

**`horizontal-tb`**

인라인 방향은 가로, 블록 방향은 세로이며 `Main Axis`는 세로, `Cross Axis` 가로이다.

![col_horizontal-tb.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/col_horizontal-tb.png)

```css
.container {
  flex-direction: column;
  writing-mode: horizontal-tb;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

**`vertical-lr`**

인라인 방향은 세로, 블록 방향은 가로이며 Main Axis는 가로, Cross Axis는 세로이다. `row`의 `verticla-lr`과 마찬가지로 세로 쓰기로 전환되어 글씨가 눕혀지게 보인다.

![col_vertical-lr.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/col_vertical-lr.png)

```css
.container {
  flex-direction: column;
  writing-mode: vertical-lr;
}
```

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

## 1.6. 기본 속성 정보

### 1.6.1. Flex 알아보기

Flex는 flexbox, flexiblebox 라고도 한다. Flex는 행(row)과 열(column)의 형태의 레이아웃을 만들기 위해서 만들어졌다. Flex를 사용할 때, 자식요소(아이템)는 부모 요소(컨테이너)의 크기에 맞춰 변형될 수 있다. 또한, 많은 속성들을 사용하면 더욱 다양한 형태로 사용이 가능하다.

Flex는 자식요소(아이템)이 그 자식요소(아이템)을 포함하는 부모 요소(컨테이너)의 공간에 맞춰 그 크기를 줄이거나, 늘이고 또는 부모 요소(컨테이너)에 맞춰 그 정렬을 맞추는 css display의 하나의 속성이다. flex를 보여주는 간단한 예로 살펴보자.

![스크린샷 2022-05-21 오전 10.31.12.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.31.12.png)

```html
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item even">2</div>
    <div class="item">3</div>
    <div class="item even">4</div>
    <div class="item">5</div>
  </div>
</body>
```

위의 그림과 코드를 살펴보면, 코드에는 부모 요소(컨테이너) 안에 자식요소(아이템)들이 들어 있지만, 그림을 살펴보면 부모 요소(컨테이너)와 안에 있는 블록은 아무런 연관관계가 없어보인다. 하지만 여기서 display: flex를 넣는다면 아래와 같이 정렬된다.

![스크린샷 2022-05-21 오전 10.32.07.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.32.07.png)

```css
.container {
  display: flex;
}
```

```html
<body>
  <div class="container">
    <div class="item">1</div>
    <div class="item even">2</div>
    <div class="item">3</div>
    <div class="item even">4</div>
    <div class="item">5</div>
  </div>
</body>
```

자식요소(아이템)들이 부모 요소(컨테이너)에 맞게 정렬된 모습을 볼 수 있다. 이렇게 flex는 부모 요소(컨테이너)의 공간에 맞게 자식요소(아이템)들의 크기나 정렬을 맞춰주는 속성이다. 그렇기 때문에 잘 사용한다면 부모 요소(컨테이너)와 자식요소(아이템)의 배치를 효율적으로 사용할 수 있는 편리한 기능이 될 것이다. 다음으로 flex를 어떻게 사용할 수 있는지 알아보고자 한다.

### 1.6.2. F**lex 사용법**

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%202.png)

Flex는 크게 아이템과 컨테이너, 두 가지의 요소로 나누어진다. 위 그림에서는 box1, box2, box3이 `아이템`, 이를 감싼 보라색 테두리가 `컨테이너`이다. 이때 아이템은 자식요소가 되고 컨테이너는 부모요소가 된다. `컨테이너`는 큰 틀에서 전체적인 레이아웃에 영향을 주는 공간이다. 자식요소를 가로로 정렬할지, 세로로 정렬할지 정하는 것도 컨테이너에서 정한다. `아이템`은 각자가 어떤 식으로 정렬될지를 정하기 위해 존재한다. 일괄적으로 모두에게 동일한 속성을 적용하는 것이 아닌, 너비나 배치 순서를 바꾸는 등의 속성을 부여하여 커스텀 하는 것이 가능하다.

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

Flex는 새롭게 등장한 display 속성이기 때문에 `display: flex;` 로 적용한다. 이후에는 Flex가 제공하는 속성을 활용해 레이아웃을 변화시킬 수 있다.

Flex의 속성도 어떤 요소에 적용되는지에 따라 두 가지로 구분된다. 따라서 적용을 원하는 요소에 적절한 속성을 사용하는 것이 중요하다. 이때 속성의 영향은 컨테이너의 직계자식까지만 영향을 준다는 특징이 있으니 주의해야 한다.

### 1.6.3. F**lex 기본 속성**

Flex는 기본적으로 **블록 레벨 요소**의 성질을 가지며 주로 부모의 속성을 통해 자식들을 컨트롤한다. 이때 부모를 `Flex-container`, 영향을 받는 자식들을 `Flex-item`이라고 부른다. Flex를 사용하다 보면 기본 속성값에 대해서 한 번쯤 생각하게 된다. 원하는 대로 요소들이 움직이지 않는다면 아래에 첨부한 표를 참조하여 기본 속성에 대해서 찾아보기를 권장한다.

이제 Flex의 다양한 속성들을 배우게 될 텐데, 해당 속성이 어떤 축을 기준으로 적용이 되는지가 모두 다르기 때문에, 반드시 축에 대한 이해를 바탕으로 Flex를 학습해나가는 것이 중요하다. lex는 기본적으로 블록 레벨 요소의 성질을 가지며 주로 부모의 속성을 통해 자식들을 컨트롤한다. 이때 부모를 `Flex-container`, 영향을 받는 자식들을 `Flex-item`이라고 부른다. 원하는 대로 요소들이 움직이지 않는다면 아래에 첨부한 표를 참조하여 기본 속성에 대해서 찾아보기를 권장한다.

|                 | 기본 속성 | 적용 대상                  |
| --------------- | --------- | -------------------------- |
| flex-direction  | row       | flex containers            |
| justify-content | normal    | flex containers            |
| align-items     | normal    | all elements               |
| align-content   | normal    | multi-line flex containers |
| flex-wrap       | nowrap    | flex containers            |
| flex-basis      | auto      | flex items                 |
| flex-grow       | 0         | flex items                 |
| flex- shrink    | 1         | flex items                 |

어떠한 속성을 적용해야 하는지 헷갈리는 경우, 컨테이너에 flex 속성을 적용한 뒤 크롬 개발자 도구의 스타일 탭을 확인하면 좋다. 주요한 속성 다섯 가지를 GUI 기능으로 제공하여 적용된 모습을 확인해볼 수 있기 때문이다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%203.png)

# 2. Flex-direction

`flex-direction` 이란 flex container 내의 item들의 정렬 방향을 결정하는 속성이다. `flex-direction`은 자식요소(아이템)의 부모요소인 (컨테이너)에 적용하여 사용하며 종류는 `row`, `row-reverse`, `column`, `column-reverse` 네 가지가 있다.

## 2.1. flex-direction : row

왼쪽에서 오른쪽으로 글씨가 써지는 **행 방향 정렬**이며, `flex-direction`을 따로 설정하지 않으면 초깃값으로 설정된다.

![row.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/row%201.png)

```css
.container {
  display: flex;
  flex-direction: row;
}
```

## 2.2. flex-direction : row-reverse

`row`와 동일하게 보여지지만 시작점과 끝점이 반대로 위치한다.

![row-reverse.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/row-reverse%201.png)

```css
.container {
  display: flex;
  flex-direction: row-reverse;
}
```

컨테이너 내에 위치한 아이템들을 유연하게 정렬 할 수 있으며, 역순으로 정렬한다. 컨테이너에게 `display: flex` 속성을 부여하지 않으면 아이템은 유연하게 움직이지 않는다.

## 2.3. flex-direction : column

Flex 내 box들을 수직으로 정렬한다. 컨테이너 내부의 요소들이 아이템이 아닌 경우 해당 속성의 값은 적용되지 않는다. `flex-direction : column;`일 때 주축은 세로 방향이 되고, 교차 축은 가로 방향이 된다. 아이템을 추가하는 경우 마크업 순서에 맞게 위에서 아래로 흐르듯이 정렬된다.

![col.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/col.png)

```css
.container {
  display: flex;
  flex-direction: column;
}
```

## 2.4. flex-direction : column-reverse

`column` 과 동일하게 보여지지만 시작 점과 끝 점이 반대로 위치한다.

![col-reverse.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/col-reverse.png)

```css
.container {
  display: flex;
  flex-direction: column-reverse;
}
```

## 2.5. 접근성 고려사항

`flex-direction` 속성에 `row-reverse` 또는 `column-reverse` 값을 사용하면 DOM 구조와 시각적 표현에 차이가 발생하여 스크린 리더로 접근하는 사용자에게 잘못된 정보를 전달 할 가능성이 있다.

# 3. Justify-content

## 3.1. flex-start

부모 요소(컨테이너)에 display: flex, justify-content: flex-start 값을 주면 된다.

```css
.container {
  display: flex;
  justify-content: flex-start;
}
```

`**justify-content: flex-start;**`는 기본값으로 Flex 아이템들을 시작점을 기준으로 정렬한다. 기본값일 때, 기준이 되는 점은 왼쪽 축의 상단이다.

**`flex-direction: row;`**인 경우에는 가로(row=행)로 정렬 하며 왼쪽 상단이 기준점이 되어서 왼쪽 상단부터 차례대로 1, 2, 3번 순으로 아이템이 배치된다.

![스크린샷 2022-05-21 오후 8.53.37.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.53.37.png)

그렇지만 **`flex-direction: column;`**을 준 경우에는, 컨테이너의 상단이 기준점인 것은 같지만 flex 방향이 row(행)가 아닌 column(열)이기 때문에 세로(열)로 아이템이 배치된다.

![스크린샷 2022-05-21 오후 8.55.21.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.55.21.png)

```css
.container {
	  display: flex;
	  justify-content: flex-start;
	  flex:-direction: column;
}
```

## 3.2. flex-end

부모 요소(컨테이너)에 display: flex;, justify-content: flex-end; 값을 주면 된다.

```css
.container {
  display: flex;
  justify-content: flex-end;
}
```

`**justify-content: flex-end;**`는 자식 요소(아이템)를 맨 끝점으로 배치하는데, 기본값(왼쪽 축)의 반대인 오른쪽 축의 상단이 기준이 된다.

**`flex-direction: row;`**인 경우일 때에는 row(행)로 정렬하기 때문에 자식 요소(아이템)인 1, 2, 3번의 아이템들이 오른쪽 축에 붙어 배치된다.

![스크린샷 2022-05-21 오후 8.58.22.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.58.22.png)

**`flex-direction: column;`** 을 준 경우에는, flex 방향이 row(행)가 아닌 column(열)이 되기 때문에 세로(열)로 자식 요소(아이템)가 배치된다.

그리고 **`justify-content: flex-end;`** 의 경우, 자식 요소(아이템)를 배치하는 기준이 기본값(상단 축)의 반대인 하단 축이 되기 때문에 1, 2, 3번의 아이템이 세로로 정렬되어 하단에 붙어 배치된다.

![스크린샷 2022-05-21 오후 8.56.52.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.56.52.png)

```css
.container {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}
```

## 3.3. center

`justify-content: center`를 준 경우, Flex-box 내의 요소들을 주축(main-axis)의 중앙을 기준으로 정렬한다. 즉, 요소들을 가운데 정렬해준다. 이때 요소의 간격은 균등 분할된다. 개별적으로 빈 공간을 제어하고 싶다면 해당 요소에 별도의 margin 값을 주어야 한다. `space-between`, `space-around` 역시 동일하다.

```css
.container {
  display: flex;
  justify-content: center;
}
```

![스크린샷 2022-05-21 오후 7.29.21.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.29.21.png)

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

![스크린샷 2022-05-21 오후 7.29.41.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.29.41.png)

```css
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

## 3.4. space-between, space-around, space-evenly

다음으로 `space-between`, `space-around`, `space-evenly`의 비슷하면서도 다른 점들을 알아보자. 위 셋의 공통점은 자식 요소들을 메인 축으로 정렬하며, 일정한 간격을 준다는 것이다. between, around, evenly의 뜻은 차례로 ‘사이에’, ‘둘레에’, ‘균등하게’라는 뜻이다. 그럼 뜻을 생각하며 아래 그림으로 차이점을 확인해 보자.

![스크린샷 2022-05-21 오후 7.28.23.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.28.23.png)

```css
.container {
  display: flex;
  justify-content: flex-start;
}
```

아무 정렬도 지정해주지 않았을 때의 기본값이다.

### 3.4.1. space-between

![스크린샷 2022-05-21 오후 7.27.50.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.27.50.png)

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

`justify-content: space-between;`을 주었을 때 자식 요소들의 ‘사이에' 같은 간격이 들어간 것을 볼 수 있다. 컨테이너의 패딩 값을 제외하면 컨테이너의 너비에 꽉 차게 배치된다.

### 3.4.2. space-around

![스크린샷 2022-05-21 오후 7.27.24.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.27.24.png)

```css
.container {
  display: flex;
  justify-content: space-around;
}
```

아이템의 ‘둘레에' 같은 간격이 들어간 것을 볼 수 있다. 아이템 사이에는 같은 간격이 2번씩 들어가게 되므로 양 끝 컨테이너 사이의 간격은 아이템 사이의 간격의 1/2이 된다.

### 3.4.3. space-evenly

![스크린샷 2022-05-21 오후 7.26.58.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.26.58.png)

```css
.container {
  display: flex;
  justify-content: space-evenly;
}
```

모든 간격이 ‘균등하게' 배치된 것을 볼 수 있다. space-around와 비슷하게 보이지만 양 끝의 간격과 자식 요소 사이의 간격이 같은 것을 확인할 수 있다.

## 3.5. 자주 사용하지 않는 속성들

### 3.5.1. justify-content : normal

값이 설정되지 않은 것처럼 기본 위치에 정렬한다. 기본값이므로 생략 할 수 있다.

![스크린샷 2022-05-21 오후 7.25.49.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.25.49.png)

```css
.container {
  display: flex;
  justify-content: normal;
  align-items: flex-start;
}
```

### 3.5.2. justify-content : initial

기본값으로 정렬한다. justify-content의 기본값은 normal이므로 위의 justify-content:normal과 결과가 동일하게 나온다.

![스크린샷 2022-05-21 오후 7.25.49.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.25.49%201.png)

```css
.container {
  display: flex;
  justify-content: initial;
  align-items: flex-start;
}
```

### 3.5.3. justify-content : inherit

상속되는 값에 따라 정렬한다. container에 class 명이 “wrap-container”인 부모 요소를 만들어 주었다. wrap-container의 justify-content:center 속성이 상속되어 자식 요소인 container의 justify-content도 center로 적용된다.

![스크린샷 2022-05-21 오후 7.25.49.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.25.49%202.png)

```css
.wrap-container {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  justify-content: inherit;
}
```

```html
<body>
  <div class="wrap-container">
    <div class="container">
      <div class="item">1</div>
      <div class="item even">2</div>
      <div class="item">3</div>
    </div>
  </div>
</body>
```

### 3.5.4. justify-content : revert

상속된 속성으로부터 기본값으로 되돌린다. 특정 사이트만의 css 속성이 지정되어 있거나 사용자가 정의한 스타일이 적용된 속성을 부모 속성 또는 사용자 에이전트의 기본 스타일로 되돌린다. 사용자 에이전트란 브라우저마다 정해놓은 css 기본 규칙이다.

### 3.5.5. justify-content : unset

부모 요소로부터 상속받는 값이 있으면 inherit로 적용되고 상속되는 값이 없다면 initial 속성으로 정렬한다.

### 3.5.6. firefox에서만 지원하는 속성

`justify-content: revert-layer;`

이전 레이어에 지정된 스타일로 되돌릴 수 있다. revert와 달리 작성자 원본에 적용된 스타일을 제거하고 사용자 원본 또는 사용자 에이전트의 기본값으로 되돌린다.

`justify-content: safe;`

다른 정렬 속성과 함께 사용된다. 항목이 컨테이너를 오버플로 하여 데이터가 손실된다면 항목이 start 속성처럼 정렬된다.

`justify-content: unsafe;`

다른 정렬 속성과 함께 사용된다. 컨테이너의 상대적 크기와 관계없이, 데이터 손실을 일으키는 오버플로가 발생할 수 있는지와 관계없이 지정된 정렬 값이 적용됩니다.

# 4. Align-items, Align-content

## 4.1. align-items

align의 사전적 정의는 ‘일직선으로 맞추다’이다. 즉, flex에서 align이란 축의 수직 방향 정렬을 의미하며, 부모요소(컨테이너) 안에서 교차 축에 따라 자식요소(아이템)가 정렬되는 속성이다.

**속성**

- **stretch**

align-items의 기본값이다. 부모요소(컨테이너)의 높이만큼 자식요소(아이템) 높이가 같이 늘어난다.

![alignitems-stretch.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/alignitems-stretch.png)

```css
.container {
  display: flex;
  align-items: stretch;
}
```

- **flex-start**

자식요소(아이템)는 교차 축 시작점에서 정렬된다. 기본적으로 가로축은 수직을 의미하며, 자식요소(아이템)는 상단에서 수직으로 정렬된다.

![alignitems-flexstart.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/alignitems-flexstart.png)

```css
.container {
  display: flex;
  align-items: flex-start;
}
```

- **flex-end**

자식요소(아이템)는 교차 축 끝점에서 정렬된다. 기본적으로 가로축은 수직을 의미하며, 자식요소(아이템)는 하단에서 수직으로 정렬된다.

![alignitems-flex-end.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/alignitems-flex-end.png)

```css
.container {
  display: flex;
  align-items: flex-end;
}
```

- **center**

자식요소(아이템)는 교차 축 중앙으로 정렬된다.

![alignitems-center.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/alignitems-center.png)

```css
.container {
  display: flex;
  align-items: center;
}
```

- **baseline**

자식요소(아이템)는 교차 축의 기준선에 정렬이 된다. 텍스트의 기준선이 수평선을 따라 아이템이 정렬된다.

![alignitems-baseline.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/alignitems-baseline.png)

```css
.container {
  display: flex;
  align-items: baseline;
}
```

**3. align-self와 다른 점은?**

align-items는 부모 요소(컨테이너) 내에 있는 자식 요소를 대상으로 적용하는 반면에, align-self는 부모 요소(컨테이너) 안에서 특정 아이템만 교차 축으로 정렬된다. 즉, 특정 아이템의 정렬을 따로 하고 싶다면 이 속성을 사용하면 된다.

![align-self와 비교.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-self%EC%99%80_%EB%B9%84%EA%B5%90.png)

```css
.container {
  display: flex;
  align-items: flex-start;
}

.third_item {
  align-self: center;
}
```

플렉스 박스 컨테이너에 `align-items : flex-start`를 적용하고 ‘third_item’ 이름을 가진 특정 아이템만 `align-self : center`를 적용했다. 위와 같이 3번 아이템만 중앙정렬 속성이 적용되는 것을 볼 수 있다.

## 4.2. align-content

`align-items`는 한 줄을 기준으로 정렬하지만, align-content는 `flex-wrap : wrap;` 이 설정된 경우 두 줄부터 기준으로 정렬한다. 아래 예시를 보면, 더 쉽게 알 수 있다.

![captures_chrome-capture-2022-4-21 (1).png](<%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/captures_chrome-capture-2022-4-21_(1).png>)

![captures_chrome-capture-2022-4-21 (2).png](<%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/captures_chrome-capture-2022-4-21_(2).png>)

좌측은 `align-items : center;` , 우측은 `align-content : center;` 로 정렬한 결과화면이다. align-items는 아이템 한 줄마다 속성이 적용되었기 때문에 두 줄 사이에 간격이 생겨 정렬된 것을 볼 수 있다. 반면에, align-content는 두 줄 이상의 아이템을 수직축 방향으로 라인 자체를 정렬하기 때문에 두 줄 사이에 간격이 생기지 않은 것을 볼 수 있다.

**속성**

- **stretch**

부모요소(컨테이너)의 높이만큼 자식요소(아이템) 높이가 같이 늘어난다.

![align-content-stretch.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-stretch.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
```

- **flex-start**

부모요소(컨테이너)의 최상단에서부터 정렬을 시작한다.

![align-content-flex-start.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-flex-start.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
```

- **flex-end**

부모요소(컨테이너)의 최하단에서부터 정렬을 시작한다.

![align-content-flex-end.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-flex-end.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}
```

- **center**

부모요소(컨테이너) 교차 축의 중앙에 정렬합니다.

![align-content-center.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-center.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
```

- **space-between**

부모요소(컨테이너) 교차 축의 양 끝(시작점, 종료점)에 맞춰 아이템 간에 일정한 간격을 두고 정렬한다.

![align-content-space-between.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-space-between.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
```

- **space-around**

space-between과 마찬가지로 부모요소(컨테이너) 교차 축의 양 끝(시작점, 종료점)에 맞춰 아이템 간에 일정한 간격을 두고 정렬한다. 이때 첫 아이템 앞 여백과 마지막 아이템 뒤 여백은 각 아이템 간 거리의 절반 크기를 차지하여 정렬된다.

![align-content-space-around.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-space-around.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
}
```

- **space-evenly**

space-between과 마찬가지로 부모 요소(컨테이너) 교차 축의 양 끝(시작점, 종료점)에 맞춰 아이템 간에 일정한 간격을 두고 정렬한다. 이때 아이템 간의 거리, 첫 아이템 앞 여백과 마지막 아이템 뒤 여백의 크기가 모두 동일하게 정렬된다. 본 속성은 IE, Edge에서는 지원되지 않는다.

![align-content-space-evenly.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-content-space-evenly.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-evenly;
}
```

# 5. Flex-wrap

웹페이지 레이아웃을 구성할 때 부모 요소(컨테이너) 안의 자식 요소(아이템)들이 많으면 고민할 때가 있다. 예를 들어 영어 단어 웹페이지를 만든다고 가정해보자. 단어 카드들을 한 줄에 길게 배치할 것인지 아니면 한 줄이 아닌 두 줄 이상으로 배치할지 고민이 들 때가 있다.

![no-wrap](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%204.png)

no-wrap

![wrap](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%205.png)

wrap

![wrap-reverse](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%206.png)

wrap-reverse

```css
.container {
  display: flex;
  /* flex-wrap: nowrap; */
  /* flex-wrap: wrap; */
  /* flex-wrap: wrap-reverse; */
}
```

```html
<body>
  <div class="container">
    <div class="item">Cat</div>
    <div class="item even">Mouse</div>
    <div class="item">Dog</div>
    <div class="item even">Tiger</div>
    <div class="item">Monkey</div>
    <div class="item even">Rabbit</div>
  </div>
</body>
```

flex-wrap 속성을 사용하게 되면, 부모 요소(컨테이너)의 크기만큼 단어 카드들의 크기를 조절할 수도 있고, 단어 카드들의 크기만큼 영역을 차지하고 부모 요소(컨테이너)의 영역을 벗어나게 되면 단어 카드를 밑으로 내려서 정렬도 할 수 있게 된다.

flex-wrap 속성은 Flex 레이아웃 모듈의 하위 속성이다. 정렬된 요소들의 총 너비가 부모 너비보다 클 때, 요소들을 강제적으로 한 줄로 할 것인지 여러 줄로 할 것인지를 정의한다. 두 줄 이상인 경우 새로운 라인이 쌓일 방향을 결정하는 교차 축도 정의된다. 가로축은 메인축에 수직인 축이다. 부모 요소에 `display:flex;`를 꼭 작성해야한다.

## 5.1. flex-wrap : nowrap

flex-wrap 속성 중 nowrap의 속성에 대해서 알아보자. flex-wrap는 작성자가 따로 설정하지 않는다면 기본값인 nowrap으로 설정된다. flex-wrap: nowrap을 사용하였을 때, 아래 그림과 같이 자식 요소(아이템)의 크기가 부모 요소(컨테이너)의 크기에 맞춰 일정 비율만큼 줄어드는 것을 확인할 수 있을 것이다.

![1.PNG](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/1%201.png)

하지만, 검색을 통해서 wrap의 속성을 찾아봤다면, 아래 그림처럼 부모영역(컨테이너)을 넘어가는 그림을 보았을 것이다. 이렇게 되는 이유는 8장에서 다루게 될 flex-shrink의 속성 때문이다. 기본적으로 flex-shrink의 초깃값은 1로 설정되어있어서 일정 비율만큼 줄어들게 되는데 이 속성을 0으로 하면 아래 그림처럼 부모영역(컨테이너)을 넘어가게 된다.

따라서 flex-wrap : nowrap은 자식 요소(아이템)의 전체 크기가 부모영역(컨테이너)을 넘어가지 않는다면 자기 자신의 크기를 유지하게 되고, 부모영역(컨테이너)을 넘어가게 된다면 일정한 비율로 줄어들게 된다. Flex를 사용하다 보면 nowrap이라는 속성을 자주 볼 일은 없지만, 이 속성을 사용하면 어떻게 변하는지 알아두는 것이 좋다.

![2.PNG](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/2.png)

## 5.2. flex-wrap : wrap

다음으로 flex-wrap 속성 중에 wrap의 속성에 대해서 알아보자. Flex-wrap의 wrap속성은 각 자식 요소(아이템)의 총 넓이가 부모 요소(컨테이너)의 넓이 보다 클 때, 부모 요소(컨테이너) 안에 자식 요소(아이템)이 들어갈 수 있도록 다음 줄에 이어서 정렬해 주는 속성을 말한다.

앞서 말한 flex-wrap에서 no-wrap을 사용하면 자식 요소(아이템)의 총 넓이가 부모 요소(컨테이너)의 넓이보다 큰 경우 정렬된 요소들은 부모 요소(컨테이너)의 넓이에 맞춰 자동 축소 되게 된다.

![스크린샷 2022-05-21 오전 10.33.58.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.33.58.png)

반면, flex-wrap:wrap의 경우에는 자식 요소(아이템)의 넓이를 유지한 채로 다음 줄로 이어서 정렬 되게 한다. flex-wrap:wrap을 사용하는 경우, 자식 요소(아이템)의 크기와 부모 요소(컨테이너)에 크기에 따라 다음 줄로 정렬이 이어지게 되는데 이는 flex-direction의 방향을 따르게 된다,

![스크린샷 2022-05-21 오전 10.34.35.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.34.35.png)

만약 flex-direction의 방향이 row(행)라면 row(행)에 맞춰 주축인 수평으로 자식 요소(아이템)들이 정렬 되게 되고, 교차축인 수직축으로 아이템이 쌓이게 된다.

![스크린샷 2022-05-21 오전 10.34.35.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.34.35%201.png)

flex-direction의 방향이 column(열)이라면 column(열)에 맞춰 주축인 수직으로 자식 요소(아이템)들이 정렬 되게 되고, 교차축인 수평축으로 자식 요소(아이템)줄이 쌓이게 된다.

![스크린샷 2022-05-21 오전 10.35.24.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_10.35.24.png)

이러한 자동 맞춤 같은 flex-wrap:wrap의 성질에 따라서 화면이 조정되는 경우(특히 미디어 쿼리를 구현하는 경우), 아이템의 크기가 변하지 않고 위치만 조정될 수 있게 하기 위해서 많이 사용하게 된다.

## 5.3. flex-wrap : wrap-reverse

`flex-wrap : wrap-reverse;` 는 `wrap-reverse`: `wrap;` 과 마찬가지로 자식 요소(아이템)들이 필요한 경우 여러 줄에 걸쳐 배치되지만, 다른 점은 wrap-reverse이기 때문에 자식 요소(아이템) 요소들이 정렬되는 기준점이 반대 방향으로 바뀌어서 배치된다.

적용하는 방법은 부모 요소(컨테이너)에 display: flex를 주고, flex-wrap: wrap-reverse 값을 설정하면 된다.

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

- **flex-wrap: wrap; 과 flex-wrap: wrap-reverse; 비교**

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%207.png)

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

`display: flex;` 의 경우 `flex-direction: row;` 가 기본값이다. 그렇기 때문에 `flex-wrap: wrap;` 인 경우에는 부모 요소인 컨테이너의 왼쪽 축의 상단부터 자식 요소인 아이템들이 순차적으로 배치된다. 즉, 배치가 시작되는 기준이 주축(main-axis)의 main-start 지점이 부모(컨테이너)의 상단, 교차 축(cross-axis)의 cross-start 지점은 부모(컨테이너) 왼쪽이 된다.

하지만, `flex-wrap: wrap-reverse;` 의 경우 부모 요소(컨테이너)의 하단인 바닥 행의 왼쪽에서부터 1, 2, 3…번 순으로 아이템이 배치 되고 나머지 요소들은 그 행 위에 배치 된다. 또, 전체적으로 보면 `flex-wrap: wrap;` 과는 반대로 자식 요소(아이템)들이 컨테이너의 하단에 붙어 배치 되는 것을 확인할 수 있다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%208.png)

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

reverse(역순)이기 때문에 배치 되는 기준점이 바뀌기 때문이다. 즉, `flex-wrap: wrap-reverse;` 를 주게 되면, 주축(main-axis)의 main-start 지점이 부모 요소(컨테이너)의 하단이 된다. 그래서 부모 요소(컨테이너)의 하단 왼쪽이 기준점이 되어 자식 요소들(아이템들)이 순서대로 배치 되게 된다. 자식요소(아이템)는 부모 요소(컨테이너)의 width에 맞춰 정렬되기 때문에 부모의 witdh를 줄이면, 각 줄에 들어가는 아이템의 개수 역시 아래 예시와 같이 변경되게 된다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%209.png)

그리고 flex-wrap: wrap; 과 마찬가지로, flex-item 요소들의 크기를 컨테이너 크기에 맞춰 줄이지 않기 때문에, flex-item(자식 요소)이 부모(컨테이너)에 들어가기에 더 많은 부피를 차지하게 되면 아래 이미지처럼 아이템들이 컨테이너 밖으로 넘치는 것을 확인할 수 있다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2010.png)

- **flex-direction: column; 값을 준 경우 flex-wrap: wrap-reverse; 는 어떻게 될까?**

`display: flex;` 를 준 경우, flex-direction의 기본값은 row지만, `flex-direction: column;` 을 준다면 위에서 확인한 것들과는 다른 결과를 확인할 수 있다. flex의 방향이 row(행)이 아닌 column(열)으로 변경되기 때문에 주축(main-axis)이 수평(가로)이 아닌 수직(세로) 방향이 된다.

그렇기 때문에, `flex-direction: column;` 인 상태에서 `flex-wrap: wrap-reverse;` 를 주게 되면, 주축(main-axis)의 main-start 지점이 부모 요소(컨테이너)의 오른쪽 끝 지점이 되고, 오른쪽 끝의 열(column)부터 아이템이 차례대로 배치된다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2011.png)

# 6. Flex-basis

## 6.1. flex-basis란?

flex-basis는 **자식 요소(아이템)**에 사용하는 속성이다.

```css
.item {
  flex-basis: auto; /* 기본값 */
}
```

부모 요소인 컨테이너의 주 축(main axis)이 되는 방향으로 **flex 아이템의 초기 크기(default size)**를 정해줄 수 있다. 컨테이너의 아이템 배치 방향(`flex-direction`)이 가로(row) 축일 경우 넓이를, 세로(column) 축일 경우 높이를 지정한다.

## 6.2. flex-basis에 들어가는 값

flex-basis의 값으로는 우리가 사용하는 각종 단위가 들어갈 수 있다. 길이를 나타내는 단위들인 `em`, `rem`, `px`이나 퍼센티지(`%`) 값이 될 수도 있고, `content`, `min-content`, `max-content`, `fit-content`, `fill`, `auto` 등의 키워드가 될 수도 있다. 상수는 0 외에 다른 값을 사용할 수 없다.

## 6.3. flex-basis의 유연성

flex-basis 속성은 **유연한**(flexible) **크기**를 가진다. 즉, 고정적인 width, height 값을 지정해 줄 때와 달리 축의 방향에 따라, 또 **내부 콘텐츠에 따라** 크기가 가변적, 유동적으로 변할 수 있다.

![아이템이 `height: 40px;`일 때(내부 콘텐츠의 크기는 고려하지 않고 40px에 맞춤)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2012.png)

아이템이 `height: 40px;`일 때(내부 콘텐츠의 크기는 고려하지 않고 40px에 맞춤)

![아이템이 `flex-basis: 40px;`일 때(콘텐츠의 크기에 맞춤)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2013.png)

아이템이 `flex-basis: 40px;`일 때(콘텐츠의 크기에 맞춤)

## 6.4. flex-basis와 width/height의 관계

기본값 auto는 해당 아이템의 width(또는 height) 값을 사용하게 된다. 만약 width값이 없다면 콘텐츠의 크기가 기본으로 잡히게 된다.

![basis_01.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/basis_01.png)

위 그림에서는 basis의 값을 100px로 설정했다. 콘텐츠의 크기가 적으면 100px로 아이템들의 width가 결정되지만, 콘텐츠가 많아지게 되면 basis보다 넓어지게 된다.

![basis_02.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/basis_02.png)

반면, width값을 100px로 설정하게 되면 basis와 달리 컨텐츠의 크기가 많아지면 아이템의 width는 100px로 고정되고, 컨텐츠가 밖으로 나가게 된다. 이를 방지하려면 `word-wrap: break-word;` 값을 주면 해결된다.

![basis_03.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/basis_03.png)

기본적으로 flex-basis 속성이 width(또는 height) 값보다 우선하게 된다. 즉, width를 100px을 주고 basis를 300px로 주게 되면 basis값이 우선시되어 아이템들의 기본너비가 300px로 잡히게 된다. 주의할 점은 서로 다른 값일 경우 기본적으로 flex-basis가 우선하지만, 똑같은 값을 flex-basis와 width(또는 height)에 주고 동시에 적용할 경우엔 width(또는 height)의 적용이 우선시된다는 것이다. 또한, 언어가 한글인지 영어인지와 `word-break` 등 다른 속성값에 따라 flex-basis는 예상과 다르게 동작할 수도 있다.

## 6.5. flex-basis : auto; 와 flex-basis : 0;

`flex-basis: auto;`가 기본값이다. 이때는 지정해 준 width(또는 height) 값을 사용하거나, 다른 박스가 늘어날 때 같이 늘어난다(stretch). 또한, 추가 공간이 flex-grow 값에 따라 분배된다. `auto` 일 때와는 달리 `flex-basis: 0;`으로 설정하면 내용 주위의 추가 공간이 고려되지 않는다.

![flex-basis 값이 0일 때와 auto일 때의 차이](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/4.png)

flex-basis 값이 0일 때와 auto일 때의 차이

## 6.6. flex-basis : content;

`flex-basis: content;`는 콘텐츠 크기에 맞게 자동으로 크기가 조절된다. 고유 크기 조정 키워드로는 `fill`, `min-content`, `max-content`, `fit-content` 가 있다.

![6-6.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/6-6.png)

이 키워드는 잘 지원되지 않기 때문에 테스트하기 어렵다 (2022년 기준). 따라서 `min-content`, `max-content` 및 `fit-content`의 기능을 완전히 파악하여 원하는 의도대로 사용하기엔 아직 무리가 있다.

## 6.7. flex-basis보다는 flex 축약 속성을! (W3C)

CSS 표준을 관리하는 **W3C**에 따르면, flex-basis 속성을 직접 사용하기보다는 **flex 축약 속성**으로 사용하는 것을 권장하고 있다.

![출처: [https://www.w3.org/TR/css-flexbox-1/#flex-basis-property](https://www.w3.org/TR/css-flexbox-1/#flex-basis-property)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2014.png)

출처: [https://www.w3.org/TR/css-flexbox-1/#flex-basis-property](https://www.w3.org/TR/css-flexbox-1/#flex-basis-property)

## 6.8. flex-basis 호환성

![출처: [https://caniuse.com/?search=flex-basis](https://caniuse.com/?search=flex-basis)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2015.png)

출처: [https://caniuse.com/?search=flex-basis](https://caniuse.com/?search=flex-basis)

# 7. Flex-grow

## 7.1. flex-grow란?

`flex-grow`는 자식 요소인 `flex-item`이 차지하는 비율을 조절하는 속성이다. 컨테이너 크기에 맞춰 늘어나는 비율이 여백을 차지하면서 이 속성을 가진 다른 요소들과 동일하게 분배한다. 쉽게 말해서 `flex-grow`의 값은 아이템들의 `flex-basis`를 제외한 여백 부분을 `flex-grow`의 비율로 각각 나누어 가진다.

## 7.2. flex-grow 기능 : 확장 또는 고정

```css
.item {
  flex-shrink: 0; /* 기본값 */
}
```

```css
/* <number> values */
flex-grow: 1 | 0.5;

/* Global values */
flex-grow: inherit | initial | unset;
```

`flex-grow` 속성은 기본값이 0 이다. `flex-grow:0` 일때는 `flex item`을 확장하지 않고 원래의 크기를 유지한다.

![예시1. `flex-grow:0` (기본 값)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.55.43.png)

예시1. `flex-grow:0` (기본 값)

`flex-grow:1` 일 때는 `flex item` 이 유연한 박스의 형태로 바뀌며 빈 공간을 채운다.

![예시2. `flex-grow:1`](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.56.47.png)

예시2. `flex-grow:1`

각각의 아이템별로 `flex-grow` 값을 줄 수도 있다. `flex-grow` 에 정해준 비율만큼 여분의 컨테이너 너비를 분배하여 갖는다.

![예시3. 각각의 아이템별로 다른 `flex-grow`](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_3.57.53.png)

예시3. 각각의 아이템별로 다른 `flex-grow`

## 7.3. flex-grow 사용 시 주의할 점

`flex-grow` 속성은 **0** 또는 **양의 정수**의 값으로 설정해야 한다. 음수의 값으로 설정했을 경우, 기본값인 `flex-grow:0`일 때와 같다. 또한 `flex-grow`의 증가너비 비율은 width로 인해 영향을 받는다. 때문에 `flex-basis`로 flex의 가변 범위에 입력하여 기본값을 정하는 것이 좋다.

![예시4. `flex-grow:-1`](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-15_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.00.47.png)

예시4. `flex-grow:-1`

## 7.4. flex 축약 속성

```css
flex: flex-grow | flex-shrink | flex-basis;
```

일반적으로는 모든 값이 설정되었음을 보장하기 위하여 flex 속성을 이용해 **축약형**으로 사용한다. 축약 속성의 순서는 `flex-grow`, `flex-shrink`, `flex-basis` 순으로 적용되며 띄어쓰기로 구분한다.

Flex **축약 속성의 기본값**은 **flex: 0 1 auto;** 이다. flex-grow를 제외한 개별 속성은 생략할 수 있다. flex : 1; 할 경우 grow는 1로 변하고 shrink의 값은 0으로 basis의 값을 명시적으로 작성하지 않으면 0으로 입력이 된다.

## 7.5. flex-shrink보다는 flex 축약 속성을! (W3C)

CSS 표준을 관리하는 **W3C**에 따르면, flex-shrink속성을 직접 사용하기보다는
**flex 축약 속성**으로 사용하는 것을 권장하고 있다.

![[https://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2016.png)

[https://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-grow)

## 7.6. flex-grow 호환성

지원버전

![출처: [mdn](https://developer.mozilla.org/ko/docs/Web/CSS/flex-grow)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2017.png)

출처: [mdn](https://developer.mozilla.org/ko/docs/Web/CSS/flex-grow)

![출처: [https://caniuse.com/?search=flex-grow](https://caniuse.com/?search=flex-grow)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2018.png)

출처: [https://caniuse.com/?search=flex-grow](https://caniuse.com/?search=flex-grow)

# 8. Flex-shrink

## 8.1. Flex-shrink 란?

`flex-shrink`는 자식 요소에 사용하는 속성이다. flex 컨테이너 안에서 자식 요소인 flex 아이템 요소를 자동으로 줄여서 적절한 크기로 배치해 유연한 레이아웃을 만들 수 있다는 장점이 있다. `flex-basis` 속성으로 지정된 아이템의 기본 크기를 설정한 숫자 값에 비례해 수축시킬 수 있다. `flex-grow`와는 반대되는 개념이다.

## 8.2. Flex-shrink 기능: 축소 또는 고정

```css
.item {
  flex-shrink: 1; /* 기본값 */
}
```

`flex-shrink`속성의 **기본값은 1**이다. 즉, 정의하지 않아도 자동으로 **축소**된다. 숫자가 클수록 상대적으로 더 작은 크기를 갖게 된다. 값을 0으로 선언할 경우 너비 혹은 높이를 **고정해서** 항상 유지할 수 있다.

![예시1. `flex-shrink:1` (기본값)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/shrink1.png)

예시1. `flex-shrink:1` (기본값)

![예시2. `flex-shrink:0`](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/shrink0.png)

예시2. `flex-shrink:0`

![예시3. 아이템 별로 다른 경우](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/001.png)

예시3. 아이템 별로 다른 경우

## 8.3. Flex-shrink 사용 시 주의할 점

`flex-shrink` 속성은 부모 컨테이너에 `flex-wrap: wrap;` 속성을 부여한 경우 적용되지 않는다. 따라서 적용을 위해서는 `wrap`을 정의하지 않거나, `nowrap`속성이 부여되어야 한다.

<aside>
💡 flex-basis: 250px 통일, 3번째 아이템만 flex-shrink: 2 일 때 (예시3, 4)

</aside>

![예시3. 부모 컨테이너 `flex-wrap: nowrap;`](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2019.png)

예시3. 부모 컨테이너 `flex-wrap: nowrap;`

![예시4. 부모 컨테이너 `flex-wrap: wrap;` (⇒ flex-shrink 적용되지 않음)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2020.png)

예시4. 부모 컨테이너 `flex-wrap: wrap;` (⇒ flex-shrink 적용되지 않음)

## 8.4. Flex 축약 속성

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

`flex-grow` , `flex-shrink` , `flex-basis` 속성의 값을 단축해서 사용할 수 있는 것이 `flex` 축약 속성이다. 순서는 grow, shrink, basis 순으로 적용된다.

- `flex-grow` 는 flex 아이템이 팽창하는 비율을 설정한다. 기본값은 1이다.
- `flex-shrink` 는 flex 아이템이 수축하는 비율을 설정한다. 기본값은 1이다.
- `flex-basis` 는 flex 아이템이 팽창하고 수축하는 기준 크기를 설정한다. 기본값은 0이다.

## 8.5. Flex-shrink보다는 Flex 축약 속성을! (W3C)

CSS 표준을 관리하는 **W3C**에 따르면, flex-shrink속성을 직접 사용하기보다는 **flex 축약 속성**으로 사용하는 것을 권장하고 있다.

![[https://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2021.png)

[https://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink](https://www.w3.org/TR/css-flexbox-1/#propdef-flex-shrink)

## 8.6. Flex-shrink 호환성 (caniuse)

![출처: [https://caniuse.com/?search=flex-shrink](https://caniuse.com/?search=flex-shrink)](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2022.png)

출처: [https://caniuse.com/?search=flex-shrink](https://caniuse.com/?search=flex-shrink)

# 9. 그 밖의 Flex-item에 사용하는 속성들

기타 flex-item에 사용하는 속성에는 `align-self`, `order`, 그리고 `z-index`가 있다.

## 9.1. align-self

`align-self`란 교차 축(cross-axis)을 기준으로 개별아이템 요소의 정렬 방법을 결정하는 속성이다. Flex 컨테이너에 적용하여 내부에 있는 전체 아이템을 정렬하는 `align-items`와 달리, `align-self`는 인접한 Flex 아이템에 영향을 주지 않고, 각각의 Flex 아이템 위치를 자유롭게 변경할 수 있다. 따라서 전체 설정인 `align-items`보다, 개별 아이템에 적용되는 `align-self` 속성이 우선한다는 특징이 있다.

**align-self의 속성값**

`align-self`의 속성값은, auto 값을 제외하면 `align-items`의 속성값과 같다.

- auto : 기본값으로, 플렉스박스 컨테이너의 `align-items` 속성을 상속받는다. align-items의 기본 속성은 stretch이기 때문에, align-items가 지정되어있지 않는 경우 stretch 속성을 상속받는다.
- stretch : 교차 축을 기준으로, 컨테이너의 높이를 채우기 위해 플렉스 아이템이 늘어난다.
- flex-start : 교차 축을 기준으로, 플렉스 아이템이 컨테이너의 시작점에 정렬된다.
- flex-end : 교차 축을 기준으로, 플렉스 아이템이 컨테이너의 끝점에 정렬된다.
- center : 교차 축을 기준으로, 플렉스 아이템이 컨테이너의 중앙에 정렬된다.
- baseline : 교차 축을 기준으로, 플렉스 아이템이 컨테이너의 문자 기준선에 정렬된다.

아래는 아이템에 auto, stretch, flex-start, flex-end, center, baseline 속성값을 부여한 모습이다. 컨테이너가 `flex-direction:row;` 인 경우 교차 축인 세로축을 기준으로, 아이템들이 컨테이너를 채운다.

![align-self-word-1.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-self-word-1.png)

```css
.container {
  display: flex;
  flex-direction: row;
}
.item:nth-child(1) {
  align-self: auto;
}
.item:nth-child(2) {
  align-self: stretch;
}
.item:nth-child(3) {
  align-self: flex-start;
}
.item:nth-child(4) {
  align-self: flex-end;
}
.item:nth-child(5) {
  align-self: center;
}
.item:nth-child(6) {
  align-self: baseline;
}
```

`flex-direction:column;` 일 때는 교차 축인 가로축을 기준으로, 아이템들이 컨테이너를 채운다.

![align-self-word-2.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/align-self-word-2.png)

```css
.container {
  display: flex;
  flex-direction: column;
}
```

**align-self의 활용 예시**

아래는 Flex 컨테이너의 아이템들을 align-self 속성을 사용하여 간단하고 쉽게 정렬한 모습이다. 컨테이너에 `flex-direction:column;` 을 부여하고, 첫 번째 Flex 아이템에 `align-self:flex-end;`를, 네 번째 Flex 아이템에 `align-self:flex-start;` 을 주어 배치하였다. 값이 부여되지 않은 두 번째와 세 번째 아이템 요소는 `align-self:auto;`가 되어, 컨테이너의 `align-items`의 기본값인 stretch 속성을 부여받은 것을 확인할 수 있다.

![card.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/card%201.png)

```css
.container {
  display: flex;
  flex-direction: column;
}
.item:nth-child(1) {
  align-self: flex-end;
}
.item:nth-child(4) {
  align-self: flex-start;
}
```

## 9.2. order

`order` 속성은 아이템 요소들의 순서를 결정하는 속성이다. 기본적으로 `flex`는 작성한 순서대로 나열되지만, `order` 속성을 사용하여 아이템들의 순서를 변경할 수 있다.

**order의 특징**

- 기본값은 0이며, 음수와 양수를 사용할 수 있다. 값이 작을수록 우선순위가 적용되어 `음수 → 0 → 양수` 순서로 표시된다.
- `flex-direction` 속성의 방향값(row, row-reverse, column, column-reverse)을 기준으로 낮은 숫자를 먼저 배치한다.
- HTML 구조와 상관없이 순서를 시각적으로 변경할 수 있지만, HTML 자체의 구조를 바꾸는 것은 아니다. 따라서 스크린리더가 읽을 때는 `order`값이 적용되지 않고 HTML 마크업 순서대로 읽힌다.

아래는 `flex-direction: row;` 와 `flex-direction: column;`에서 `order` 값을 적용하지 않았을 때와 적용했을 때의 모습이다.

`flex-direction: row;`

- order 값을 적용하지 않은 모습

![2022-05-13 22 14 06.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/2022-05-13_22_14_06.png)

- order값을 적용한 모습

![2022-05-13 22 15 44.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/2022-05-13_22_15_44.png)

```css
.item:nth-child(1) {
  order: 2;
}
.item:nth-child(2) {
  order: 3;
}
.item:nth-child(3) {
  order: 1;
}
```

`flex-direction: row;`

- order 값을 적용하지 않은 모습

![2022-05-13 22 18 40.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/2022-05-13_22_18_40.png)

- order값을 적용한 모습

![2022-05-13 22 19 11.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/2022-05-13_22_19_11.png)

**order의 사용 예시**

1. 날짜와 제목, 내용이 있는 카드 디자인을 만든다고 가정하자. 아래의 이미지처럼 날짜가 제목보다 먼저 위치하게 할 때, 기본 순서로 배치한다면 스크린 리더는 날짜, 제목, 내용 순으로 읽을 것이다. 하지만 사용자는 가장 중요한 제목을 먼저 읽은 후 날짜를 읽기를 선호한다. 이럴 경우, 날짜에 `order:-1`을 주어 시각적 순서만 바꿔서 스크린 리더가 읽는 순서를 변경하지 않도록 할 수 있다.

![Group 1-1.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Group_1-1.png)

1. 아래와 같은 경우에도 order 속성을 사용할 수 있다.

이미 만들어진 모듈을 사용하여 웹을 구성한다면 초기에는 아래와 같은 배치가 된다. 마크업 순서가 header부터 footer까지 차례대로 되어있으므로, 각 요소의 크기를 조정해주어도 기본적으로 순서는 바뀌지 않는다.

![flex_기타01.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/flex_%EA%B8%B0%ED%83%8001.png)

- **order 속성을 주지 않았을 때**

요소들의 크기를 조정해주었지만, 마크업 순서대로 배치되기 때문에 order 속성을 주지 않는다면 기본적인 순서를 변경할 수 없다.

![flex_기타02.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/flex_%EA%B8%B0%ED%83%8002.png)

- **order 속성을 주었을 때**

현재 main 부분을 가운데로 옮기려고 한다. 그러므로 aside-a, main, aside-b 요소에 각각 order를 주면 배치가 되지만, 기본적으로 order 값을 1이라도 주게 되면, order 값이 없는 속성이 더 우선시되기 때문에 마크업상 아래에 있는 footer 부분에도 order 값을 주어야 한다. 즉 우리가 원하는 순서대로 각 요소에 order를 1, 2, 3, 4를 주게 되면, 우리가 원하는 레이아웃을 만들 수 있다.

![flex_기타03.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/flex_%EA%B8%B0%ED%83%8003.png)

```css
.main {
  width: 60%;
  order: 2;
}

.aside {
  width: 20%;
}

.aside.aside-a {
  order: 1;
}

.aside.aside-b {
  order: 3;
}

.footer {
  order: 4;
}
```

## 9.3. z-index

flex에서도 z-index 속성을 사용할 수 있다. 어떤 요소에 z-index의 값이 1이라도 주어진다면 마치 다른 요소를 덮어 씌우는 것과 같은 모습을 표현할 수 있다.

![z-index.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/z-index.png)

```css
.main {
  width: calc(60% - 16px);
  order: 2;
  z-index: 1;
  transform: scale(1.5);
  opacity: 0.8;
}
```

# 10. IE 지원을 위한 Flex

## 10.1. -ms- prefix 사용 예시

**IE에서 지원하지 않는 Flex 속성**

`flex-flox` , `justify-content: space-around` , `align-self` , `align-content` 의 4가지 속성들은 현재 지원하고 있지 않다. 또 `flex-grow` , `flex-shrink` , `flex-basis`의 3가지 속성들은 단축 속성인 `-ms-flex: 0 1 auto;` 를 통해 지원하고 있다. (IE10버전 에서는 `-ms-flex: 0 0 auto;` 를 통해 지원하고 있다.)

F**lex 속성 IE 지원 대응표**

| 속성            | IE 지원               |
| --------------- | --------------------- |
| display: flex;  | display: -ms-flexbox; |
| flex-grow       | -ms-flex              |
| flex-direction  | -ms-flex-direction    |
| flex-wrap       | -ms-flex-wrap         |
| order           | -ms-flex-order        |
| justify-content | -ms-flex-pack         |
| align-items     | -ms-flex-align        |

## 10.2. IE에서의 Flex 이슈

**주의해야 할 Flex 이슈**

IE 10/11 버전에서 Flex를 사용 할 때 생각대로 작동되지 않는 이슈들과 맞닥뜨릴 수 있는데, 그 중 몇 가지를 소개하겠다.

- IE 10과 11 버전에서 flex-basis 사용 시에 `box-sizing: border-box;`가 인식되지 않는다. IE 10/11에서는 flex-basis로 flex item의 크기를 정할 때, flex item의 크기를 항상 item의 콘텐츠 크기를 기준으로 잡는다. `box-sizing: border-box;` 속성을 주어도 바뀌지 않는다. 이를 해결하는 방법 중 하나는 flex item을 감싸는(wrapper) 요소를 추가해 주는 것이다. 이 때 요소는 border나 padding값이 없어야 한다.
- IE 10/11에서 `min-height` 속성을 flex container에 사용 시, 자식 태그인 flex item은 부모 태그인 flex container의 크기를 인식하지 못한다. 예를 들어, flex item을 수직 정렬하고자 할 때, 부모인 flex container의 높이가 인식되어야 하는데, item들이 높이를 인식하지 못하게 된다. 이를 해결하는 방법으로는 flex container를 감싸는 또 다른 flex container요소(wrapper)를 추가하는 것이다. 이때 flex container를 감싸는 부모 요소는 column direction 속성으로 지정해주어야 한다.

**flex 이슈 확인 사이트**

이 외에도 IE 10/11 버전에서 flex 사용에는 여러 이슈가 있다. 다음은 flex 이슈를 확인할 수 있는 사이트이다.

[https://github.com/philipwalton/flexbugs](https://github.com/philipwalton/flexbugs)

# 11. 성배 레이아웃 그리기

## 11.1. Flex 속성을 이용하여 기본 성배 레이아웃 구현하기

**최종코드**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>성배레이아웃1</title>
    <link
      rel="stylesheet"
      as="style"
      crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />
    <style>
      :root {
        --dark: #504975;
        --white: #ffffff;
        --background: #fbfbff;
        --primary: #7661e2;
        --light: #eceafe;
      }

      * {
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
          'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
          sans-serif;
      }
      body {
        height: 100%;
        padding: 10%;
        box-sizing: border-box;
      }
      .container {
        width: 70%;
        height: 300px;
        padding: 22px;
        margin: 0 auto;
        border: 1px solid var(--dark);
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 4px 12px 0px #51459f14;
      }
      .item {
        height: 40px;
        /* padding: 0px ; 콘텐츠에 따라 조절해주세요 */
        border: 1px solid var(--dark);
        border-radius: 20px;
        background-color: var(--primary);
        color: var(--white);
        box-shadow: 0px 4px 15px 0px #51459f14;
        text-align: center;
        vertical-align: middle;
        line-height: 2.5;
        word-break: keep-all;
      }
      .wrap {
        display: flex;
        flex-flow: row wrap;
        gap: 0.5rem;
        margin: 0.5rem 0;
      }
      .main-content,
      .left-sidebar,
      .right-sidebar {
        background-color: var(--light);
        color: var(--dark);
        padding: 80px 0;
      }
      .main-content {
        flex-grow: 2;
        order: 2;
      }
      .left-sidebar {
        flex-grow: 1;
        order: 1;
      }
      .right-sidebar {
        flex-grow: 1;
        order: 3;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="item header">Header</div>
      <div class="wrap">
        <div class="item main-content">Main Content</div>
        <div class="item left-sidebar">Left Sidebar</div>
        <div class="item right-sidebar">Right Sidebar</div>
      </div>
      <div class="item footer">Footer</div>
    </div>
  </body>
</html>
```

![스크린샷 2022-05-14 오전 11.57.29.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-14_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.57.29.png)

1. 컨테이너 안에 요소들을 넣으면 마크업순서에 따라 자동적으로 위에서 아래로 쌓이게 된다. 우리는 `content`, `sidebar`요소들을 나란히 배치하는 것이 목적이다.

![_Users_yeeeD_Desktop_flex_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A2%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%BA_%E1%84%80%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A2%E1%84%92%E1%85%B4_flex-%E1%84%89%E1%85%A5.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/_Users_yeeeD_Desktop_flex_E18489E185A5E186BCE18487E185A2E18485E185A6E1848BE185B5E1848BE185A1E1848BE185AEE186BA_E18480E185B5E186B7E18490E185A2E18492E185B4_flex-E18489E185A5.png)

```html
<div class="container">
  <div class="header">Header</div>
  <div class="main-content">Main Content</div>
  <div class="left-sidebar">Left Sidebar</div>
  <div class="right-sidebar">Right Sidebar</div>
  <div class="footer">Footer</div>
</div>
```

1. 나란히 배치하고 싶은 요소들을 `wrap`으로 묶어준다. `wrap`부분에 `display: flex;` 를 선언해 줌으로써 `flex-direction`방향이 초기값인 `row`로 정렬된다. 또한 `flex`속성으로인해 안의 요소들이 콘텐츠가 차지하는 만큼의 너비를 갖는다.

![_Users_yeeeD_Desktop_flex_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A2%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%BA_%E1%84%80%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A2%E1%84%92%E1%85%B4_flex-%E1%84%89%E1%85%A5.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/_Users_yeeeD_Desktop_flex_E18489E185A5E186BCE18487E185A2E18485E185A6E1848BE185B5E1848BE185A1E1848BE185AEE186BA_E18480E185B5E186B7E18490E185A2E18492E185B4_flex-E18489E185A5%201.png)

```html
<div class="container">
  <div class="header">Header</div>
  <div class="wrap">
    <div class="main-content">Main Content</div>
    <div class="left-sidebar">Left Sidebar</div>
    <div class="right-sidebar">Right Sidebar</div>
  </div>
  <div class="footer">Footer</div>
</div>
```

```css
.wrap {
  display: flex;
}
```

1. 아이템 요소는 윈도우 창 크기에 따라서 작아지기도 하고 커지기도 한다. 이때 비율을 설정해 주기 위해 남은 여백을 나눠 가질 수 있도록 숫자를 지정해준다. `Main Content`가 가장 큰 비율을 차지해야 하므로 `flex-grow:2;` 를 지정해주고 나머지는 `flex-grow:1;` 로 지정한다.

![_Users_yeeeD_Desktop_flex_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A2%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%BA_%E1%84%80%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A2%E1%84%92%E1%85%B4_flex-%E1%84%89%E1%8 (1).png](<%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/_Users_yeeeD_Desktop_flex_E18489E185A5E186BCE18487E185A2E18485E185A6E1848BE185B5E1848BE185A1E1848BE185AEE186BA_E18480E185B5E186B7E18490E185A2E18492E185B4_flex-E18489E18_(1).png>)

```css
.main-content {
  flex-grow: 2;
}

.left-sidebar {
  flex-grow: 1;
}

.right-sidebar {
  flex-grow: 1;
}
```

1. 마크업 순서에 따라 `Left Sidebar`, `Main Content`, `Right Sidebar` 순으로 쌓이게 되는데, `Main Content`를 가운데로 오게 배치해야 하므로 `order`속성을 각각 정해주어 브라우저 상에 표시되는 모습을 지정하여 완성한다.

![_Users_yeeeD_Desktop_flex_%E1%84%89%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A2%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%BA_%E1%84%80%E1%85%B5%E1%86%B7%E1%84%90%E1%85%A2%E1%84%92%E1%85%B4_flex-%E1%84%89%E1%8 (2).png](<%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/_Users_yeeeD_Desktop_flex_E18489E185A5E186BCE18487E185A2E18485E185A6E1848BE185B5E1848BE185A1E1848BE185AEE186BA_E18480E185B5E186B7E18490E185A2E18492E185B4_flex-E18489E18_(2).png>)

```css
.main-content {
  flex-grow: 2;
  order: 2;
}

.left-sidebar {
  flex-grow: 1;
  order: 1;
}

.right-sidebar {
  flex-grow: 1;
  order: 3;
}
```

## 11.2. Flex 속성을 이용하여 변형된 성배 레이아웃 구현하기

**최종코드**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flexbox 성배레이아웃2</title>
    <link
      rel="stylesheet"
      as="style"
      crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
    />
    <style>
      :root {
        --dark: #504975;
        --white: #ffffff;
        --background: #fbfbff;
        --primary: #7661e2;
        --light: #eceafe;
      }

      * {
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto,
          'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
          sans-serif;
      }
      body {
        height: 100%;
        padding: 10%;
        box-sizing: border-box;
      }
      .container {
        width: 70%;
        padding: 22px;
        margin: 0 auto;
        border: 1px solid var(--dark);
        border-radius: 20px;
        background: #fff;
        box-shadow: 0px 4px 12px 0px #51459f14;
      }
      .item {
        height: 40px;
        /* padding: 0px ; 콘텐츠에 따라 조절해주세요 */
        border: 1px solid var(--dark);
        border-radius: 20px;
        background-color: var(--primary);
        color: var(--white);
        box-shadow: 0px 4px 15px 0px #51459f14;
        text-align: center;
        vertical-align: middle;
        line-height: 2.5;
        word-break: keep-all;
      }
      .wrap {
        display: flex;
        flex-flow: row wrap;
        gap: 0.5rem;
        margin: 0.5rem 0;
      }
      .content,
      .sidebar {
        background-color: var(--light);
        color: var(--dark);
      }

      .content {
        flex-grow: 1;
        order: 2;
        padding: 30px 0;
      }

      .sidebar {
        flex-grow: 1;
        order: 1;
        padding: 55px 0;
      }

      .footer {
        width: 66%;
        margin-left: auto;
        margin-top: -50px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="item header">Header</div>
      <div class="wrap">
        <div class="item content">Content</div>
        <div class="item content">Content</div>
        <div class="item sidebar">Sidebar</div>
      </div>
      <div class="item footer">Footer</div>
    </div>
  </body>
</html>
```

![스크린샷 2022-05-14 오전 11.57.39.png](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-14_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.57.39.png)

1. 기본 html 코드를 작성해본다. 큰 `container` 안에 `header`, `content`, `footer` 세가지로 나뉜 상태에서 제작을 한다.

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2023.png)

   ```html
   <div class="container">
     <div class="header">Header</div>
     <div class="content">Content</div>
     <div class="footer">Footer</div>
   </div>
   ```

2. `content`를 세분화하여 2개의 `content`와 1개의 `sidebar`가 새로운 요소로 나올 수 있게끔 분할하고 상위요소로 하나의 `wrap`으로 묶어준다. 우리는 `wrap`요소의 `flex` 를 이용하여 자유롭게 변형된 레이아웃을 배치하는 것이 목적이다.

![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2024.png)

```html
<div class="container">
  <div class="header">Header</div>
  <div class="wrap">
    <div class="content">Content</div>
    <div class="content">Content</div>
    <div class="sidebar">Sidebar</div>
  </div>
  <div class="footer">Footer</div>
</div>
```

1. `content` 와 `sidebar` 요소들의 상위 부모 요소인 `wrap`에 `display:flex` 속성을 부여하고 각 요소 간 여백과 간격을 부여한다. flex의 하위 요소들의 간격을 조정할 때는 `gap` 속성을 이용하며 부모 요소인 `wrap` 자신의 여백을 조정할 때는 `margin`을 이용한다.

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2025.png)

   ```css
   .wrap {
     display: flex;
     flex-flow: row wrap;
     gap: 0.5rem;
     margin: 0.5rem 0;
   }
   ```

2. `contents`의 스타일을 조정해본다. `flex-glow` 속성으로 여백을 동일하게 주도록 프로퍼티 값을 1로 통일해주고, 마크업 순서 상 `content`가 가장 먼저 나와야 하지만 디자인 상으로는 `sidebar`가 앞으로 나오도록 설정해주어야 함으로 `order`값을 `sidebar`보다 높은 양수의 숫자로 표현한다. (패딩 값은 임의의 높이를 설정하기 위하여 임의의 값을 지정하였다)

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2026.png)

   ```css
   .content {
     flex-grow: 1;
     order: 2;
     padding: 30px 0;
   }
   ```

   1. `sidebar`의 크기를 조정해준다. `content`와 같은 여백을 가지기 위하여 `flex-glow`값을 1로 통일하였고, `content`보다 레이아웃 상 앞으로 배치하기 위하여 `order`값을 `content`의 `order`값 2보다 작은 1로 작업해본다. `content`와 마찬가지로 `content`보단 높은 임의의 높이값을 설정하기 위하여 패딩값을 주었다.

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2027.png)

   ```css
   .sidebar {
     flex-grow: 1;
     order: 1;
     padding: 55px 0;
   }
   ```

   1. `footer`의 스타일링 차례이다. `footer`를 `content`의 바로 아랫공간으로 이동시키기 위해서 전체 `content` 값을 유동적으로 적용할 수 있도록 `footer` 의 `width` 를 퍼센티지의 값으로 넣는다. 그리고 `footer`는 블록 요소이므로 `footer`의 해당 줄 전체를 차지하는 `margin`의 왼쪽값을 `auto`로 부여하여 `footer`의 왼쪽 여백을 자동으로 가져갈 수 있도록 작성한다.

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2028.png)

   ```css
   .footer {
     width: 66%;
     margin-left: auto;
   }
   ```

   1. 마지막 단계이다. `footer`여백에 여백의 반대라는 의미인 `nagative margin`을 적용하여 `footer`요소를 위쪽으로 끌어올려주면 `flex`의 변형된 성배레이아웃 작성이 끝난다.

   ![Untitled](%E1%84%8C%E1%85%A6%E1%84%86%E1%85%A9%E1%86%A8%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%B7%208d36b13fdc30410697f10e0ae7d7c0c9/Untitled%2029.png)

   ```css
   .footer {
     width: 66%;
     margin-left: auto;
     margin-top: -50px;
   }
   ```
