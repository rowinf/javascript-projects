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

