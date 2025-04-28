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

    // Ajout : compteur de tentatives de connexion
    let tentativeLogin = 0;

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

    // Fonction ajoutée : hachage SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Connexion
    loginForm?.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const mdp = document.getElementById("login-password").value.trim();
        const emailEnregistre = localStorage.getItem("utilisateur_email");
        const mdpEnregistre = localStorage.getItem("utilisateur_mdp");

        const hashedInputMdp = await hashPassword(mdp);

        if (email === emailEnregistre && hashedInputMdp === mdpEnregistre) {
            estConnecte = true;
            localStorage.setItem("connecte", "true");
            showSection("presentation");
            majAffichageConnexion();
            loginForm.reset();
            loginMessage.textContent = "";
            tentativeLogin = 0; // Reset tentative
            showPopup("Connexion réussie !");
        } else {
            tentativeLogin++;
            if (tentativeLogin >= 5) {
                loginMessage.textContent = "Trop de tentatives échouées. Réessayez dans 10 minutes.";
                loginForm.querySelector("button").disabled = true;
                setTimeout(() => {
                    tentativeLogin = 0;
                    loginForm.querySelector("button").disabled = false;
                    loginMessage.textContent = "";
                }, 600000); // 10 minutes
            } else {
                loginMessage.textContent = "Identifiants incorrects.";
            }
        }
    });

    // Inscription
    registerForm?.addEventListener("submit", async function (e) {
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

        // Ajout : Vérification de la force du mot de passe
        if (mdp.length < 8 || !/[A-Z]/.test(mdp) || !/[a-z]/.test(mdp) || !/[0-9]/.test(mdp) || !/[^A-Za-z0-9]/.test(mdp)) {
            showPopup("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.");
            return;
        }

        const hashedMdp = await hashPassword(mdp);

        localStorage.setItem("utilisateur_email", email);
        localStorage.setItem("utilisateur_mdp", hashedMdp);
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
    resetForm?.addEventListener("submit", async function (e) {
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

        // Ajout : Vérification de la force du mot de passe lors du reset
        if (nouveauMDP.length < 8 || !/[A-Z]/.test(nouveauMDP) || !/[a-z]/.test(nouveauMDP) || !/[0-9]/.test(nouveauMDP) || !/[^A-Za-z0-9]/.test(nouveauMDP)) {
            resetMessage.textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.";
            return;
        }

        if (email === emailEnregistre) {
            const hashedNewMdp = await hashPassword(nouveauMDP);
            localStorage.setItem("utilisateur_mdp", hashedNewMdp);
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

    // POPUP
    function showPopup(message, type = "success") {
        const popup = document.createElement("div");
        popup.textContent = message;
        popup.style.position = "fixed";
        popup.style.top = "-100px"; // Commence caché en haut
        popup.style.left = "50%";
        popup.style.transform = "translateX(-50%)";
        popup.style.padding = "15px 25px";
        popup.style.borderRadius = "8px";
        popup.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.3)";
        popup.style.zIndex = "9999";
        popup.style.fontSize = "16px";
        popup.style.transition = "top 0.4s ease, opacity 0.4s ease";
        popup.style.opacity = "0";

        // Couleurs selon type
        if (type === "success") {
            popup.style.backgroundColor = "#4caf50"; // Vert succès
        } else if (type === "error") {
            popup.style.backgroundColor = "#d93025"; // Rouge erreur
        } else {
            popup.style.backgroundColor = "#333"; // Neutre par défaut
        }

        document.body.appendChild(popup);

        // Animation d'apparition
        setTimeout(() => {
            popup.style.top = "30px";
            popup.style.opacity = "1";
        }, 100);

        // Animation de disparition après 6 secondes
        setTimeout(() => {
            popup.style.opacity = "0";
            popup.style.top = "-100px";
            setTimeout(() => {
                popup.remove();
            }, 500);
        }, 6000);
    }



});
