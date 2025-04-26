document.addEventListener("DOMContentLoaded", function () {

    /** 
     * Affiche la partie de CV identifi�e par partId,
     * masque les autres et met � jour le bouton actif. 
     */
    function showCVPart(partId) {
        // 1. Cacher tous les blocs
        document.querySelectorAll('.cv-block').forEach(part => {
            part.classList.add('hidden');
        });

        // 2. Afficher le bloc cibl�
        const target = document.getElementById(partId);
        if (target) {
            target.classList.remove('hidden');
        } else {
            console.warn("Partie de CV introuvable :", partId);
        }

        // 3. Mettre � jour l��tat �active� des boutons
        document.querySelectorAll('.cv-banner button').forEach(btn => {
            btn.classList.toggle('active',
                btn.getAttribute('onclick')?.includes(partId)
            );
        });
    }

    // Rendre la fonction disponible globalement
    window.showCVPart = showCVPart;

    // Mobile only
    // Mobile only
    if (window.innerWidth < 600) {
        document.querySelectorAll('.cv-block').forEach(block => {
            const h3 = block.querySelector('h3');
            const content = h3.nextElementSibling;
            content.classList.add('hidden');
            h3.addEventListener('click', () => {
                content.classList.toggle('hidden');
            });
        });
    }


    // Afficher par d�faut la section "Exp�riences" au chargement
    showCVPart('cv-experiences');


});
