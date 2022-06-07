const btnDrawer = document.querySelector('.btn-drawer');
const asideArea = document.querySelector('.aside-area');

const toggleDrawer = () => {
  btnDrawer.classList.toggle('toggle');
  asideArea.classList.toggle('toggle');
}

const moveDrawerBtn = () => {
  if (body.classList.contains('scroll-down')) {
    btnDrawer.classList.add('scroll-down');
  }
  if (body.classList.contains('scroll-up')) {
    btnDrawer.classList.remove('scroll-down');
  }
}

btnDrawer.addEventListener('click', toggleDrawer);
window.addEventListener('scroll', moveDrawerBtn);


// 스크롤 스파이 
const drawerTit = document.querySelectorAll('.focus-tit');
const contTit = document.querySelectorAll('.cont-tit');


const checkScroll = () => {
  for(let i = 0; i < contTit.length; i++) {
    console.log(contTit[i].offsetTop, contTit[i+1].offsetTop, window.pageYOffset);
  }
}
  
const scrollSpy = () => {
  let pos = window.pageYOffset;
  let fullHeight = document.body.scrollHeight;

  for(let i = 0; i < contTit.length; i++) {
    for(let i = 0; i < drawerTit.length; i++) {
      let target = contTit[i].offsetTop;
      let nextTarget = (contTit[i + 1]) ? contTit[i + 1].offsetTop : fullHeight;
      if (target - pos < 20 && pos < nextTarget - 10) {
        drawerTit[i].classList.add('scroll-spy');
      } else {
        drawerTit[i].classList.remove('scroll-spy');
      }
    }
  }
};

// window.addEventListener('scroll', checkScroll);
window.addEventListener('DOMContentLoaded', scrollSpy);
window.addEventListener('scroll', scrollSpy);
