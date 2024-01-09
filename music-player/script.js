const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progressContainer = document.getElementById("progress-container");

const playBtn = document.getElementById("play-button");
const audio = document.querySelector("audio");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

let isPlaying = false;
let songIndex = 0;

function toggleSong() {
  isPlaying = !isPlaying;
  const [svg] = playBtn.children;
  if (isPlaying) {
    svg.children[1].setAttribute("visibility", "hidden");
    svg.children[0].removeAttribute("visibility");
    audio.play();
  } else {
    isPlaying = false;
    svg.children[1].removeAttribute("visibility");
    svg.children[0].setAttribute("visibility", "hidden");
    audio.pause();
  }
}

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  isPlaying = false;
  toggleSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  isPlaying = false;
  toggleSong();
}

loadSong(songs[0]);

audio.addEventListener("timeupdate", function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const durationMinutes = Math.floor(duration / 60);

    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    if (currentSeconds)
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
});

progressContainer.addEventListener("click", function setProgressBar(event) {
  const clickX = event.offsetX;
  const width = this.clientWidth;
  const { duration } = audio;
  console.log(duration * (clickX / width));
  audio.currentTime = duration * (clickX / width);
  // progress.style.width = `${percent}%`;
});
