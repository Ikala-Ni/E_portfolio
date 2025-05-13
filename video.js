// ============================================
// video.js
// Gère le mini-player uniquement si on quitte la section vidéo
// et le hover pause/play de la vidéo ADN
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // 1. Récupération des éléments du DOM
  const videoSection = document.getElementById('video-section');
  const mainVideo = document.getElementById('video-section-player');
  const miniPlayer = document.getElementById('mini-player');
  const miniVideo = document.getElementById('mini-video');
  const miniClose = document.getElementById('mini-close');

  if (!videoSection || !mainVideo || !miniPlayer || !miniVideo || !miniClose) {
    console.warn('video.js: éléments manquants, annulation du script mini-player.');
    return;
  }

  let wasPlaying = true;

  // 2. Observer la visibilité de la section vidéo principale
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !mainVideo.paused) {
        wasPlaying = true;
        mainVideo.pause();

        // Transfert vers mini-player
        const sourceURL = mainVideo.querySelector('source')?.src || mainVideo.currentSrc;
        miniVideo.src = sourceURL;
        miniVideo.currentTime = mainVideo.currentTime;
        miniVideo.play();
        miniPlayer.classList.remove('hidden');
      }
    });
  }, { root: null, threshold: 0 });

  io.observe(videoSection);

  // 3. Fermeture du mini-player et reprise lecture principale
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

  // ============================================
  // 4. Gestion de la vidéo ADN (hover play/pause)
  // ============================================
  const videoHover = document.getElementById('portfolio-video');
  if (videoHover) {
    videoHover.muted = false;
    videoHover.loop = false;

    videoHover.addEventListener('mouseenter', () => {
      videoHover.pause();
    });

    videoHover.addEventListener('mouseleave', () => {
      videoHover.play();
    });
  }
});
