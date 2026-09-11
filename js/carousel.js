(function() {
  const AUTOPLAY_MS = 5500;

  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('dotsContainer');
  const slides = document.querySelectorAll('.carousel-slide');
  const total = slides.length;

  if (!track || !dotsContainer || total <= 0) return;

  const dots = [];
  let current = 0;
  let timerId;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function goTo(n) {
    const next = (n + total) % total;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = next;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    track.style.transform = `translateX(-${current * 100}%)`;
    restartTimer();
  }

  function restartTimer() {
    clearInterval(timerId);
    timerId = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
  }

  window.nextSlide = () => goTo(current + 1);
  window.prevSlide = () => goTo(current - 1);

  restartTimer();
})();