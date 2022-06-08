# 1. Grid

웹이 나오기 시작한 초창기에는 종종 table(표)을 사용해 레이아웃을 구성하였다. 그러나 시멘틱한 마크업의 중요성이 대두되며 점차 이 방식은 지양하게 되었는데, 애초에 table이 표 형식의 데이터를 관리하고 제어하기 위해 만들어졌기 때문이다. 또한 table로 구성된 레이아웃은 반응형 디자인을 고려하기에는 적합하지 않았다.

이후 table의 대안으로 꽤 오랜 기간 사용해왔던 것이 float이다. 그러나 역시 float도 본래의 용도는 이미지와 텍스트의 레이아웃이기 때문에 우리가 원하는 복잡한 어플리케이션 레이아웃을 구현하기에는 적합하지 않았고, 여전히 반응형 디자인에서 제어가 어렵다는 단점이 있었다.

결국 CSS Working Group은 table과 float의 단점을 커버하면서, ‘레이아웃'의 용도에 적합한 Grid Layout Model을 만들게 되었다. 앞서 살펴보았던 Flex를 통해 손쉬운 반응형 레이아웃을 구현할 수 있었다.

**Flex는** 부모 요소 안에서 **한 방향으로만 아이템들을 배치**할 수 있지만, **Grid는 행과 열, 두 가지 방향으로 배치가 가능하기 때문에 어렵고 복잡한 레이아웃 작성에 매우 적합**하다.

## 1.1 grid로 할 수 있는 것들

Grid는 1차원, 2차원 레이아웃을 구상할 수 있다. 아래와 같이 헤더-사이드바-컨테이너-푸터로 이루어진 기본적인 웹 페이지의 전체적인 레이아웃을 짜는 것이 가능하다.

![Screen Shot 2022-05-12 at 12.04.40 AM.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Screen_Shot_2022-05-12_at_12.04.40_AM.png)

Grid 안의 아이템들도 또다시 grid 레이아웃으로 만드는게 가능하다. 아주 작은 텍스트 단위의 요소도 grid를 사용하여 아이템을 배치할 수 있다.

![Screen Shot 2022-05-12 at 12.04.11 AM.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Screen_Shot_2022-05-12_at_12.04.11_AM.png)

Grid 레이아웃으로 쉽게 만들 수 있는 홈페이지의 예이다. 헤더-사이드바-컨테이너로 구성되어 있고, 컨테이너 안의 아이템들도 grid를 사용한 것을 확인할 수 있다.

![Screen Shot 2022-05-14 at 11.25.17 AM.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Screen_Shot_2022-05-14_at_11.25.17_AM.png)

![Screen Shot 2022-05-14 at 11.25.34 AM.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Screen_Shot_2022-05-14_at_11.25.34_AM.png)

## 1.2. 그리드 용어정리

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled.png)

![GridFlex.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/GridFlex.png)

- **그리드 컨테이너 (Grid Container)**
  - grid를 적용하는 전체 영역을 의미. 열(Columns)과 행(Rows)을 가지며, 그리드 아이템(Items)을 배치
- **그리드 아이템 (Grid** **Item)**
  - grid 컨테이너의 자식 요소들,이 아이템들이 grid 규칙에 의해 배치
- **그리드 라인(Grid Line)**
  - \*\*\*\*grid를 그리는 행(Row)/열(Column)을 그리는 선
  - 각 선은 라인 넘버를 가지며 그리드 아이템을 배치하는 기준이 된다.
- **그리드 트랙 (Grid Track)**
  - grid 라인 사이의 행(Row) 또는 열(Column) 공간
- **그리드 셀 (grid Cell)**
  - grid의 한 칸을 가리키는 말 (유닛으로 부르기도 한다)
  - 4개의 그리드 라인이 모여 그려지는 한 칸의 공간
- **그리드 번호(Grid Number)**
  - grid 라인의 각 번호
- **그리드 영역(Grid Area)**
  - 4개의 그리드 라인으로 둘러싸인 공간으로 그리드 셀이 묶인 영역
  - 식별자를 통해 요소를 배치
- **그리드 갭(Grid Gap)**
  - 그리드 거터(Grid Gutters)
  - 행(Row) 또는 열(Column) 사이의 간격

## 1.3. 개발자 도구로 그리드 체크하는법

