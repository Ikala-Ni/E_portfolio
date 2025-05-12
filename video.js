// ============================================
// video.js
// Gère le mini-player uniquement si on quitte la section vidéo
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Récupération des éléments du DOM avec garde
  const videoSection = document.getElementById('video-section');
  const mainVideo = document.getElementById('video-section-player');
  const miniPlayer = document.getElementById('mini-player');
  const miniVideo = document.getElementById('mini-video');
  const miniClose = document.getElementById('mini-close');

  if (!videoSection || !mainVideo || !miniPlayer || !miniVideo || !miniClose) {
    console.warn('video.js: éléments manquants, annulation du script mini-player.');
    return;
  }

  let wasPlaying = false;

  // Observer via IntersectionObserver au lieu de MutationObserver pour fiabilité
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // Si la section n'est plus visible (user scrolle) et la vidéo était en lecture
      if (!entry.isIntersecting && !mainVideo.paused) {
        wasPlaying = true;
        mainVideo.pause();
        // Transfert vers le mini-player
        const sourceURL = mainVideo.querySelector('source')?.src || mainVideo.currentSrc;
        miniVideo.src = sourceURL;
        miniVideo.currentTime = mainVideo.currentTime;
        miniVideo.play();
        miniPlayer.classList.remove('hidden');
      }
    });
  }, { root: null, threshold: 0 });

  io.observe(videoSection);

  // Fermer le mini-player et reprendre la lecture principale
  miniClose.addEventListener('click', () => {
    if (wasPlaying) {
      mainVideo.currentTime = miniVideo.currentTime;
      mainVideo.play();
    }
    miniPlayer.classList.add('hidden');
    miniVideo.pause();
    miniVideo.removeAttribute('src');
    wasPlaying = false;
  });
});
