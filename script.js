/**
 * script.js — Fichier JavaScript principal
 * Gère : slider, navigation de sections, CV, portfolio, menu mobile, et chatbot.
 */

document.addEventListener("DOMContentLoaded", function () {

    /*========================================
      1. RÉFÉRENCES GLOBALES
    ========================================*/
    const slidesContainer = document.getElementById("slides");
    const slides = Array.from(document.querySelectorAll(".slide"));
    const contentSections = Array.from(document.querySelectorAll(".content-section"));
    const cvBlocks = Array.from(document.querySelectorAll(".cv-block"));
    const portfolioToggle = document.querySelector(".portfolio-menu .menu-toggle");
    const submenu = document.getElementById("submenu");
    const toggleMenuBtn = document.querySelector(".navbar .menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navRight = document.querySelector(".nav-right");
    const chatTrigger = document.getElementById("chat-trigger");
    const chatbox = document.getElementById("chatbox");
    const chatCloseBtn = chatbox?.querySelector(".chatbox-close"); // sécurisation si chatbox absent

    let currentSlide = 0;  // index de la slide actuellement visible

    /*========================================
      2. SLIDER AUTOMATIQUE
    ========================================*/
    function advanceSlider() {
        slides.forEach(s => s.classList.remove("active"));
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }
    const slideInterval = setInterval(advanceSlider, 3000);

    /*========================================
      3. AFFICHER LES SLIDES (Accueil)
    ========================================*/
    function showSlides() {
        contentSections.forEach(sec => sec.classList.add("hidden"));
        slidesContainer.classList.remove("hidden");
    }

    /*========================================
      4. NAVIGATION ENTRE SECTIONS
    ========================================*/
    function showSection(id) {
        slidesContainer.classList.add("hidden");
        contentSections.forEach(sec => sec.classList.add("hidden"));

        const target = document.getElementById(id);
        if (target) {
            target.classList.remove("hidden");
        } else {
            console.warn("Section introuvable :", id);
        }
    }

    /*========================================
      5. AFFICHAGE PARTIES DU CV
    ========================================*/
    function showCVPart(id) {
        cvBlocks.forEach(b => b.classList.add("hidden"));
        const block = document.getElementById(id);
        if (block) {
            block.classList.remove("hidden");
        }
    }

    /*========================================
      6. MENU DÉROULANT PORTFOLIO
    ========================================*/
    if (portfolioToggle && submenu) {
        portfolioToggle.addEventListener("click", () => {
            submenu.classList.toggle("show");
            submenu.classList.toggle("hidden");
        });
    }

    /*========================================
      7. MENU HAMBURGER MOBILE
    ========================================*/
    if (toggleMenuBtn) {
        toggleMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            navRight.classList.toggle("show");
        });
    }

    /*========================================
      8. EXPOSITION GLOBALE POUR ONCLICK INLINE
    ========================================*/
    window.showSlides = showSlides;
    window.showSection = showSection;
    window.showCVPart = showCVPart;

});