Chrome에서 개발자 도구를 이용하면 HTML 요소에 grid 속성이 적용된 요소는 옆에 버튼이 생기게 되는데 이 버튼을 누르고 닫음으로써 grid 요소의 배치, 속성, 크기를 파악할 수 있다.

맥은 <command + option + i>, 윈도우는 <ctrl + shift +i> 또는 F12를 이용하여 개발자 도구로 진입할 수 있다.

![개발자확인1번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EA%B0%9C%EB%B0%9C%EC%9E%90%ED%99%95%EC%9D%B81%EB%B2%88.png)

![개발자도구1번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%8F%84%EA%B5%AC1%EB%B2%88.png)

또한, Styles 탭에서 `display : grid;` 속성 옆의 버튼을 이용해서 요소에 grid의 다양한 속성을 바로 적용하여 어떻게 변하는지 바로 확인할 수 있다.

![개발자확인2번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EA%B0%9C%EB%B0%9C%EC%9E%90%ED%99%95%EC%9D%B82%EB%B2%88.png)

Styles 탭 옆의 Layout 탭에 들어가게 되면 그리드가 적용된 요소를 더욱 상세하게 볼 수 있다.

![개발자확인3번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EA%B0%9C%EB%B0%9C%EC%9E%90%ED%99%95%EC%9D%B83%EB%B2%88.png)

**Show track sizes :** 그리드 셀(Grid Cell)의 크기를 표시한다.

![showtracksizes.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/showtracksizes.png)

![트랙사이즈확인.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%ED%8A%B8%EB%9E%99%EC%82%AC%EC%9D%B4%EC%A6%88%ED%99%95%EC%9D%B8.png)

**Show area names : `grid-template-areas`** 속성이 적용되어 있다면, 그 영역의 이름을 표시한다.

![areaname.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/areaname.png)

![영역이름.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%98%81%EC%97%AD%EC%9D%B4%EB%A6%84.png)

**Extend grid lines :** 그리드 라인(Grid Line)을 확장한다.

![exted.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/exted.png)

![확장선.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%ED%99%95%EC%9E%A5%EC%84%A0.png)

## 1.4. grid 사용법

Grid는 Flex와 마찬가지로 HTML 구조에 컨테이너와 아이템, 이렇게 두 가지 요소가 필요하다. 컨테이너는 부모 요소로, Grid 레이아웃의 영향을 받는 전체적인 공간이다. 반면 아이템은 자식 요소로, 컨테이너 내부에서 설정된 속성에 따라 배치된다. 이를 Grid에서는 각각 그리드 컨테이너(Grid Container)와 그리드 아이템(Grid Item)이라 한다.

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

grid를 사용하기 위해선 flex 처럼 CSS에서 display 속성을 부여하는 과정이 필요하다. 컨테이너`display:grid;`를 적용하면 이후 Grid가 제공하는 속성을 다양하게 사용할 수 있다.

선언 시 즉각적으로 아이템들이 가로로 배치되는 flex와 달리, grid는 `display:grid;`선언을 해도 변화를 확인하기 어렵다. 왜냐하면 grid 레이아웃이 되었지만, 아직 컨테이너가 하나의 열(row)밖에 없어 아이템들이 기본정렬을 유지하고 있기 때문이다. 컨테이너에 grid-template-columns, grid-template-rows 속성을 추가하여 행과 열을 추가함으로써 그리드 형태를 명확히 확인할 수 있다.

```css
.container {
  display: grid;
}
```

# 2. Grid row , Grid column

## 2.1. grid-template-rows, grid-template-columns

Grid는 행과 열로 이루어져 있다. 행은 row, ‘가로'이고 열은 column, '세로'이다. grid row와 column을 사용하기 위해서는 template 속성을 사용해 행과 열의 크기를 지정해 주어야 한다. 여기서 주의할 점은 행과 열의 **개수**가 아닌 **크기를** 지정하는 것이다.

- `grid-template-columns` : column(열)의 넓이(크기) 지정하기
- `grid-template-rows` : row(행)의 높이 지정하기

다음은 4개의 아이템의 column과 row에 각각 350px, 200px을 준 예제이다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%201.png)

```css
.container {
  display: grid;
  grid-template-columns: 350px 350px;
  grid-template-rows: 200px 200px;
}
```

이렇게 입력된 코드 값은 크기 단위로 입력되어 각 column과 row의 순서에 맞게 값이 적용 된 것을 볼 수 있다. 결론적으로 grid-template-columns와 grid-template-rows는 다음과 같이 사용할 수 있다.

