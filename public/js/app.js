const hamburger = document.querySelector(".hamburger");
const toggleContainer = document.querySelector(".toggle-container");
const sectionHeaders = document.querySelectorAll(".section-header");
const articles = document.querySelectorAll(".article");

hamburger.addEventListener("click", () => {
  const isExpanded =
    toggleContainer.getAttribute("aria-expanded") === "true" ? "false" : "true";

  toggleContainer.setAttribute("aria-expanded", isExpanded);
  toggleContainer.classList.toggle("open");
  hamburger.classList.toggle("open");
});

const scrollObserver = new IntersectionObserver((e) => {
  e.forEach((e) => {
    if (e.isIntersecting) {
      if (e.target.className === "section-header") {
        e.target.animate(
          [
            {
              transform: "translateY(90px)",
              opacity: 0,
            },
            {
              transform: "translateX(0)",
              opacity: 1,
            },
          ],
          { duration: 700, easing: "ease-out" }
        );
      }

      if (e.target.className === "article") {
        e.target.animate(
          [
            {
              transform: "translateX(-100px)",
              opacity: 0,
            },
            {
              transform: "translateX(0)",
              opacity: 1,
            },
          ],
          { duration: 300, easing: "ease-out" }
        );
      }
      scrollObserver.unobserve(e.target);
    }
  });
});

sectionHeaders.forEach((header) => scrollObserver.observe(header));

articles.forEach((article) => {
  scrollObserver.observe(article);
});

const resizeObserver = new ResizeObserver((entrie) => {
  if (entrie[0].contentRect.width <= 800) {
    toggleContainer.style.transition = "transform .3s ease-out";
  } else {
    toggleContainer.style.transition = "none";
  }
});

resizeObserver.observe(document.body);
