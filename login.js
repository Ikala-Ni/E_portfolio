document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD

    // Récupération des éléments du formulaire et des boutons
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const registerBtn = document.getElementById("register-btn");
    const navProjet = document.getElementById("nav-projet");
    const loginMessage = document.getElementById("login-message");

    // Vérifie si l'utilisateur est connecté en localStorage
    let estConnecte = localStorage.getItem("connecte") === "true";

    // Fonction pour mettre à jour l'affichage de la connexion
    function majAffichageConnexion() {
        if (estConnecte) {
            // Si l'utilisateur est connecté, on cache les boutons de connexion et d'inscription, et on affiche la déconnexion
            loginBtn?.classList.add("hidden");
            registerBtn?.classList.add("hidden");
            logoutBtn?.classList.remove("hidden");
            navProjet?.classList.remove("hidden");
        } else {
            // Si l'utilisateur n'est pas connecté, on affiche les boutons de connexion et d'inscription
            loginBtn?.classList.remove("hidden");
            registerBtn?.classList.add("hidden");
            logoutBtn?.classList.add("hidden");
            navProjet?.classList.add("hidden");
        }
    }

    // Connexion : quand le formulaire est soumis
    loginForm?.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche le comportement par défaut (rafraîchissement de la page)

        const email = document.getElementById("login-email").value.trim();
        const mdp = document.getElementById("login-password").value.trim();
        const emailEnregistre = localStorage.getItem("utilisateur_email");
        const mdpEnregistre = localStorage.getItem("utilisateur_mdp");

        // Vérifie si les identifiants sont corrects
        if (email === emailEnregistre && mdp === mdpEnregistre) {
            estConnecte = true;
            localStorage.setItem("connecte", "true");
            showSection("presentation"); // Affiche la section "présentation"
            majAffichageConnexion(); // Met à jour l'affichage
            loginForm.reset();
            loginMessage.textContent = "";
            showPopup("Connexion réussie !"); // Affiche un popup de succès
        } else {
            loginMessage.textContent = "Identifiants incorrects."; // Affiche un message d'erreur
        }
    });

    // Inscription : quand le formulaire d'inscription est soumis
    registerForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("register-id").value.trim();
        const mdp = document.getElementById("register-mdp").value.trim();
        const mdpConfirm = document.getElementById("register-mdp-confirm").value.trim();

        // Vérifie si tous les champs sont remplis et si les mots de passe correspondent
        if (!email || !mdp || !mdpConfirm) {
            showPopup("Veuillez remplir tous les champs.");
            return;
        }

        if (mdp !== mdpConfirm) {
            showPopup("Les mots de passe ne correspondent pas.");
            return;
        }

        // Enregistre les informations de l'utilisateur dans localStorage
        localStorage.setItem("utilisateur_email", email);
        localStorage.setItem("utilisateur_mdp", mdp);
        localStorage.setItem("connecte", "true");
        estConnecte = true;
        registerForm.reset();
        showSection("presentation");
        majAffichageConnexion();
        showPopup("Inscription réussie !");
    });

    // Déconnexion : quand l'utilisateur clique sur le bouton de déconnexion
    logoutBtn?.addEventListener("click", function (e) {
        e.preventDefault();

        const confirmation = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmation) {
=======
        const loginForm = document.getElementById("login-form");
        const registerForm = document.getElementById("register-form");

        const loginBtn = document.getElementById("login-btn");
        const logoutBtn = document.getElementById("logout-btn");
        const registerBtn = document.getElementById("register-btn");

        const navProjet = document.getElementById("nav-projet");
        const loginMessage = document.getElementById("login-message");

        let estConnecte = localStorage.getItem("connecte") === "true";

        function majAffichageConnexion() {
            if (estConnecte) {
                loginBtn?.classList.add("hidden");
                registerBtn?.classList.add("hidden");
                logoutBtn?.classList.remove("hidden");
                navProjet?.classList.remove("hidden");
            } else {
                loginBtn?.classList.remove("hidden");
                registerBtn?.classList.add("hidden"); // bouton inscription masqué dans nav
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

            if (email && mdp) {
                localStorage.setItem("utilisateur_email", email);
                localStorage.setItem("utilisateur_mdp", mdp);
                localStorage.setItem("connecte", "true");
                estConnecte = true;
                registerForm.reset();
                showSection("presentation");
                majAffichageConnexion();
                showPopup("Inscription réussie !");
            } else {
                showPopup("Veuillez remplir tous les champs.");
            }
        });

        // Déconnexion
        logoutBtn?.addEventListener("click", function (e) {
            e.preventDefault();
>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
            estConnecte = false;
            localStorage.setItem("connecte", "false");
            showSection("presentation");
            majAffichageConnexion();
            showPopup("Déconnexion réussie.");
<<<<<<< HEAD
        }
    });

    // Lien vers Inscription depuis Connexion
    const lienInscription = document.getElementById("inscription-lien");
    lienInscription?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("register"); // Affiche la section d'inscription
    });

    // Lien vers Connexion depuis Inscription
    const lienConnexion = document.getElementById("connexion-lien");
    lienConnexion?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("login"); // Affiche la section de connexion
    });

    // Redirection vers la section "Mot de passe oublié"
    const forgotPassword = document.getElementById("forgot-password");
    forgotPassword?.addEventListener("click", function (e) {
        e.preventDefault();
        showSection("reset-password"); // Affiche la section de réinitialisation du mot de passe
    });

    // Réinitialisation du mot de passe : lorsque le formulaire de réinitialisation est soumis
    const resetForm = document.getElementById("reset-password-form");
    resetForm?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("reset-email").value.trim();
        const nouveauMDP = document.getElementById("new-password").value.trim();
        const confirmerMDP = document.getElementById("confirm-new-password").value.trim();
        const resetMessage = document.getElementById("reset-message");

        const emailEnregistre = localStorage.getItem("utilisateur_email");

        // Vérifie si l'email est valide et correspond à celui enregistré
        if (email === emailEnregistre) {
            localStorage.setItem("utilisateur_mdp", nouveauMDP); // Enregistre le nouveau mot de passe
            resetForm.reset();
            resetMessage.textContent = "";
            showSection("login"); // Redirige l'utilisateur vers la page de connexion
            showPopup("Mot de passe réinitialisé avec succès !");
        } else {
            resetMessage.textContent = "Aucun compte trouvé avec cet e-mail."; // Affiche un message d'erreur
        }

        // Vérifie que les deux mots de passe sont remplis et identiques
        if (!nouveauMDP || !confirmerMDP) {
            resetMessage.textContent = "Veuillez remplir les deux champs de mot de passe.";
            return;
        }

        if (nouveauMDP !== confirmerMDP) {
            resetMessage.textContent = "Les mots de passe ne correspondent pas.";
            return;
        }
    });

    // Mise à jour initiale de l'affichage
    majAffichageConnexion();

    // Fonction de popup simple
    function showPopup(message) {
        alert(message); // Affiche un message simple (peut être remplacé par un design personnalisé)
=======
        });

            // Lien vers Inscription depuis Connexion
            const lienInscription = document.getElementById("inscription-lien");
            lienInscription?.addEventListener("click", function (e) {
                e.preventDefault();
                showSection("register");
            });

            // Lien vers Connexion depuis Inscription
            const lienConnexion = document.getElementById("connexion-lien");
            lienConnexion?.addEventListener("click", function (e) {
                e.preventDefault();
                showSection("login");
            });


        // Mise à jour initiale
        majAffichageConnexion();
    

    // Petit popup avec alert simple
    function showPopup(message) {
        alert(message); // tu peux remplacer ça par un vrai design plus tard
>>>>>>> 98661f487dc2a32f1d705979545749a1fc7c8753
    }

});
