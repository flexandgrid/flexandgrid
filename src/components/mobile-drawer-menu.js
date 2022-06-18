const mobileMenuBtn = document.querySelector('.hamburger-container');
const mobileMenuArea = document.querySelector('.mobile-menu-area');
const mobileOverlay = document.querySelector('.menu-overlay');

function openMenuModalMobile() {
  if (!mobileMenuArea.classList.contains('clicked')) {
    mobileMenuArea.classList.add('clicked');
    mobileOverlay.classList.add('clicked');
    window.addEventListener('click', closeMenuModalMobile);
  }
}

mobileMenuBtn.addEventListener('click', openMenuModalMobile);

function closeMenuModalMobile(e) {
  if (e.target.className === 'overlay menu-overlay clicked') {
    mobileMenuArea.classList.remove('clicked');
    mobileOverlay.classList.remove('clicked');
    window.removeEventListener('click', closeMenuModalMobile);
  }
}

const mobileMenuToggle = document.querySelectorAll('.btn-drawer-menu-mobile');

const mobileToggleBtn = (e) => {
  e.target.classList.toggle('fold');
}

for(let i = 0; i < mobileMenuToggle.length; i++) {
  mobileMenuToggle[i].addEventListener('click', (e) => mobileToggleBtn(e));
}