```css
grid-template-columns: colum1넓이 colum2넓이;
grid-template-rows: row1높이 row2높이;
```

## 2.2. repeat / 1fr이란

**fr이란?**

fr 은 fraction의 줄임말로, fraction을 직역하면 ‘분수’라는 뜻을 가지고 있다. grid 에서는 그리드 컨테이너에서 사용할 수 있는 공간의 일부를 나타내는 단위를 의미하는데, fr 단위를 사용하면 그리드 내부의 레이아웃 분할을 자동으로 계산해서 적용할 수 있다. 그리드 레이아웃에서 그리드 아이템의 크기를 지정할 때 px 을 이용하면 항상 크기가 고정되기 때문에 반응형 웹 디자인에는 적합하지 않다. 그래서 상대적인 크기를 지정할 수 있도록 fr 단위를 사용하면, 더 편리하게 반응형 디자인을 적용할 수 있다. 예를 들어 `grid-template-columns: 1fr 1fr 1fr;` 이라는 코드를 적는다면, 컨테이너 안 그리드 아이템의 크기는 1 : 1 : 1 의 비율로 각각 적용된다.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%202.png)

**repeat() 함수**

repeat()은 그리드 속성값으로 사용할 수 있는 함수로, 반복되는 값을 자동으로 처리할 수 있다. 만약, 스타일 중 반복되는 부분이 있다면 repeat() 함수를 이용해서 코드를 좀 더 간소화할 수 있다.

**적용방법**

```css
repeat(반복횟수, 반복값);
```

아래 두 코드의 결과는 같다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(4, 140px);
}
```

```css
.container {
  display: grid;
  grid-template-columns: 140px 140px 140px 140px;
}
```

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%203.png)

**반복을 줄일 수 있는 repeat() 함수 사용의 예**:

```css
.container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}
```

1fr를 10번 작성할 필요 없이, repeat() 함수를 이용해 간단하게 코드를 작성할 수 있다. 10개의 그리드 아이템이 같은 비율로 컨테이너에 들어가게 된다.

![스크린샷 2022-05-18 오후 5.17.37.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-18_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.17.37.png)

repeat() 값으로 같은 값/비율이 아닌 각기 다른 비율(fr)의 값을 줄 수도 있다. 아래와 같이 코드를 적으면 3개의 아이템이 1 : 3 : 2의 비율로 반복해서 들어간다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr 3fr 2fr);
}
```

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%204.png)

## 2.3. min-max 함수

min-max속성은 트랙의 크기를 최솟값과 최댓값으로 지정할 수 있는 함수를 의미한다. 그리드 열 또는 행의 값으로 minmax를 사용할 수 있다. minmax( 트랙의 최솟값, 트랙의 최댓값) 형태로 사용한다.

**자주 쓰이는 속성**

- length: 음수의 아닌 길이값이다.
- percentage: 그리드 컨테이너의 블록 크기에 상대적인 음이 아닌 백분율이다.
- flex: 그리드 트랙을 숫자의 비율대로 나눈다.
- max-content: 그리드 트랙을 차지하는 최대 콘텐츠 범위이다.
- min-content: 그리드 트랙을 차지하는 최소 콘텐츠 범위이다.
- auto: 그리드 트랙을 차지하는 최대 콘텐츠 범위이다. (max-content 결과와 동일하다.)

```css
minmax(100px, 1fr)
minmax(200px, 50%)
minmax(30%, 100px)
minmax(100px, max-content)
minmax(min-content, 50%)
minmax(max-content, auto)
```

grid-template-columns의 영역을 px 단위로 열의 너비를 설정할 수 있다. 화면 전체 크기를 변경하면 동시에 열의 너비가 늘어나거나 줄어들기도 한다. 아래 예시는 최소 30px에서 최대 300px사이에서만 반응한다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(
    3,
    minmax(30px, 300px)
  ); /* 최소30px~최대300px */
}
```

grid-template-columns의 영역을 % 단위와 fr 단위로 열의 너비를 설정할 수 있다. 아래 예시는 첫 번째 열의 너비가 최소 50%에서 최대 90% 비율로 늘어나며 두 번째 세 번째 열은 나머지 공간을 균등하게 나누어 가진다.

```css
.container {
  display: grid;
  grid-template-columns: minmax(50%, 90%) 1fr 1fr;
}
```

max 값을 auto로 입력하면 그리드 영역 범위를 최대 크기의 영역으로 유연하게 늘어나도록 할 수 있다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(30px, auto)); /* 최소 30px */
}
```

