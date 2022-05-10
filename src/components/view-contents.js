const showingClass = "showing";
const firstSlide = document.querySelector(".grid-result:first-child");
firstSlide.classList.add(showingClass)
function slide() {
    const currentSlide = document.querySelector(`.${showingClass}`);
    if (currentSlide) {
        currentSlide.classList.remove(showingClass);
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            nextSlide.classList.add(showingClass);
        } else {
            firstSlide.classList.add(showingClass);
        }
    } else {
        firstSlide.classList.add(showingClass);
    }
}

slide();
setInterval(slide, 3000);