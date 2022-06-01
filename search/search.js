const searchInput = document.querySelector(".search-input");
const searchModal = document.querySelector(".modal-history");

const searchBtn = document.querySelector(".search-btn");
const searchDataDeleteBtn = document.querySelector(".btn-del-all");

const searchData = localStorage.getItem("searchHistoryData");

let searchHistory = [];
if (searchData !== null) {
  searchHistory = JSON.parse(searchData);
}

const searchHistoryList = document.querySelector(".list-history");

const searchItem = document.querySelectorAll(".itemwrap-search");
const searchText = document.querySelector(".text-search");
const searchResultCount = document.querySelector(".text-search-count");
const searchTitles = document.querySelectorAll(".tit-search");
const searchDescriptions = document.querySelectorAll(".desc-search");

const URLSearch = new URLSearchParams(location.search);
const searchQuery = URLSearch.get("q");

searchText.innerText = `Results for "${searchQuery}"`;
searchResultCount.innerText = `Showing ${searchItem.length} results`;

searchInput.addEventListener("click", () => {
  searchModal.classList.add("clicked");
  createHistory();
});

const removeChildAll = (ele) => {
  while (ele.hasChildNodes()) {
    ele.removeChild(ele.firstChild);
  }
};

document.addEventListener("click", (e) => {
  if (
    e.target.classList.value !== "search-input" &&
    e.target.classList.value !== "btn-del" &&
    e.target.classList.value !== "btn-del-all"
  ) {
    searchModal.classList.remove("clicked");
  }

  if (e.target.classList.value == "btn-del") {
    e.preventDefault();
    const inText = e.target.previousSibling.innerText;
    searchHistory = searchHistory.filter((text) => {
      return text !== inText;
    });
    localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
    createHistory();
  }

  if (e.target.classList.value == "list-item") {
    touchList(e.target.firstChild.innerText);
  }
});

const touchList = (touchListText) => {
  if (searchHistory.includes(touchListText)) {
    searchHistory = searchHistory.filter((text) => {
      return text !== touchListText;
    });
    searchHistory.unshift(touchListText);
    localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
  }
};

searchBtn.addEventListener("click", () => {
  if (!searchHistory.includes(searchInput.value) && searchInput.value) {
    if (searchHistory.length > 4) {
      searchHistory.pop();
      searchHistory.unshift(searchInput.value);
    } else {
      searchHistory.unshift(searchInput.value);
    }
  } else if (searchHistory.includes(searchInput.value)) {
    searchHistory = searchHistory.filter((text) => {
      return text !== searchInput.value;
    });
    searchHistory.unshift(searchInput.value);
  }
  localStorage.setItem("search", searchInput.value);
  localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
  location.href = `http://${location.host}/search/`;
});

searchDataDeleteBtn.addEventListener("click", () => {
  searchHistory = [];
  localStorage.setItem("searchHistoryData", JSON.stringify(searchHistory));
  createHistory();
});

const createHistory = () => {
  removeChildAll(searchHistoryList);
  if (searchHistory.length > 0) {
    searchHistory.forEach((v) => {
      const searchList = document.createElement("li");
      const listItem = document.createElement("a");

      const serachText = document.createElement("strong");
      serachText.appendChild(document.createTextNode(v));

      const deleteBtn = document.createElement("button");
      const deleteImage = document.createElement("img");

      listItem.setAttribute("class", "list-item");
      listItem.setAttribute("href", `http://${location.host}/flexandgrid/search/?q=${v}`);
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

window.addEventListener('DOMContentLoaded', () => {
  for (let title of searchTitles) {
    if (title.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
      title.closest('li').style.display = 'block';
    }
  }
  for (let desc of searchDescriptions) {
    if (desc.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
      desc.closest('li').style.display = 'block';
    }
  }
})
