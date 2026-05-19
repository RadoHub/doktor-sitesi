const fadeEls = document.querySelectorAll('.insurance-fade-in');

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }

  });

}, {
  threshold: 0.25
});

fadeEls.forEach(el => observer.observe(el));