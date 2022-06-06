// constants
const btn_mobile_menu = document.getElementById('btn_mobile_menu');
const modal_mobile_menu = document.getElementById('modal_mobile_menu');
const subtitle = modal_mobile_menu.querySelectorAll('.title-mobile > ul')
const mobile_tittle_arrow = modal_mobile_menu.querySelectorAll(".mobile-tittle-arrow")
const btn_mobile_h3 = modal_mobile_menu.querySelectorAll('.btn-mobile-title > h3');
const title = modal_mobile_menu.querySelectorAll('.title-mobile');
const dim_mobile = document.getElementById('dim_mobile');

//메뉴창 보이기
btn_mobile_menu.addEventListener('click', ()=>{
    modal_mobile_menu.classList.add('on');
    dim_mobile.classList.add('on');
});
//메뉴창 닫기
window.addEventListener('click',(el)=>{
    if (el.target.className === 'dim-mobile on') {
        modal_mobile_menu.classList.remove('on');
        dim_mobile.classList.remove('on');
    }
})
//하위 메뉴 열고 닫기
title.forEach((e,i)=>{
    e.addEventListener('click',(el)=>{
        if(el.target.parentElement.className === "btn-mobile-title" && subtitle[i].className === "on"){
            subtitle[i].classList.remove('on');
            btn_mobile_h3[i].style.color="#000";
        } else {
            subtitle[i].classList.add('on');
            btn_mobile_h3[i].style.color="#F6866A";
        }
        if(el.target.parentElement.className === "btn-mobile-title" ){
            mobile_tittle_arrow[i].classList.toggle('on');
        }
    })
})