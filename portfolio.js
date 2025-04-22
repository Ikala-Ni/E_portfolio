document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour afficher ou cacher le menu hamburger
    function toggleMenu() {
        const submenu = document.getElementById('submenu');
        submenu.classList.toggle('hidden');  // Ajoute ou retire la classe 'hidden'
    }

    // Associe le bouton menu à la fonction
    const menuToggleBtn = document.querySelector(".menu-toggle");
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener("click", toggleMenu);
    }

    // Affiche la catégorie choisie (photos ou vidéos)
    window.showCategory = function (category) {
        const photo = document.getElementById('photo-category');
        const video = document.getElementById('video-category');

        if (category === 'photo') {
            photo.classList.remove('hidden');
            video.classList.add('hidden');
        } else {
            photo.classList.add('hidden');
            video.classList.remove('hidden');
        }

        // Cache le menu une fois un choix fait
        const submenu = document.getElementById('submenu');
        if (submenu) submenu.classList.add('hidden');
    };

    // Mode plein écran
    window.openFullscreen = function (media) {
        const overlay = document.getElementById('fullscreen-overlay');
        const container = document.getElementById('fullscreen-content');
        container.innerHTML = ""; // on vide le contenu existant

        const clone = media.cloneNode(true);
        clone.removeAttribute('onclick');
        clone.controls = true;
        container.appendChild(clone);

        overlay.classList.remove('hidden');  // Affiche l'overlay
    };

    // Fermer plein écran
    window.closeFullscreen = function () {
        const overlay = document.getElementById('fullscreen-overlay');
        const container = document.getElementById('fullscreen-content');

        overlay.classList.add('hidden');  // Cache l'overlay
        container.innerHTML = "";
    };
});
