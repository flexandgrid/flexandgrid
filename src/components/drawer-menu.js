const btnDrawer = document.querySelector('.btn-drawer');
const asideArea = document.querySelector('.aside-area');
const aside = document.querySelector('.aside');
const PAGE_NAME = window.location.pathname.split('/')[1];

const toggleDrawer = () => {
  btnDrawer.classList.toggle('toggle');
  asideArea.classList.toggle('toggle');
  aside.classList.toggle('toggle');
};

const moveDrawerBtn = () => {
  if (body.classList.contains('scroll-down')) {
    btnDrawer.classList.add('scroll-down');
  }
  if (body.classList.contains('scroll-up')) {
    btnDrawer.classList.remove('scroll-down');
  }
};

btnDrawer.addEventListener('click', toggleDrawer);
window.addEventListener('scroll', moveDrawerBtn);

// 스크롤 스파이

const checkScroll = () => {
  for (let i = 0; i < contTit.length; i++) {
    console.log(
      contTit[i].offsetTop,
      contTit[i + 1].offsetTop,
      window.pageYOffset
    );
  }
};

const scrollSpy = (drawerTit, contTit) => {
  let pos = window.pageYOffset;
  let fullHeight = document.body.scrollHeight;

  for (let i = 0; i < contTit.length; i++) {
    for (let i = 0; i < drawerTit.length; i++) {
      let target = contTit[i].offsetTop;
      let nextTarget = contTit[i + 1] ? contTit[i + 1].offsetTop : fullHeight;
      if (target - pos < 20 && pos < nextTarget - 10) {
        drawerTit[i].classList.add('scroll-spy');
      } else {
        drawerTit[i].classList.remove('scroll-spy');
      }
    }
  }
};

const handleLoad = () => {
  const drawerTit = asideArea.querySelectorAll(`.btn-${PAGE_NAME} a`);
  const contTit = document.querySelectorAll(
    `.cont-${PAGE_NAME} h2, .cont-${PAGE_NAME} h3, .cont-${PAGE_NAME} h4`
  );
  if (drawerTit.length) {
    window.addEventListener('scroll', () => scrollSpy(drawerTit, contTit));
    window.removeEventListener('markdownParsed', handleLoad);
  }
};

// window.addEventListener('scroll', checkScroll);
window.addEventListener('markdownParsed', handleLoad);



const menuBtn = document.querySelectorAll('.btn-drawer-menu');

// 메뉴 드롭다운

const toggleBtn = (e) => {
  e.target.classList.toggle('fold');
}

for(let i = 0; i < menuBtn.length; i++) {
  menuBtn[i].addEventListener('click', (e) => toggleBtn(e));
}
