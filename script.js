/**
 * script.js — Fichier JavaScript principal
 * Gère : slider, navigation de sections, CV, portfolio, menu mobile, et chatbot.
 */

document.addEventListener("DOMContentLoaded", function () {

    /*========================================
      1. RÉFÉRENCES GLOBALES
      On récupère tous les éléments du DOM dont on aura besoin.
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
    const chatCloseBtn = chatbox.querySelector(".chatbox-close");

    let currentSlide = 0;  // index de la slide actuellement visible

    /*========================================
      2. SLIDER AUTOMATIQUE
      Fait défiler les images toutes les 3 secondes.
    ========================================*/
    function advanceSlider() {
        // on masque toutes les slides
        slides.forEach(s => s.classList.remove("active"));
        // on passe à la suivante (boucle circulaire)
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }
    // démarrer le slider en continu
    const slideInterval = setInterval(advanceSlider, 3000);

    /*========================================
      3. AFFICHER LES SLIDES (Accueil)
      Restaure l’affichage du slider et masque les sections de contenu.
    ========================================*/
    function showSlides() {
        // masquer toutes les sections
        contentSections.forEach(sec => sec.classList.add("hidden"));
        // afficher le container de slides
        slidesContainer.classList.remove("hidden");
    }

    /*========================================
      4. NAVIGATION ENTRE SECTIONS
      showSection(id) masque tout et affiche la section ciblée.
    ========================================*/
    function showSection(id) {
        // masquer slider + toutes les sections
        slidesContainer.classList.add("hidden");
        contentSections.forEach(sec => sec.classList.add("hidden"));

        // afficher la section demandée si elle existe
        const target = document.getElementById(id);
        if (target) {
            target.classList.remove("hidden");
        } else {
            console.warn("Section introuvable :", id);
        }
    }

    /*========================================
      5. AFFICHAGE PARTIES DU CV
      showCVPart(id) masque tous les blocs CV et n’affiche que le ciblé.
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
      Toggle du sous-menu “Voir mes créations”.
    ========================================*/
    if (portfolioToggle && submenu) {
        portfolioToggle.addEventListener("click", () => {
            submenu.classList.toggle("show");
            submenu.classList.toggle("hidden");
        });
    }

    /*========================================
      7. MENU HAMBURGER MOBILE
      Toggle des listes nav-links et nav-right.
    ========================================*/
    if (toggleMenuBtn) {
        toggleMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            navRight.classList.toggle("show");
        });
    }

    /*========================================
      8. EXPOSITION GLOBALE POUR ONCLICK INLINE
      Permet aux attributs onclick dans le HTML d’appeler ces fonctions.
    ========================================*/
    window.showSlides = showSlides;
    window.showSection = showSection;
    window.showCVPart = showCVPart;

});
