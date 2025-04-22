document.addEventListener("DOMContentLoaded", function () {
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
            estConnecte = false;
            localStorage.setItem("connecte", "false");
            showSection("presentation");
            majAffichageConnexion();
            showPopup("Déconnexion réussie.");
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
    }

});
