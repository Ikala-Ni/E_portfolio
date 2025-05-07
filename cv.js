document.addEventListener("DOMContentLoaded", function () {
    /**
     * Affiche la partie de CV identifiée par partId,
     * masque les autres et met à jour le bouton actif.
     */
    function showCVPart(partId) {
        const target = document.getElementById(partId);

        // 1. Cacher tous les blocs
        document.querySelectorAll('.cv-block').forEach(part => {
            part.classList.add('hidden');

            // Aussi masquer leur contenu interne sur mobile
            if (window.innerWidth < 600) {
                const h3 = part.querySelector('h3');
                const content = h3?.nextElementSibling;
                if (content) content.classList.add('hidden');
            }
        });

        // 2. Afficher le bloc ciblé
        if (target) {
            target.classList.remove('hidden');

            // Si mobile : déplier automatiquement le contenu de ce bloc
            if (window.innerWidth < 600) {
                const h3 = target.querySelector('h3');
                const content = h3?.nextElementSibling;
                if (content) content.classList.remove('hidden');
            }
        } else {
            console.warn("Partie de CV introuvable :", partId);
        }

        // 3. Mettre à jour l’état "active" des boutons
        document.querySelectorAll('.cv-banner button').forEach(btn => {
            btn.classList.toggle('active',
                btn.getAttribute('onclick')?.includes(partId)
            );
        });
    }

    // Rendre la fonction disponible globalement
    window.showCVPart = showCVPart;

    /**
     * Comportement spécifique pour mobile :
     * clic sur un titre H3 pour déplier/replier son contenu.
     */
    if (window.innerWidth < 600) {
        document.querySelectorAll('.cv-block').forEach(block => {
            const h3 = block.querySelector('h3');
            const content = h3?.nextElementSibling;
            if (h3 && content) {
                content.classList.add('hidden');
                h3.addEventListener('click', () => {
                    content.classList.toggle('hidden');
                });
            }
        });
    }

    // Afficher par défaut la section "Expériences" au chargement
    showCVPart('cv-experiences');
});
