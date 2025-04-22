document.addEventListener("DOMContentLoaded", function () {

    const formProjet = document.getElementById("form-projet");

    if (formProjet) {
        formProjet.addEventListener("submit", function (event) {
            event.preventDefault();

            const estConnecte = localStorage.getItem("connecte") === "true";
            if (!estConnecte) {
                alert("Vous devez être connecté pour envoyer un projet.");
                return;
            }

            const nom = document.getElementById("nom").value;
            const email = document.getElementById("email").value;
            const description = document.getElementById("description").value;
            const fichier = document.getElementById("fichier").files[0];

            console.log("Nom :", nom);
            console.log("Email :", email);
            console.log("Description :", description);
            if (fichier) {
                console.log("Fichier :", fichier.name);
            }

            alert("Merci pour votre projet ! 😊 (simulation d'envoi)");
        });
    }

});
