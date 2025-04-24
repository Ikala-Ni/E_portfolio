document.addEventListener("DOMContentLoaded", () => {
    // Références DOM
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const submenu = document.getElementById("submenu");

    // Toggle du menu (bouton ☰)
    if (toggleBtn && sidebar && submenu) {
        toggleBtn.addEventListener("click", () => {
            submenu.classList.toggle("hidden");
        });
    }

    // Fonction pour afficher une catégorie (photo ou vidéo)
    function showCategory(category) {
        // Cacher toutes les catégories
        const allCategories = document.querySelectorAll('.portfolio-category');
        allCategories.forEach(cat => cat.classList.add('hidden'));

        // Afficher la catégorie sélectionnée
        const selected = document.getElementById(`${category}-category`);
        if (selected) {
            selected.classList.remove('hidden');
        }

        // (Facultatif) Garder le menu visible
        const submenu = document.getElementById('submenu');
        if (submenu && submenu.classList.contains('hidden')) {
            submenu.classList.remove('hidden');
        }
    }

    // Affichage plein écran d'un média (image ou vidéo)
    window.openFullscreen = function (media) {
        const overlay = document.getElementById('fullscreen-overlay');
        const container = document.getElementById('fullscreen-content');

        if (!overlay || !container) return;

        container.innerHTML = "";

        // Cloner l’élément pour ne pas affecter l’original
        const clone = media.cloneNode(true);
        clone.removeAttribute('onclick');
        clone.controls = true;

        container.appendChild(clone);
        overlay.classList.remove('hidden');
    };

    // Fermer le mode plein écran
    window.closeFullscreen = function () {
        const overlay = document.getElementById('fullscreen-overlay');
        const container = document.getElementById('fullscreen-content');

        if (!overlay || !container) return;

        overlay.classList.add('hidden');
        container.innerHTML = "";
    };
});
