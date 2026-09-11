(function() {
  const navbar = document.getElementById("navbar");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-navigation");

  if (!(navbar && toggle && menu)) return;

  function setOpen(isOpen) {
    navbar.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
  }

  toggle.addEventListener("click", () => {
    setOpen(!navbar.classList.contains("menu-open"));
  });

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setOpen(false));
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 901px)").matches) setOpen(false);
  });
})();