minmax(auto, max-content)를 사용하면 그리드 아이템 콘텐츠 크기에 맞추어 영역이 설정된다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(auto, max-content));
}
```

auto-fill과 사용하여 반응형 그리드 영역을 만들 수 있다. minmax를 사용하여 최소 200px의 영역을 유지하고 1fr의 길이는 전체 너비의 따라 반응한다. auto-fill은 설정된 너비에서 가능한 많은 영역을 만들어낸다.

![minmax 이미지.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/minmax_%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png)

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

## 2.4. grid-auto-rows , grid-auto-columns

grid-item이 사용자가 명시적으로 지정해준 grid-template-columns 또는 grid-template-rows 에서 벗어난 위치에 존재하게 될 때, 트랙의 크기를 암시적으로 지정하는 속성이다. 쉽게 말하자면, grid 행(rows)/열(columns) 트랙 크기를 자동으로 설정한다.

**grid-auto-rows**

grid item이 grid-template-rows로 지정한 명시적 행 외부에 존재하는 경우 암시적 행의 크기가 적용된다. 앞으로 추가될 수 있는 모든 행의 높이를 정해주고 싶다면 grid-auto-rows를 적용해주면 된다.

**grid-auto-columns**

grid item이 grid-template-columns로 지정한 명시적 열 외부에 존재하는 경우 암시적 열의 크기가 적용된다. 암시적 크기가 적용된 행과 열은 오직 양수만 사용할 수 있다 (음수는 사용이 불가하다)

기본적으로 grid에서 각 행의 높이는 지정해주지 않는 이상 콘텐츠의 크기를 가지기 때문에 각각 다르다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%205.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
```

각 행의 높이를 같게 만들기 위해서 grid-template-row 속성을 이용해 여러 가지 여러 가지 방식으로 높이 값을 지정해줄 수 있지만, 이 높이 값은 ‘앞으로 추가될 아이템'에는 적용되지 않는다. grid-template-rows는 현재 정의되고 있는 행의 높이만을 설정할 뿐이기 때문이다. 아이템이 더 추가된다면 행의 높이가 달라지고, 그럼 grid-template-rows를 다시 한번 수정해야 한다는 번거로움이 있다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%206.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
```

이 문제를 해결하기 위해 grid-auto-rows를 써주면 콘텐츠가 늘어날 때마다 CSS에 row의 개수를 수정해 줄 필요 없이 자동으로 값이 적용되게 된다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%207.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
}
```

minmax 프로퍼티를 사용하여 값을 지정해줄 수도 있다.

```css
.container {
  display: grid;
  grid-auto-rows: minmax(100px, auto);
}
```

# 3. Gap

## 3.1. gap이란?

Gap은 그리드 컨테이너와 아이템 요소들의 간격을 설정하는 속성이다. gap 속성값에는 우리가 사용하는 각종 단위가 들어갈 수 있다. 길이를 나타내는 단위인 em, rem, px, vmin , vmax나 퍼센티지(%)를 사용 가능하며, calc() 함수를 이용하여 계산된 값도 사용할 수 있다. 하지만 fr 단위는 사용이 불가하다는 점에 주의해야 한다.

```css
/*단일 길이값*/
gap: 10px;
gap: 1em;
gap: 3vmin;

/*단일 퍼센티지값*/
gap: 10%;

/*이중 값*/
gap: 20px 10px;
gap: 10% 20%;

/*calc() 값*/
gap: calc(20px+10%);
```

fr 단위가 gap의 속성값이 될 수 없는 이유는, fr은 사용 가능한 공간을 분배하는 단위이기 때문이다. 아래 예시처럼 `grid-template-columns: 1fr 1fr 1fr;` 라는 속성을 컨테이너에 적용하면, 컨테이너의 사용 가능한 넓이를 고려하여 1 : 1 : 1의 비율로 분배하는 것이 fr의 역할이다. 하지만, grid item 요소들 사이에는 \***\*사용 가능한 공간이 존재하지 않고, 서로 붙어있는 상태이다**.** 따라서 \*\***아이템 간의 간격을 벌리는 속성인 gap에 fr 단위가 적용되지 않는 것이다.

