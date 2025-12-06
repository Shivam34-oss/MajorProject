// public/js/filters.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("filters-container");
  const nextBtn = document.getElementById("filter-next");
  const prevBtn = document.getElementById("filter-prev");

  if (!container || !nextBtn || !prevBtn) return;

  const scrollAmount = 200; // kitna px scroll karna hai, chahe to change kar sakte ho

  nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
