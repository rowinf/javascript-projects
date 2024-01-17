const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const modalShow = document.getElementById("show-modal");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("close-modal");

let bookmarks = [];

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

function buildBookmarks() {
  bookmarksContainer.textContent = "";
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    const item = document.createElement("div");
    item.classList.add("item");
    const closeIcon = document.createElement("span");
    closeIcon.classList.add("material-symbols-outlined", "close");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    closeIcon.textContent = "close";
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`,
    );
    favicon.setAttribute("alt", "Favicon");
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = [
      {
        name: "jacinto design",
        url: "https://jacinto.design",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (urlValue.search(/https?:\/\//) === -1) {
    url = `https://${urlValue}`;
  } else {
    url = urlValue;
  }
  if (!validateUrl(url)) {
    return false;
  }
  const bookmark = { name: nameValue, url };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

bookmarkForm.addEventListener("submit", storeBookmark);
fetchBookmarks();
