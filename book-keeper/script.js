const bookmarkForm = document.getElementById('bookmark-form')
const websiteNamEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')
const modalShow = document.getElementById('show-modal')
const modal = document.getElementById('modal')
const modalClose = document.getElementById('close-modal')

function showModal () {
  modal.classList.add('show-modal')
  websiteNamEl.focus()
}

modalShow.addEventListener('click', showModal)
