const btnDrawer = document.querySelector('.btn-drawer');
const asideArea = document.querySelector('.aside-area');

btnDrawer.addEventListener('click', () => {
  btnDrawer.classList.toggle('toggle');
  asideArea.classList.toggle('toggle');
});

window.addEventListener('scroll', () => {
  if (body.classList.contains('scroll-down')) {
    btnDrawer.classList.add('scroll-down');
  }
  if (body.classList.contains('scroll-up')) {
    btnDrawer.classList.remove('scroll-down');
  }
});
