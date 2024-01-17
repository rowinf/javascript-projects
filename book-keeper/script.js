const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const modalShow = document.getElementById("show-modal");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("close-modal");

function showModal() {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal"),
);
window.addEventListener("click", (e) => {
  if (e.target.id === "modal") modal.classList.remove("show-modal");
});

const validateUrl = (str) => {
  const urlRegex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  );
  return str.match(urlRegex);
};

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  let invalidUrl = false;
  if (urlValue.search(/https?:\/\//) === -1) {
    invalidUrl = !validateUrl(`https://${urlValue}`);
  } else {
    invalidUrl = !validateUrl(urlValue);
  }
  if (invalidUrl) {
    alert("invalid url");
  }
  console.log(nameValue, urlValue);
});
