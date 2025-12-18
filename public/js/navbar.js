document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const filters = document.querySelector(".filters-wrapper");

  if (!navbar || !navbarCollapse || !filters) return;

  navbarCollapse.addEventListener("show.bs.collapse", () => {
    const navbarHeight = navbar.offsetHeight;
    filters.style.marginTop = navbarHeight + "px";
  });

  navbarCollapse.addEventListener("hide.bs.collapse", () => {
    filters.style.marginTop = "0px";
  });
});
