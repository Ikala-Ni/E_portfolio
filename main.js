/**
 * Gère les sections, le CV, le portfolio, le menu mobile, le chatbot, et l'initialisation vidéo.
 */
document.addEventListener("DOMContentLoaded", function () {

    /* 1. RÉFÉRENCES GLOBALES */
    const contentSections = Array.from(document.querySelectorAll(".content-section"));
    const cvBlocks = Array.from(document.querySelectorAll(".cv-block"));
    const portfolioToggle = document.querySelector(".portfolio-menu .menu-toggle");
    const submenu = document.getElementById("submenu");
    const toggleMenuBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navRight = document.querySelector(".nav-right");
    const chatTrigger = document.getElementById("chat-trigger");
    const chatbox = document.getElementById("chatbox");
    const chatCloseBtn = chatbox?.querySelector(".chatbox-close");

    /* 2. Afficher une section (et masquer les autres) */
    function showSection(id) {
        contentSections.forEach(sec => sec.classList.add('hidden'));
        const target = document.getElementById(id);
        if (target) {
            target.classList.remove('hidden');
            target.scrollIntoView({ behavior: 'smooth' });
        }
        closeMobileMenu();
    }

    /* 3. Fermer le menu mobile */
    function closeMobileMenu() {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove("show");
            navRight.classList.remove("show");
        }
    }

    /* 4. Afficher une partie du CV */
    function showCVPart(id) {
        cvBlocks.forEach(b => b.classList.add("hidden"));
        const block = document.getElementById(id);
        if (block) block.classList.remove("hidden");
    }

    /* 5. Gérer l'ouverture du sous-menu Portfolio */
    if (portfolioToggle && submenu) {
        portfolioToggle.addEventListener("click", () => {
            submenu.classList.toggle("show");
            submenu.classList.toggle("hidden");
        });
    }

    /* 6. Gérer le menu hamburger mobile */
    if (toggleMenuBtn) {
        toggleMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("show");
            navRight.classList.toggle("show");
        });
    }

    /* 7. Fonctions disponibles globalement */
    window.showSection = showSection;
    window.showCVPart = showCVPart;

    /* 8. Affichage de la section basée sur l'ancre URL */
    const initial = window.location.hash.substring(1);
    if (initial) {
        showSection(initial);
    }

    /* 9. Mise à jour dynamique lors de navigation via hash */
    window.addEventListener("hashchange", () => {
        const sec = window.location.hash.substring(1);
        showSection(sec);
    });

    /* 10. Démarrage vidéo avec son dans la section vidéo (si souhaité) */
    const sectionVideo = document.getElementById("video-section-player");
    const shouldPlayWithSound = sessionStorage.getItem("playVideoWithSound") === "true";

    if (window.location.hash === "#video-section" && sectionVideo) {
        sectionVideo.muted = !shouldPlayWithSound;
        sectionVideo.play().catch(err => {
            console.warn("Erreur de lecture vidéo :", err);
        });
    }

    sessionStorage.removeItem("playVideoWithSound");
});
