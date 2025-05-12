// ============================================
// video.js
// Logique dédiée au mini-player vidéo
// ============================================

// Attendre le chargement complet du DOM
window.addEventListener('DOMContentLoaded', () => {
  // Récupérer toutes les sections interactives
  const sections = document.querySelectorAll('.content-section');
  const miniPlayer = document.getElementById('mini-player');
  const miniVideo = document.getElementById('mini-video');
  const miniClose = document.getElementById('mini-close');
  const mainVideo = document.getElementById('videoLogoADN-player');

  // Parcourir chaque section pour y attacher un événement click
  sections.forEach(section => {
    section.addEventListener('click', () => {
      // Ne déclencher le mini-player que pour la section Logo ADN
      if (section.id === 'videoLogoADN') {
        // Mettre en pause la vidéo principale
        mainVideo.pause();
        // Synchroniser la source et la position
        miniVideo.src = mainVideo.currentSrc;
        miniVideo.currentTime = mainVideo.currentTime;
        // Lancer la lecture en mini
        miniVideo.play();
        // Afficher le mini-player
        miniPlayer.classList.remove('hidden');
      }
    });
  });

  // Gestion de la fermeture du mini-player
  miniClose.addEventListener('click', () => {
    // Synchroniser le temps de la vidéo principale
    mainVideo.currentTime = miniVideo.currentTime;
    // Reprendre la lecture principale
    mainVideo.play();
    // Masquer le mini-player
    miniPlayer.classList.add('hidden');
    // Arrêter et nettoyer la source du mini-video
    miniVideo.pause();
    miniVideo.src = '';
  });
});
