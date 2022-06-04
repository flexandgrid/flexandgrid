const headerArea = document.querySelector(".gnb-header");
const searchModal = document.querySelector(".modal-history");
const pageBody = document.querySelector("body");
const upBtn = document.querySelector(".btn-up");

const handleDarkMode = () => {
  headerArea.classList.toggle("on");
  searchModal.classList.toggle("on");
  pageBody.classList.toggle("on");
  upBtn.classList.toggle("on");
};

const darkmodeBtn = document.querySelector(".darkmode-btn");
darkmodeBtn.addEventListener("click", handleDarkMode);