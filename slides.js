// slides.js
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {
    const track = slider.querySelector('.slide-track');
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Crée les boutons
    const nav = document.createElement('div');
    nav.className = 'slider-nav';
    nav.innerHTML = `
      <button class="prev-slide" aria-label="Slide précédente">&#10094;</button>
      <button class="next-slide" aria-label="Slide suivante">&#10095;</button>
    `;
    slider.appendChild(nav);

    const prevBtn = nav.querySelector('.prev-slide');
    const nextBtn = nav.querySelector('.next-slide');

    const updateSlide = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    });
  });
});
