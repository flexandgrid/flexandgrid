/*
검색 시 검색한 단어 표시, 검색 결과 갯수 표시, 검색 시 데이터 저장, 모달 표시를 작동만 하게끔 만들어두었습니다.
러프하게 구현했기 때문에 이해를 위해 간단하게 주석을 추가해두었습니다. 확인 후 개선의견 주세요 !
*/

const searchInput = document.querySelector(".search-input");
const searchModal = document.querySelector(".modal-history");

//검색버튼
const searchBtn = document.querySelector(".search-btn");

//모달 전체삭제 버튼
const searchDataDeleteBtn = document.querySelector(".btn-del-all");

//검색한 데이터 불러오기
const searchData = localStorage.getItem("searchHistoryData");

//데이터가 있으면 배열에 넣어줌
let searchHistory = [];
if (searchData !== null) {
  searchHistory = JSON.parse(searchData);
}

const searchHistoryList = document.querySelector(".list-history");

const searchItem = document.querySelectorAll(".itemwrap-search");
const searchText = document.querySelector(".text-search");
const searchResultCount = document.querySelector(".text-search-count");

//검색한 텍스트 표시
searchText.innerText = `Results for "${localStorage.getItem("search")}"`;
//아이템 갯수 표시
searchResultCount.innerText = `Showing ${searchItem.length} results`;

//검색창이 눌리면 모달창이 노출
searchInput.addEventListener("click", () => {
  searchModal.classList.add("clicked");
  removeChildAll(searchHistoryList);
  createHistory();
});

const removeChildAll = (ele) => {
  while (ele.hasChildNodes()) {
    ele.removeChild(ele.firstChild);
  }
};

document.addEventListener("click", (e) => {
  //검색창 말고 다른 곳을 클릭하면 모달 사라짐
  if (e.target.classList.value !== "search-input") {
    if (e.target.classList.value !== "btn-del")
      searchModal.classList.remove("clicked");
  }

  //모달에 있는 X버튼 터치 시 해당 아이템 삭제
  if (e.target.classList.value == "btn-del") {
    const inText = e.target.previousSibling.innerText;
    searchHistory = searchHistory.filter((text) => {
      return text !== inText;
    });
    localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
    removeChildAll(searchHistoryList);
    createHistory();
  }
});

searchBtn.addEventListener("click", () => {
  if (!searchHistory.includes(searchInput.value) && searchInput.value) {
    if (searchHistory.length > 4) {
      searchHistory.pop();
      searchHistory.unshift(searchInput.value);
    } else {
      searchHistory.unshift(searchInput.value);
    }
  }
  //검색어 저장
  localStorage.setItem("search", searchInput.value);
  localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
  location.href = `http://${location.host}/search/index.html`;
});

searchDataDeleteBtn.addEventListener("click", () => {
  searchHistory = [];
  localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
});

//모달 검색어리스트 생성
const createHistory = () => {
  if (searchHistory.length > 0) {
    searchHistory.forEach((v) => {
      const searchList = document.createElement("li");
      const listItem = document.createElement("a");

      const serachText = document.createElement("strong");
      serachText.appendChild(document.createTextNode(v));

      const deleteBtn = document.createElement("button");
      const deleteImage = document.createElement("img");

      listItem.setAttribute("class", "list-item");
      serachText.setAttribute("class", "txt-item");
      deleteBtn.setAttribute("class", "btn-del");
      deleteImage.setAttribute("src", "../src/assets/images/icon-close.svg");
      deleteImage.setAttribute("alt", "삭제버튼");
      deleteImage.setAttribute("class", "close-img");

      deleteBtn.appendChild(deleteImage);

      listItem.appendChild(serachText);
      listItem.appendChild(deleteBtn);

      searchList.appendChild(listItem);

      searchHistoryList.appendChild(searchList);
    });
  }
};