아래 예제는 `gap:2fr`을 그리드 컨테이너에 부여하였지만 적용되지 않는 모습이며, 개발자 도구에서도 마찬가지로 fr이 잘못된 속성값이라 표시되는 것을 확인할 수 있다.

![grid-gap-3.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/grid-gap-3.png)

![gap-bad.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/gap-bad.png)

## 3.2. margin과 gap의 차이점

margin의 경우 인접한 요소의 존재와 상관없이 스타일이 적용되 불필요한 공간을 만든다.

![스크린샷 2022-05-22 오후 8.24.06.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.24.06.png)

gap은 인접한 요소가 있을때만 사이에 공간을 만들어 불필요한 공간을 만들지 않는다.

![스크린샷 2022-05-22 오후 8.23.17.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-22_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.23.17.png)

## 3.3. gap의 종류

**row-gap**

grid 셀의 행 사이의 간격을 설정하는 속성이다.

![1-row-gap.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/1-row-gap.png)

```css
.container {
  display: grid;
  row-gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
}
```

**column-gap**

grid 셀의 열 사이의 간격을 설정하는 속성이다.

![2-column-gap.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/2-column-gap.png)

```css
.container {
  display: grid;
  column-gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
}
```

**grid-gap**

`grid-row-gap`과 `grid-column-gap`을 한 번에 작성할 수 있는 축약형이다.

1**) grid-gap 단일 값**

하나의 값으로 축약하여 row-gap과 column-gap을 동시에 같은 크기의 gap을 만들 수 있다. 사용이 편리하지만 row와 column에 각자 다른 크기나 단위를 지정할 수는 없다.

![3-grid-gap-단일값.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/3-grid-gap-%EB%8B%A8%EC%9D%BC%EA%B0%92.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
}
```

**2) grid-gap 이중값**

grid-gap에 부여하는 첫 번째 값은 row-gap, 두 번째 값은 column-gap이다. 각자 다른 크기와 단위를 섞어서 사용할 수 있다. 만약, row와 column에 같은 크기의 gap을 주고 싶다면 grid-gap 단일 값을 사용하는 동시에 적용하는 것이 더 효율적이다.

![4-grid-gap-이중값.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/4-grid-gap-%EC%9D%B4%EC%A4%91%EA%B0%92.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5 0rem;
}
```

![5-gridd-gap-이중값-2.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/5-gridd-gap-%EC%9D%B4%EC%A4%91%EA%B0%92-2.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0 0.5rem;
}
```

# 4. 각 셀의 영역 지정

## 4.1. grid-column-start & grid-column-end

Grid 레이아웃에는 암묵적으로 grid 라인이 포함되어 있다. column 2개로 이루어진 grid 레이아웃을 상상해보도록 하겠다. column 라인은 앞에서부터 차례로 1,2,3번을 매길 수 있으므로 총 3개다.

- grid-column-start : column(열)시작의 라인 번호를 지정해준다.
- grid-column-end : column(열) 마지막의 라인 번호를 지정해준다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%208.png)

```css
/*item*/
.grid1 {
  grid-column-start: 1;
  grid-column-end: 3;
}
```

Grid 레이아웃에는 암묵적으로 grid 라인이 포함되어 있다. column 2개로 이루어진 grid 레이아웃을 상상해보도록 하겠다. column 라인은 앞에서부터 차례로 1,2,3번을 매길 수 있으므로 총 3개다.

## 4.2. grid-row-start & grid-row-end

다음은 grid-row-start & grid-row-end에 대해 알아보자. column과 사용 방법은 똑같으며 row의 영역을 지정할 수 있는 속성이다.

- grid-row-start : row의 시작 위치를 지정해준다.
- grid-row-end : row의 끝 위치를 지정해준다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%209.png)

```css
/* item */
.grid1 {
  grid-row-start: 1;
  grid-row-end: 3;
}
```

위 예제에서 grid1의 row 영역이 grid line의 1부터 3 까지 차지한 것을 볼 수 있다.

## 4.3. 셀의 영역 지정

이제 배운 속성들을 활용해서 아래 예제의 grid1 과 grid2의 영역을 지정해보겠다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%2010.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
```

기본 컨테이너의 속성은 다음과 같이 주었다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%2011.png)

```css
.grid1 {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 3;
}

.grid2 {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
}
```

