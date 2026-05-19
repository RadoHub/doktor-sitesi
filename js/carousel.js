let currentSlide = 0;

const slides = document.querySelectorAll('.carousel-slide');
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dotsContainer');

let autoTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('div');

  // CSS'teki class adı .dot olduğu için böyle olmalı
  dot.className = 'dot' + (i === 0 ? ' active' : '');

  dot.onclick = () => goToSlide(i);

  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  const dots = document.querySelectorAll('.dot');

  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  resetTimer();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function resetTimer() {
  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 5500);
}

resetTimer();