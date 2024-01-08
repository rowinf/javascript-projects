const overlay = document.getElementById("overlay");
const menuBars = document.getElementById("menu-bars");

function toggleNav() {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    document
      .querySelectorAll(
        ".slide-out-1, .slide-out-2, .slide-out-3, .slide-out-4, .slide-out-5",
      )
      .forEach((item, index) =>
        item.classList.replace(
          `slide-out-${index + 1}`,
          `slide-in-${index + 1}`,
        ),
      );
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
    document
      .querySelectorAll(
        ".slide-in-1, .slide-in-2, .slide-in-3, .slide-in-4, .slide-in-5",
      )
      .forEach((item, index) =>
        item.classList.replace(
          `slide-in-${index + 1}`,
          `slide-out-${index + 1}`,
        ),
      );
  }
}
menuBars.addEventListener("click", toggleNav);
document
  .querySelectorAll(
    ".slide-out-1, .slide-out-2, .slide-out-3, .slide-out-4, .slide-out-5",
  )
  .forEach((el) => el.addEventListener("click", toggleNav));
