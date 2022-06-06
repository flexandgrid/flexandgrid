const headerArea = document.querySelector(".gnb-header");
const cheatsheetModal = document.querySelector(".modal-menu");
const searchModal = document.querySelector(".modal-history");
const pageBody = document.querySelector("body");
const upBtn = document.querySelector(".btn-up");

let currentMode = localStorage.getItem("darkmode");
let isDark = false;

const checkDarkMode = () => {
  if (currentMode == "true") {
    isDark = true;
    headerArea.classList.add("on");
    cheatsheetModal.classList.add("on");
    searchModal.classList.add("on");
    pageBody.classList.add("on");
    upBtn.classList.add("on");
  } else {
    isDark = false;
    headerArea.classList.remove("on");
    cheatsheetModal.classList.remove("on");
    searchModal.classList.remove("on");
    pageBody.classList.remove("on");
    upBtn.classList.remove("on");
  }
};
checkDarkMode();

const handleDarkMode = () => {
  headerArea.classList.toggle("on");
  cheatsheetModal.classList.toggle("on");
  searchModal.classList.toggle("on");
  pageBody.classList.toggle("on");
  upBtn.classList.toggle("on");

  isDark = !isDark;
  localStorage.setItem("darkmode", isDark);
};

const darkmodeBtn = document.querySelector(".darkmode-btn");
darkmodeBtn.addEventListener("click", handleDarkMode);
