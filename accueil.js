// accueil.js
console.log("accueil.js chargé");

document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "main.html";

 // Fonction de redirection avec gestion du son pour #video-section
  function redirectToSection(sectionId, wantsAudio = false) {
    if (sectionId === "video-section") {
      sessionStorage.setItem("playVideoWithSound", wantsAudio ? "true" : "false");
    }
    if (sectionId) {
      window.location.href = `${baseUrl}#${sectionId}`;
    } else {
      window.location.href = baseUrl;
    }
  }

  // tous les éléments cliquables (liens + boutons)
  const navLinks = document.querySelectorAll(".nav-link");
  const navBtns  = document.querySelectorAll(".nav-btn");

  // lien de navigation (ancre vers section)
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const section = link.dataset.section;       // ex: "cv"
      redirectToSection(section);
    });
  });

  // boutons du bas (même comportement, ou "Visitez" sans data-section)
  navBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      const section = btn.dataset.section || null;
      redirectToSection(section);
    });
  });
});
