const URLSearch = new URLSearchParams(location.search);
const searchQuery = URLSearch.get('q');
const searchText = document.querySelector('.text-search');
const searchResultCount = document.querySelector('.text-search-count');
const searchItem = document.querySelectorAll('.itemwrap-search');

if (searchQuery) {
  searchText.innerText = `Results for "${searchQuery}"`;
  searchResultCount.innerText = `Showing ${searchItem.length} results`;
}


// fetch
const contents = [];
const fetchContents = async () => {
  try {
    const dataFlex = await(await fetch('https://flexngrid.com/src/md/flex.md')).text();
    const dataGrid = await(await fetch('https://flexngrid.com/src/md/grid.md')).text();
    contents.push(dataFlex, dataGrid);
  } catch (e) {
    console.log(e);
  }
}

const dummy = ["flex", "grid"];
const dummydesc = ["플렉스에 대한 설명", "그리드에 대한 설명"];
const listSearch = document.querySelector(".list-search");
const createList = () => {
    dummy.map((v, i) => {
        const searchListItem = document.createElement("li");
        searchListItem.setAttribute("class", "itemwrap-search");

        const searchListItemLink = document.createElement("a");
        searchListItemLink.setAttribute("href", "javascript:void(0)");
        searchListItemLink.setAttribute("class", "item-search");

        const searchRoute = document.createElement("span");
        searchRoute.setAttribute("class", "route-search");
        searchRoute.appendChild(document.createTextNode(v));

        const searchTitle = document.createElement("strong");
        searchTitle.setAttribute("class", "tit-search");
        searchTitle.appendChild(document.createTextNode(v));

        const searchDesc = document.createElement("p");
        searchDesc.setAttribute("class", "desc-search");
        searchDesc.appendChild(document.createTextNode(dummydesc[i]));

        searchListItemLink.appendChild(searchRoute);
        searchListItemLink.appendChild(searchTitle);
        searchListItemLink.appendChild(searchDesc);

        searchListItem.appendChild(searchListItemLink);
        listSearch.appendChild(searchListItem);
    });
};

createList();




// 삭제 예정
const searchTitles = document.querySelectorAll('.tit-search');
const searchDescriptions = document.querySelectorAll('.desc-search');
window.addEventListener('DOMContentLoaded', () => {
  for (let title of searchTitles) {
    if (
      title.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    ) {
      title.closest('li').style.display = 'block';
    }
  }
  for (let desc of searchDescriptions) {
    if (
      desc.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    ) {
      desc.closest('li').style.display = 'block';
    }
  }
});
