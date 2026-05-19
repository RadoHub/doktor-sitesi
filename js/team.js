const fadeElements = document.querySelectorAll('.team-fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12
});

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});