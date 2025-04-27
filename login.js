document.addEventListener("DOMContentLoaded", function () {

    // Récupération des éléments du formulaire et des boutons
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const registerBtn = document.getElementById("register-btn");
    const navProjet = document.getElementById("nav-projet");
    const loginMessage = document.getElementById("login-message");

    let estConnecte = localStorage.getItem("connecte") === "true";

    // Fonction pour mettre à jour l'affichage de la connexion
    function majAffichageConnexion() {
        if (estConnecte) {
            loginBtn?.classList.add("hidden");
            registerBtn?.classList.add("hidden");
            logoutBtn?.classList.remove("hidden");
            navProjet?.classList.remove("hidden");
        } else {
            loginBtn?.classList.remove("hidden");
            registerBtn?.classList.add("hidden");
            logoutBtn?.classList.add("hidden");
            navProjet?.classList.add("hidden");
        }
    }

    // Connexion
    loginForm?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const mdp = document.getElementById("login-password").value.trim();
        const emailEnregistre = localStorage.getItem("utilisateur_email");
        const mdpEnregistre = localStorage.getItem("utilisateur_mdp");

        if (email === emailEnregistre && mdp === mdpEnregistre) {
            estConnecte = true;
            localStorage.setItem("connecte", "true");
            showSection("presentation");
            majAffichageConnexion();
            loginForm.reset();
            loginMessage.textContent = "";
            showPopup("Connexion réussie !");
        } else {
            loginMessage.textContent = "Identifiants incorrects.";
        }
    });

    // Inscription
    registerForm?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("register-id").value.trim();
        const mdp = document.getElementById("register-mdp").value.trim();
        const mdpConfirm = document.getElementById("register-mdp-confirm")?.value.trim();

        if (!email || !mdp || (mdpConfirm !== undefined && !mdpConfirm)) {
            showPopup("Veuillez remplir tous les champs.");
            return;
        }

        if (mdpConfirm !== undefined && mdp !== mdpConfirm) {
            showPopup("Les mots de passe ne correspondent pas.");
            return;
        }

        localStorage.setItem("utilisateur_email", email);
        localStorage.setItem("utilisateur_mdp", mdp);
        localStorage.setItem("connecte", "true");
        estConnecte = true;
        registerForm.reset();
        showSection("presentation");
        majAffichageConnexion();
        showPopup("Inscription réussie !");
    });

    // Déconnexion
    logoutBtn?.addEventListener("click", function (e) {
        e.preventDefault();
        const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmation) {
            estConnecte = false;
            localStorage.setItem("connecte", "false");
            showSection("presentation");
            majAffichageConnexion();
            showPopup("Déconnexion réussie.");
        }
    });

    // Lien vers Inscription
    const lienInscription = document.getElementById("inscription-lien");
    lienInscription?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("register");
    });

    // Lien vers Connexion
    const lienConnexion = document.getElementById("connexion-lien");
    lienConnexion?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("login");
    });

    // Lien mot de passe oublié
    const forgotPassword = document.getElementById("forgot-password");
    forgotPassword?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("reset-password");
    });

    // Réinitialisation du mot de passe
    const resetForm = document.getElementById("reset-password-form");
    resetForm?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("reset-email").value.trim();
        const nouveauMDP = document.getElementById("new-password").value.trim();
        const confirmerMDP = document.getElementById("confirm-new-password").value.trim();
        const resetMessage = document.getElementById("reset-message");

        const emailEnregistre = localStorage.getItem("utilisateur_email");

        if (!nouveauMDP || !confirmerMDP) {
            resetMessage.textContent = "Veuillez remplir les deux champs de mot de passe.";
            return;
        }

        if (nouveauMDP !== confirmerMDP) {
            resetMessage.textContent = "Les mots de passe ne correspondent pas.";
            return;
        }

        if (email === emailEnregistre) {
            localStorage.setItem("utilisateur_mdp", nouveauMDP);
            resetForm.reset();
            resetMessage.textContent = "";
            showSection("login");
            showPopup("Mot de passe réinitialisé avec succès !");
        } else {
            resetMessage.textContent = "Aucun compte trouvé avec cet e-mail.";
        }
    });

    // Mise à jour initiale
    majAffichageConnexion();

    // Petit popup simple
    function showPopup(message) {
        alert(message);
    }

});
