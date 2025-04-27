<<<<<<< HEAD
﻿// projet.js — Gestion du formulaire “Votre projet”
document.addEventListener("DOMContentLoaded", () => {
    const formProjet = document.getElementById("form-projet");

    if (!formProjet) return;

    formProjet.addEventListener("submit", event => {
        event.preventDefault();

        // Vérifier si l’utilisateur est connecté
        const estConnecte = localStorage.getItem("connecte") === "true";
        if (!estConnecte) {
            alert("Vous devez être connecté pour envoyer un projet.");
            return;
        }

        // Récupérer les valeurs
        const nom = formProjet.elements["nom"].value.trim();
        const email = formProjet.elements["email"].value.trim();
        const description = formProjet.elements["description"].value.trim();
        const fichier = formProjet.elements["fichier"].files[0];

        // Debug en console
        console.log({ nom, email, description, fichier });

        // Simulation d’envoi
        alert("Merci pour votre projet ! 😊\n(NOTE : envoi simulé)");
        formProjet.reset();
    });
=======
﻿document.addEventListener("DOMContentLoaded", function () {

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

>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
});
