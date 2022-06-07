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
