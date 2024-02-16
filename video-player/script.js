const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.textContent = "pause";
    playBtn.setAttribute("title", "pause");
  } else {
    video.pause();
    playBtn.textContent = "play_arrow";
    playBtn.setAttribute("title", "play");
  }
}
video.addEventListener("ended", () => {
  playBtn.textContent = "play_arrow";
  playBtn.setAttribute("title", "play");
});

// Progress Bar ---------------------------------- //

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// Event Listners
playBtn.addEventListener("click", togglePlay);
