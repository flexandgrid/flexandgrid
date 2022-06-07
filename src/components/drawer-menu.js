const btnDrawer = document.querySelector('.btn-drawer');
const asideArea = document.querySelector('.aside-area');

btnDrawer.addEventListener('click', () => {
  asideArea.classList.toggle('toggle');
})