지금까지 배운 `grid-column-start` , `grid-column-end` , `grid-row-start` , `grid-row-end` 속성을 사용하여 grid 셀의 영역을 지정할 수 있다. 하지만 이렇게 column과 row에 start와 end를 각 각 지정해주기에는 코드가 너무 길어지게 된다. start와 end를 한번에 지정 하려면 start와 end의 축약 속성인 `grid-column` , `grid-row`를 사용할 수 있다.

## 4.4. grid-column & grid-row

위에서 배운 `grid-column-start`와 `grid-column-end` 는 `grid-column`으로, `grid-row-start`와 `grid-row-end`는 `grid-row`로 축약하여 start와 end를 한 번에 지정하여 사용할 수 있다.

- grid-column : 시작 / 끝 ;
- grid-row : 시작 / 끝 ;

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%2012.png)

```css
.grid1 {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
}

.grid2 {
  grid-column: 1 / 3;
  grid-row: 3 / 4;
}
```

이렇게 grid-column, grid-row 속성을 사용하여 start와 end를 한 줄의 코드로 줄여 쓸 수 있게 되었다. 여기서 column과 row까지 한 번에 사용하고 싶다면 `grid-area` 속성을 사용하면 된다.

## 4.5. span 을 이용한 레이아웃 지정

Grid 에서 span은 아이템 요소에 쓰이는 속성이며, 몇개의 셀을 차지하게 할 것인지 지정해줄 수 있다. 숫자와 함께 쓰이며 이 숫자만큼 영역을 차지한다. 명시하지 않으면 span 1이 기본값이 된다.

![스크린샷 2022-05-21 오후 7.35.42.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.35.42.png)

```css
.grid1 {
  /* 2번 column 라인에서 시작해서 1칸 차지  */
  grid-column: 2 / 1 span;
  /* 1번 row 라인에서 시작해서 2칸 차지  */
  grid-row: 1 / 2 span;
}

.grid2 {
  /* 1번 column 라인에서 시작해서 2칸 차지  */
  grid-column: 1 / 2 span;
  /* 2번 row 라인에서 시작해서 1칸 차지  */
  grid-row: 3 / 1 span;
}
```

## 4.6. grid-area

grid 컨테이너 내의 item에 적용하는 속성이며, 아이템을 그리드에 배치할 때 사용할 수 있는 방법의 하나이다.

- `grid-row-start`, `grid-column-start`, `grid-row-end`, `grid-column-end`의 단축 속성이며, column과 row를 한 번에 지정할 수 있는 장점이 있다.
- 형태: grid-area: grid-row-start / grid-column-start / grid-row-end / grid- column-end
- 아래 예시의 grid1의 grid-area는 grid-row: 1 / 3, grid-column: 2 / 3과 동일하다.
- 아래 예시의 grid2의 grid-area는 grid-row: 3 / 4, grid-column: 1 / 3과 동일하다.

![Untitled](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/Untitled%2013.png)

```css
.grid1 {
  grid-area: 1 / 2 / 3 / 3;
}

.grid2 {
  grid-area: 3 / 1 / 4 / 3;
}
```

## 4.7. grid-template-areas

`grid-template-area` 는 그리드 내 각 영역(Grid Area)에 이름을 붙여 배치하는 매우 직관적인 방법이다.

각각의 아이템 요소가 차지하는 셀의 개수만큼 원하는 위치에 이름을 적어 영역을 지정해주면 지정한 자리만큼의 셀을 차지한다.

![스크린샷 2022-05-21 오후 7.41.35.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.41.35.png)

```css
.container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  grid-template-areas:
    'header header header header header'
    'main main main side side'
    'footer footer footer footer footer';
}

.header {
  grid-area: header;
}

.main {
  grid-area: main;
}

.sidebar {
  grid-area: side;
}

.footer {
  grid-area: footer;
}
```

- 각 아이템의 구분은 공백으로 하며 빈 영역을 만들고 싶다면 `.` (마침표)와 `none` 으로 빈 영역을 표시해줄 수 있다.

## 4.8. grid line 외의 추가적인 방법

**Grid name을 이용한 레이아웃 지정**

그리드 라인은 암묵적으로 그리드 라인 숫자가 지정되어 있는데, 이 라인에 이름을 지정할 수 있다.

![스크린샷 2022-05-21 오후 7.39.21.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.39.21.png)

```css
.container {
  display: grid;
  grid-template-columns: [col-1] 1fr [col-2] 1fr [col-3] 1fr [col-4];
  /* grid-template-columns: 1fr 1fr 1fr 과 같다. */
  grid-template-rows: [row-1] 1fr [row-2] 1fr [row-3] 1fr [row-4];
  /* grid-template-rows: 1fr 1fr 1fr 과 같다. */
}
```

