
/**
 * script.js — principal
 * Gère slider, sections, CV, portfolio, menu mobile, chatbot.
 */
document.addEventListener("DOMContentLoaded", function () {

    /* 1. RÉFÉRENCES GLOBALES */
    const slidesContainer = document.getElementById("slides");
    const slides = Array.from(document.querySelectorAll(".slide"));
    const contentSections = Array.from(document.querySelectorAll(".content-section"));
    const cvBlocks = Array.from(document.querySelectorAll(".cv-block"));
    const portfolioToggle = document.querySelector(".portfolio-menu .menu-toggle");
    const submenu = document.getElementById("submenu");
    const toggleMenuBtn = document.querySelector(".menu-toggle");      /* ← updated selector */
    const navLinks = document.querySelector(".nav-links");
    const navRight = document.querySelector(".nav-right");
    const chatTrigger = document.getElementById("chat-trigger");
    const chatbox = document.getElementById("chatbox");
    const chatCloseBtn = chatbox?.querySelector(".chatbox-close");

    let currentSlide = 0;

    /* 2. SLIDER AUTOMATIQUE */
    function advanceSlider() {
        slides.forEach(s => s.classList.remove("active"));
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }
    setInterval(advanceSlider, 3000);

    /* 3. showSlides() */
    function showSlides() {
        contentSections.forEach(sec => sec.classList.add("hidden"));
        slidesContainer.classList.remove("hidden");

        // Fermer le menu mobile si ouvert
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("show");
            navRight.classList.remove("show");
        }
    }

    /* 4. showSection(id) */
    function showSection(id) {
        slidesContainer.classList.add("hidden");
        contentSections.forEach(sec => sec.classList.add("hidden"));
        const target = document.getElementById(id);
        if (target) target.classList.remove("hidden");

        // Fermer le menu mobile si ouvert
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("show");
            navRight.classList.remove("show");
        }
    }

    /* 5. showCVPart(id) */
    function showCVPart(id) {
        cvBlocks.forEach(b => b.classList.add("hidden"));
        const block = document.getElementById(id);
        if (block) block.classList.remove("hidden");
    }

    /* 6. Portfolio toggle */
    if (portfolioToggle && submenu) {
        portfolioToggle.addEventListener("click", () => {
            submenu.classList.toggle("show");
            submenu.classList.toggle("hidden");
        });
    }

    /* 7. Hamburger mobile toggle */
    if (toggleMenuBtn) {
        toggleMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");   /* ← affiche/masque mobile nav */
            navRight.classList.toggle("show");
        });
    }

    /* 8. Expose functions globally */
    window.showSlides = showSlides;
    window.showSection = showSection;

});
