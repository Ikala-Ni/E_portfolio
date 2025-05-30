// ============================================
// video.js
// Gère le mini-player uniquement si on quitte la section vidéo
// et le hover pause/play de la vidéo ADN
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Détection si l'utilisateur est sur un appareil mobile (écran <= 768px)
  const isMobile = window.innerWidth <= 768;
  
  // 1. Récupération des éléments du DOM
  const videoSection = document.getElementById('video-section');
  const mainVideo = document.getElementById('video-section-player');
  const miniPlayer = document.getElementById('mini-player');
  const miniVideo = document.getElementById('mini-video');
  const miniClose = document.getElementById('mini-close');
  const source = mainVideo.querySelector('source');

  if (!videoSection || !mainVideo || !miniPlayer || !miniVideo || !miniClose) {
    console.warn('video.js: éléments manquants, annulation du script mini-player.');
    return;
  }
  // CHANGEMENT : Selon si on est sur mobile ou non, on charge une vidéo différente
  if (isMobile) {
    source.src = 'videos/logoVideoADN-mobile.mp4';  // Vidéo pour mobile
  } else {
    source.src = 'videos/logoVideoADN.mp4';  // Vidéo pour desktop/tablette
  }
  mainVideo.load(); // Recharge la vidéo pour appliquer le changement de source

  
  let wasPlaying = true;

// ============================================
  // 2. Observation de la section vidéo principale
  // ============================================
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      // CHANGEMENT : déclenchement si la vidéo n’est plus visible DU TOUT
      if (!entry.isIntersecting && !mainVideo.paused) {
        console.log("Vidéo principale n'est plus visible, lancement mini-player.");
        
        wasPlaying = true;
        const currentTime = mainVideo.currentTime;

        // CHANGEMENT : récupération dynamique de la source et du temps actuel
        const sourceURL = mainVideo.querySelector('source')?.src || mainVideo.currentSrc;
        
        mainVideo.pause();    
        miniVideo.src = sourceURL;
        miniVideo.currentTime = currentTime;
        miniVideo.play();
        miniPlayer.classList.remove('hidden');
      }

      // CHANGEMENT : si la section redevient visible, arrêter le mini-player
      if (entry.isIntersecting && !miniPlayer.classList.contains('hidden')) {
        console.log("Retour à la section vidéo principale.");
        miniPlayer.classList.add('hidden');
        miniVideo.pause();
        miniVideo.removeAttribute('src');

        if (wasPlaying) {
          mainVideo.play();
        }
        wasPlaying = false;
      }
    });
  }, {
    root: null,
    threshold: 0, // CHANGEMENT : déclenche dès que l’élément sort totalement du viewport
  });

  observer.observe(videoSection);

  // ============================================
  // 3. Fermeture manuelle du mini-player
  // ============================================
  miniClose.addEventListener('click', () => {
    console.log("Fermeture mini-player.");
    if (wasPlaying) {
      // CHANGEMENT : synchronisation du temps de lecture avec la vidéo principale
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
