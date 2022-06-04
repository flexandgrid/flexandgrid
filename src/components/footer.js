const footerArea = document.querySelector(".footer-area");
const imgLogo = document.querySelector(".img-logo");

function changeSrc() {
  if (footerArea.classList.contains("on")) {
    imgLogo.src = "../assets/images/logo-gray-darkmode.svg";
  }
}
changeSrc();
