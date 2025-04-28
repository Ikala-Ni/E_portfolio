// images.js - Corrige les chemins d'images PNG pour GitHub Pages

document.addEventListener("DOMContentLoaded", function () {
    // Parcourir toutes les balises <img>
    document.querySelectorAll('img').forEach(function (img) {
        // Si l'image est un PNG venant du dossier img/
        if (img.getAttribute('src') && img.getAttribute('src').includes('img/') && img.getAttribute('src').endsWith('.png')) {
            // Correction du chemin pour GitHub Pages
            img.setAttribute('src', '/E_portfolio/' + img.getAttribute('src'));
        }
    });

    // Corriger aussi les attributs "data-full" si besoin (ex: zoom d'image)
    document.querySelectorAll('[data-full]').forEach(function (element) {
        const dataFull = element.getAttribute('data-full');
        if (dataFull && dataFull.includes('img/') && dataFull.endsWith('.png')) {
            element.setAttribute('data-full', '/E_portfolio/' + dataFull);
        }
    });
});
