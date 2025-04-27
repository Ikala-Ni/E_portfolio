// projet.js — Gestion du formulaire “Votre projet”

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

        // Récupérer les valeurs depuis le formulaire
        const nom = formProjet.elements["nom"].value.trim();
        const email = formProjet.elements["email"].value.trim();
        const description = formProjet.elements["description"].value.trim();
        const fichier = formProjet.elements["fichier"].files[0];

        // Debug en console
        console.log({ nom, email, description });
        if (fichier) {
            console.log("Fichier :", fichier.name);
        }

        // Simulation d’envoi
        alert("Merci pour votre projet ! 😊\n(NOTE : envoi simulé)");
        formProjet.reset();
    });
});
