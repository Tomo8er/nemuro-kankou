// Cookie Popup
document.addEventListener('DOMContentLoaded', function () {
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookieButton = document.getElementById('accept-cookie');

    if (!localStorage.getItem('cookieAccepted')) {
        cookiePopup.style.display = 'flex';
    }

    acceptCookieButton.addEventListener('click', function () {
        localStorage.setItem('cookieAccepted', 'true');
        cookiePopup.style.display = 'none';
    });
});


//上部に戻る
window.onscroll = function() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


//フェードイン
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));


//iframeの幅
const iframe = document.querySelector('iframe'); 
function createButton(text, onClick) { 
    const button = document.createElement('button'); 
    button.textContent = text; 
    button.style.margin = '5px'; 
    button.style.padding = '10px 15px'; 
    button.style.fontSize = '14px'; 
    button.style.backgroundColor = '#007bff'; 
    button.style.color = 'white'; 
    button.style.border = 'none'; 
    button.style.borderRadius = '5px'; 
    button.style.cursor = 'pointer'; 
    button.style.transition = 'background-color 0.3s ease'; 
    button.addEventListener('mouseover', () => { button.style.backgroundColor = '#0056b3'; }); 
    button.addEventListener('mouseout', () => { button.style.backgroundColor = '#007bff'; }); 
    button.addEventListener('click', onClick); 
    return button; 
}
const increaseButton = createButton('幅を広げる', () => { const currentWidth = parseInt(iframe.width, 10); iframe.width = currentWidth + 50; }); 
const decreaseButton = createButton('幅を狭める', () => { const currentWidth = parseInt(iframe.width, 10); if (currentWidth > 100) { iframe.width = currentWidth - 50; } }); 
const buttonContainer = document.createElement('div'); 
buttonContainer.style.display = 'flex'; 
buttonContainer.style.gap = '10px'; 
buttonContainer.style.marginTop = '10px'; 
buttonContainer.appendChild(increaseButton); 
buttonContainer.appendChild(decreaseButton); 
iframe.insertAdjacentElement('afterend', buttonContainer);