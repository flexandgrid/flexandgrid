const btnDrawer = document.querySelector('.btn-drawer');
const asideArea = document.querySelector('.aside-area');

btnDrawer.addEventListener('click', () => {
  asideArea.classList.toggle('toggle');
})

// 스크롤 스파이 
const drawerTit = document.querySelectorAll('.focus-tit');
const contTit = document.querySelectorAll('.cont-tit');


const checkScroll = () => {
  for(let i = 0; i < contTit.length; i++) {
    // 단위가 너무 섬세해서 스무스한 스크롤 움직임과 맞지 않음 
    // console.log(window.pageYOffset + contTit[i].getBoundingClientRect().top, window.pageYOffset);
    console.log(contTit[i].offsetTop, window.pageYOffset);
  }
}
  
const scrollSpy = () => {
  // filter, map, forEach 등을 연이어 쓰는 거보다 for문 쓰는게 성능에 좋다고 함 
  for(let i = 0; i < contTit.length; i++) {
    for(let i = 0; i < drawerTit.length; i++) {
      if(contTit[i].offsetTop + 300  == window.pageYOffset && contTit[i].textContent == drawerTit[i].textContent) {
        // drawerTit[i].style.color = 'red';
        drawerTit[i].classList.add('scroll-spy');
      } else {
        drawerTit[i].classList.remove('scroll-spy');
      }
    }
  }
};

// window.addEventListener('scroll', checkScroll);
window.addEventListener('scroll', scrollSpy);