각각의 라인에 이름을 정해주고 이 이름을 각 아이템 요소의 `grid-column-start` , `grid-column-end` , `grid-row-start` , `grid-row-end` 속성에 지정해주면 된다.

![스크린샷 2022-05-21 오후 7.37.21.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-05-21_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.37.21.png)

```css
.grid1 {
    grid-row-start: row-1;
    grid-row-end: row-1;
    grid-column-start: col-1
    grid-column-end: col-3;
}

.grid5 {
    grid-row-start: row-2;
    grid-row-end: row-4;
    grid-column-start: col-3;
    grid-column-end: col-4;
}
```

쉽게 생각하면 숫자 대신 이름을 넣어준다고 보면 된다.

# 5. IE지원을 위한 Grid

**아래와 같이 -ms-prefix를 붙여 IE지원을 해줄 수 있다.**

- `display: grid` → `display: -ms-grid`
- `grid-template-rows` → `-ms-grid-rows`
- `grid-template-columns` → `-ms-grid-columns`

**repeat()속성은 다음과 같이 사용한다.**

- `repeat(12, 1fr 20px)` → `(1fr 20px)[12]`

**grid 속성 IE지원 대응표**

| 속성                                     | IE 지원               |
| ---------------------------------------- | --------------------- |
| display: grid;                           | display: -ms-grid;    |
| grid-template-rows                       | -ms-grid-rows         |
| grid-template-columns                    | -ms-grid-columns      |
| grid-row-start                           | -ms-grid-row          |
| grid-column-start                        | -ms-grid-column       |
| align-self                               | -ms-grid-row-align    |
| justify-self                             | -ms-grid-column-align |
| grid-row: 1 / span 2;에서 span 2 대신    | -ms-grid-row-span     |
| grid-column: 1 / span 2;에서 span 2 대신 | -ms-grid-column-span  |

**IE에서 주의해야 할 auto-placement**

IE에서는 아래와 같은 grid의 auto-placement를 지원하지 않는다. IE에서는 grid의 자동 배치가 작동하지 않기 때문이다. prefix 사용도 불가능하다.

- grid-auto-columns
- grid-auto-rows
- grid-auto-flow

## 1) 기본 성배 레이아웃

`grid-area` 속성을 사용하여 기본 성배 레이아웃을 만들어 보려고 한다.

![처음사진최종수정.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%B2%98%EC%9D%8C%EC%82%AC%EC%A7%84%EC%B5%9C%EC%A2%85%EC%88%98%EC%A0%95.png)

```html
<div class="container">
  <div class="header">Header</div>
  <div class="left-sidebar">Left Sidebar</div>
  <div class="main-content">Main Content</div>
  <div class="right-sider">Right Sidebar</div>
  <div class="footer">Footer</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 22px;
  gap: 0.5rem;
}

/* layout */

.header {
  grid-area: 1/1/2/4;
}

.left-sidebar {
  grid-area: 2/1/3/2;
}

.main-content {
  grid-area: 2/2/3/3;
}

.right-sider {
  grid-area: 2/3/3/4;
}

.footer {
  grid-area: 3/1/4/4;
}
```

grid 속성값들을 사용하지 않았을 때 아이템들은 HTML 마크업 순서대로 배치가 된다.

![2022-05-16 16 24 18.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/2022-05-16_16_24_18.png)

그리드가 적용되는 상위 부모요소 container 에 `display:grid` 속성을 추가한다. 또한 `grid-template-columns: 1fr 2fr 1fr;` 을 주어 1:2:1 비율로 3개의 column을 만든다.

![2022-05-16 16 33 25.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/2022-05-16_16_33_25.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 22px;
}
```

`grid-template-rows: 1fr 3fr 1fr;` 를 주는데, 위의 `grid-template-columns`와 같이 1:3:1 비율로 3개의 row를 만든다.

![소희님1번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%86%8C%ED%9D%AC%EB%8B%981%EB%B2%88.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 22px;
}
```

`gap: 0.5rem;`을 주어 아이템 사이의 간격을 설정해준다.

![소희님2번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%86%8C%ED%9D%AC%EB%8B%982%EB%B2%88.png)

```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  gap: 0.5rem;
  padding: 22px;
}
```

