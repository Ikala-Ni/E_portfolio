// ============================================
// video.js
// Gère le mini-player uniquement si on quitte la section vidéo pendant la lecture
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  const videoSection = document.getElementById('video-section');
  const mainVideo = document.getElementById('video-section-player');
  const miniPlayer = document.getElementById('mini-player');
  const miniVideo = document.getElementById('mini-video');
  const miniClose = document.getElementById('mini-close');

  let wasPlaying = false;

  // Surveille les changements de style sur la section vidéo
  const observer = new MutationObserver(() => {
    const isHidden = videoSection.classList.contains('hidden');

    if (isHidden && !mainVideo.paused) {
      // L'utilisateur quitte la section pendant la lecture
      wasPlaying = true;
      mainVideo.pause();

      // Transfert vers le mini-player
      miniVideo.src = mainVideo.querySelector('source').src || mainVideo.currentSrc;
      miniVideo.currentTime = mainVideo.currentTime;
      miniVideo.play();
      miniPlayer.classList.remove('hidden');
    }
  });

  // Observer les changements d'attributs (pour détecter .hidden)
  observer.observe(videoSection, { attributes: true, attributeFilter: ['class'] });

  // Fermer le mini-player et reprendre la lecture principale
  miniClose.addEventListener('click', () => {
    if (wasPlaying) {
      mainVideo.currentTime = miniVideo.currentTime;
      mainVideo.play();
    }

    miniPlayer.classList.add('hidden');
    miniVideo.pause();
    miniVideo.src = '';
    wasPlaying = false;
  });
});
