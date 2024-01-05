const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const textBox = document.getElementById("text-box");
const toggleIconLight = document.getElementById("toggle-icon-light");
const toggleIconDark = document.getElementById("toggle-icon-dark");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
  textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
  toggleIconLight.setAttribute("hidden", "");
  toggleIconDark.removeAttribute("hidden");
  image1.src = "img/undraw_proud_coder_dark.svg";
  image2.src = "img/undraw_feeling_proud_dark.svg";
  image3.src = "img/undraw_conceptual_idea_dark.svg";
}

function lightMode() {
  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
  toggleIconDark.setAttribute("hidden", "");
  toggleIconLight.removeAttribute("hidden");
  image1.src = "img/undraw_proud_coder_light.svg";
  image2.src = "img/undraw_feeling_proud_light.svg";
  image3.src = "img/undraw_conceptual_idea_light.svg";
}

function switchTheme(event) {
  const attribute = event.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", attribute);
  if (attribute == "dark") darkMode();
  else lightMode();
}

toggleSwitch.addEventListener("change", switchTheme);
