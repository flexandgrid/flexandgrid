const btnUp = document.querySelector('.btn-up');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    btnUp.style.display = "block"
  } else {
    btnUp.style.display = "none"
  }
})

btnUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})