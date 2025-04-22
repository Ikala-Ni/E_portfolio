document.addEventListener("DOMContentLoaded", function () {

        // Fonction unique pour afficher une partie du CV
        function showCVPart(partId) {
            // Cacher toutes les sections
            const parts = document.querySelectorAll('.cv-block');
            parts.forEach(part => part.classList.add('hidden'));

            // Afficher la partie ciblée
            const target = document.getElementById(partId);
            if (target) {
                target.classList.remove('hidden');
            } else {
                console.warn("Partie de CV introuvable :", partId);
            }

            // Mettre à jour l'état actif des boutons
            const buttons = document.querySelectorAll('.cv-banner button');
            buttons.forEach(btn => btn.classList.remove('active'));

            const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick')?.includes(partId));
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
    }
    //function showCVPart(partId) {
        //const parts = document.querySelectorAll(".cv-part");
        //parts.forEach((part) => {
            //part.style.display = "none";
       // });

        //const partToShow = document.getElementById(partId);
        //if (partToShow) {
    //        partToShow.style.display = "block";
      //  }
   // }

        // Rendre la fonction accessible globalement (sinon les boutons onclick ne fonctionnent pas)
        window.showCVPart = showCVPart;

    });


