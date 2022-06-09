const URLSearch = new URLSearchParams(location.search);
const searchQuery = URLSearch.get("q");
const searchText = document.querySelector(".text-search");
const searchResultCount = document.querySelector(".text-search-count");
let searchItem;

if (searchQuery) {
  searchText.innerText = `Results for "${searchQuery}"`;
}

// fetch
const contents = [];
const fetchContents = async (searchQuery) => {
  try {
    const dataFlex = await (
      await fetch("https://flexngrid.com/src/md/flex.md")
    ).text();
    const dataGrid = await (
      await fetch("https://flexngrid.com/src/md/grid.md")
    ).text();
    contents.push(
      dataFlex
        .split("\n")
        .filter((v) => v.includes(`#`))
        .map((v) => v.toLocaleLowerCase())
        .filter((v) => v.includes(searchQuery.toLowerCase())),
      dataGrid
        .split("\n")
        .filter((v) => v.includes(`#`))
        .map((v) => v.toLocaleLowerCase())
        .filter((v) => v.includes(searchQuery.toLowerCase()))
    );
    createList(contents);
  } catch (e) {
    console.log(e);
  }
};
fetchContents(searchQuery);

const listSearch = document.querySelector(".list-search");
const createList = (contents) => {
  contents.forEach((v, i) => {
    v.forEach((value) => {
      //정규식으로 텍스트남기기(임시)
      value = value.replace(/[#0-9.]/g, "");
      value = value.replace(/^\s+|\s+$/g, "");

      //html 기준인 경우 태그 날리는 정규식
      //value = value.replace(/<\/?[^>]+(>|$)/g, "");

      const searchListItem = document.createElement("li");
      searchListItem.setAttribute("class", "itemwrap-search");

      const searchListItemLink = document.createElement("a");
      searchListItemLink.setAttribute("href", `${i == 0 ? "/flex" : "/grid"}`);
      searchListItemLink.setAttribute("class", "item-search");

      const searchRoute = document.createElement("span");
      searchRoute.setAttribute("class", "route-search");
      searchRoute.appendChild(
        document.createTextNode(i == 0 ? `flex > ${value}` : `grid > ${value}`)
      );

      const searchTitle = document.createElement("strong");
      searchTitle.setAttribute("class", "tit-search");
      searchTitle.appendChild(document.createTextNode(value));

      const searchDesc = document.createElement("p");
      searchDesc.setAttribute("class", "desc-search");
      searchDesc.appendChild(document.createTextNode(value));

      searchListItemLink.appendChild(searchRoute);
      searchListItemLink.appendChild(searchTitle);
      searchListItemLink.appendChild(searchDesc);

      searchListItem.appendChild(searchListItemLink);
      listSearch.appendChild(searchListItem);
    });
  });
  searchItem = document.querySelectorAll(".itemwrap-search");
  searchResultCount.innerText = `Showing ${searchItem.length} results`;
};

// 삭제 예정
const searchTitles = document.querySelectorAll(".tit-search");
const searchDescriptions = document.querySelectorAll(".desc-search");
window.addEventListener("DOMContentLoaded", () => {
  for (let title of searchTitles) {
    if (
      title.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    ) {
      title.closest("li").style.display = "block";
    }
  }
  for (let desc of searchDescriptions) {
    if (
      desc.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    ) {
      desc.closest("li").style.display = "block";
    }
  }
});
