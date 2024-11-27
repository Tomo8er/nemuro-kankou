let slideIndex = 1;
let autoPlayInterval;

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let indicators = document.getElementsByClassName("indicator");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("active");
    }

    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("active");
    indicators[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function toggleAutoPlay() {
    const button = document.getElementById('playPauseButton');
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        button.innerHTML = '&#9658;';
    } else {
        autoPlayInterval = setInterval(() => plusSlides(1), 5000);
        button.innerHTML = '&#10074;&#10074;';
    }
}

showSlides(slideIndex);
toggleAutoPlay();
