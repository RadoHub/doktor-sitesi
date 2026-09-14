(function() {
  const track = document.getElementById("testimonialsTrack");
  const btnPrev = document.getElementById("testimonialPrev");
  const btnNext = document.getElementById("testimonialNext");

  if (!(track && btnPrev && btnNext)) return;

  let index = 0;
  let visible = 3;
  let animating = false;

  const calcVisible = () => {
    if (window.matchMedia("(max-width: 640px)").matches) return 1;
    if (window.matchMedia("(max-width: 900px)").matches) return 2;
    return 3;
  };

  const getOriginals = () => [...track.querySelectorAll(".testimonial-card:not([data-clone])")];

  function setPosition(animate = true) {
    const cards = track.querySelectorAll(".testimonial-card");
    if (!cards.length) return;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = index * (cardWidth + gap);

    track.style.transition = animate ? "transform 0.36s ease" : "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function rebuildTrack() {
    track.querySelectorAll("[data-clone]").forEach(c => c.remove());

    visible = calcVisible();
    const originals = getOriginals();
    const count = originals.length;
    if (!count) return;

    originals.slice(0, visible).forEach(c => {
      const cl = c.cloneNode(true);
      cl.dataset.clone = "true";
      track.append(cl);
    });

    originals.slice(-visible).forEach(c => {
      const cl = c.cloneNode(true);
      cl.dataset.clone = "true";
      track.prepend(cl);
    });

    index = visible;
    setPosition(false);
  }

  function slide(dir) {
    if (animating) return;
    animating = true;
    index += dir * visible;
    setPosition(true);
  }

  function onTransitionEnd() {
    const count = getOriginals().length;
    if (index >= count + visible) {
      index = visible;
      setPosition(false);
    } else if (index < visible) {
      index = count;
      setPosition(false);
    }
    animating = false;
  }

  rebuildTrack();
  btnPrev.addEventListener("click", () => slide(-1));
  btnNext.addEventListener("click", () => slide(1));
  track.addEventListener("transitionend", onTransitionEnd);

  window.addEventListener("resize", () => {
    rebuildTrack();
    animating = false;
  });
})();