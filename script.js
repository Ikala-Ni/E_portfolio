document.addEventListener("DOMContentLoaded", function () {

    // Slides
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlides() {
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById('slides').style.display = 'block';
    }

    function showSection(id) {
        console.log("Afficher la section :", id);
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.add('hidden'));
        document.getElementById('slides').style.display = 'none';

        const section = document.getElementById(id);
        if (section) {
            section.classList.remove('hidden');
        } else {
            console.warn("Section introuvable :", id);
        }
    }


    // Défilement automatique des slides
    setInterval(() => {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }, 3000);

    // Rendre la fonction accessible depuis les boutons
    window.showSection = showSection;
    window.showSlides = showSlides;
    window.showCVPart = showCVPart;

    const chatTrigger = document.getElementById('chat-trigger');
    const chatbox = document.getElementById('chatbox');

    if (chatTrigger && chatbox) {
        chatTrigger.addEventListener('click', () => {
            chatbox.classList.toggle('hidden');
        });
    }
});