각 아이템마다 `grid-area` 속성을 주어 영역을 정한다

- header의 row 영역은 1번째 라인부터 2번째 라인까지, column 영역은 1번째 라인에서 4번째 라인까지의 범위를 차지하게 한다.
- left-sidebar의 row 영역은 1번째 라인부터 2번째 라인까지, column 영역은 1번째 라인에서 4번째 라인까지 범위를 차지하게 한다.
- main-content의 row 영역은 2번째 라인부터 3번째 라인까지, column 영역도 2번째 라인에서 3번째 라인까지 범위를 차지하게 한다.
- right-sidebar의 row 영역은 2번째 라인부터 3번째 라인까지, column 영역은 3번째 라인에서 4번째 라인까지 범위를 차지하게 한다.

![소희님3번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%86%8C%ED%9D%AC%EB%8B%983%EB%B2%88.png)

- footer의 row 영역은 3번째 라인부터 4번째 라인까지, column 영역은 1번째 라인에서 4번째 라인까지 범위를 차지하게 하여 레이아웃을 완성한다.

![소희님4번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%86%8C%ED%9D%AC%EB%8B%984%EB%B2%88.png)

```css
.header {
  grid-area: 1/1/2/4;
}

.left-sidebar {
  grid-area: 2/1/3/2;
}

.main-content {
  grid-area: 2/2/3/3;
}

.right-sidebar {
  grid-area: 2/3/3/4;
}

.footer {
  grid-area: 3/1/4/4;
}
```

## 2) 변형 성배 레이아웃

`grid-template-area` 속성을 사용하여 변형된 성배 레이아웃을 만들어 보려고 한다.

![재준님1번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%981%EB%B2%88.png)

```html
<div class="container">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="content1">Content</div>
  <div class="content2">Content</div>
  <div class="footer">Footer</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar content1 content2'
    'sidebar footer footer';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 22px;
  gap: 0.5rem;
}

/* layout */

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.content1 {
  grid-area: content1;
}

.content2 {
  grid-area: content2;
}

.footer {
  grid-area: footer;
}
```

grid 속성값들을 사용하지 않았을 때 아이템들은 HTML 마크업 순서대로 배치가 된다.

![재준님2번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%982%EB%B2%88.png)

grid가 적용되는 컨테이너 에 `display:grid` 속성을 추가한다. 또한 `grid-template-areas`속성을 이용하여 변형된 성배레이아웃을 만들어볼 예정이므로 `grid-template-areas` 속성에 우리가 구성하고자 하는 레이아웃을 단어들로서 표현해준다.

![재준님3번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%983%EB%B2%88.png)

```css
.container {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar content1 content2'
    'sidebar footer footer';
  padding: 22px;
}
```

현재 레이아웃은 임의의 3x3 공간을 가지고 있다고 생각하자. 이에 따라 컨테이너의 자식요소들의 너비를 설정해 준다. `grid-template-columns` 의 비율은 1:1:1, `grid-template-rows` 의 비율은 1:3:1로 설정하여 2번째 컬럼이자 컨텐츠 요소들의 비율을 키워보도록 작성한다.

![재준님4번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%984%EB%B2%88.png)

```css
.container {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar content1 content2'
    'sidebar footer footer';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 22px;
}
```

`gap: 0.5rem;`을 주어 아이템 사이의 간격을 설정해준다.

![재준님5번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%985%EB%B2%88.png)

```css
.container {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar content1 content2'
    'sidebar footer footer';
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  gap: 0.5rem;
  padding: 22px;
}
```

header 공간의 row는 header 만 차지하므로 `grid-area` 속성을 이용하여 `grid-template-area` 의 할당된 부분을 적용한다.

![재준님6번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%986%EB%B2%88.png)

```css
.header {
  grid-area: header;
}
```

위와 마찬가지로 sidebar, content \* 2, footer 부분을 나머지 `grid-template-area` 에 할당된 부분에 맞추어 구역을 지정한다.

![재준님7번.png](grid%20%E1%84%82%E1%85%A9%E1%84%80%E1%85%A1%E1%84%83%E1%85%A1%2056761ca0071340188a08cbe2de39cbe6/%EC%9E%AC%EC%A4%80%EB%8B%987%EB%B2%88.png)

```css
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.content1 {
  grid-area: content1;
}
.content2 {
  grid-area: content2;
}
.footer {
  grid-area: footer;
}
```
