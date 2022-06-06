const headerArea = document.querySelector(".gnb-header");
const searchModal = document.querySelector(".modal-history");
const pageBody = document.querySelector("body");
const upBtn = document.querySelector(".btn-up");

let currentMode = localStorage.getItem("darkmode");
let isDark = false;

const checkDarkMode = () => {
  if (currentMode == "true") {
    isDark = true;
    headerArea.classList.add("on");
    searchModal.classList.add("on");
    pageBody.classList.add("on");
    upBtn.classList.add("on");
  } else {
    isDark = false;
    headerArea.classList.remove("on");
    searchModal.classList.remove("on");
    pageBody.classList.remove("on");
    upBtn.classList.remove("on");
  }
};
checkDarkMode();

const handleDarkMode = () => {
  headerArea.classList.toggle("on");
  searchModal.classList.toggle("on");
  pageBody.classList.toggle("on");
  upBtn.classList.toggle("on");

  isDark = !isDark;
  localStorage.setItem("darkmode", isDark);
};

const darkmodeBtn = document.querySelector(".darkmode-btn");
darkmodeBtn.addEventListener("click", handleDarkMode);
