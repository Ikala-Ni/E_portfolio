document.addEventListener("DOMContentLoaded", function () {

    /** 
     * Affiche la partie de CV identifiée par partId,
     * masque les autres et met à jour le bouton actif. 
     */
    function showCVPart(partId) {
        // 1. Cacher tous les blocs
        document.querySelectorAll('.cv-block').forEach(part => {
            part.classList.add('hidden');
        });

        // 2. Afficher le bloc ciblé
        const target = document.getElementById(partId);
        if (target) {
            target.classList.remove('hidden');
        } else {
            console.warn("Partie de CV introuvable :", partId);
        }

        // 3. Mettre à jour l’état “active” des boutons
        document.querySelectorAll('.cv-banner button').forEach(btn => {
            btn.classList.toggle('active',
                btn.getAttribute('onclick')?.includes(partId)
            );
        });
    }

    // Rendre la fonction disponible globalement
    window.showCVPart = showCVPart;

});
