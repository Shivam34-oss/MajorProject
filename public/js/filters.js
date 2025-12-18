// public/js/filters.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("filters-container");
  const nextBtn = document.getElementById("filter-next");
  const prevBtn = document.getElementById("filter-prev");

  if (!container) return;

  const scrollAmount = 250;

  nextBtn?.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn?.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});

