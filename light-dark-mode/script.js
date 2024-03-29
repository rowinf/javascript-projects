const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const textBox = document.getElementById("text-box");
const toggleIconLight = document.getElementById("toggle-icon-light");
const toggleIconDark = document.getElementById("toggle-icon-dark");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

function toggleStyles(mode) {
  const disabledStyles = mode === "dark" ? "light" : "dark";
  document
    .querySelectorAll(`link[rel=stylesheet][href="/${disabledStyles}.css"]`)
    .forEach((el) => {
      el.media = "not all";
      el.disabled = true;
    });
  document
    .querySelectorAll(`link[rel=stylesheet][href="/${mode}.css"]`)
    .forEach((el) => {
      el.media = "all";
      el.disabled = false;
    });
}

function toggleImages(mode) {
  image1.src = `img/undraw_proud_coder_${mode}.svg`;
  image2.src = `img/undraw_feeling_proud_${mode}.svg`;
  image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

function darkMode() {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleIconDark.removeAttribute("hidden");
  toggleIconLight.setAttribute("hidden", "");
  toggleImages("dark");
  toggleStyles("dark");
}

function lightMode() {
  document.documentElement.setAttribute("data-theme", "light");
  toggleIconLight.removeAttribute("hidden");
  toggleIconDark.setAttribute("hidden", "");
  toggleImages("light");
  toggleStyles("light");
}

function toggle(isDark) {
  if (isDark) {
    if (!toggleSwitch.checked) toggleSwitch.click();
    darkMode();
  } else {
    if (toggleSwitch.checked) toggleSwitch.checked = false;
    lightMode();
  }
}

toggleSwitch.addEventListener("change", (event) => {
  const darkModeOn = event.target.checked;
  toggle(darkModeOn);
});

const mql = matchMedia("(prefers-color-scheme: dark)");
toggle(mql.matches);
mql.addEventListener("change", (e) => {
  const darkModeOn = e.matches;
  toggle(darkModeOn);
});
