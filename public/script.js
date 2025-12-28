const BACKEND_URL =
  "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

const player = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");

let playlist = [];
let currentIndex = 0;

function playNext() {
  if (playlist.length === 0) {
    statusText.textContent = "No broadcast available now";
    return;
  }

  player.src = BACKEND_URL + playlist[currentIndex];
  player.play();

  statusText.textContent = "🔴 Broadcasting Live";

  currentIndex++;
  if (currentIndex >= playlist.length) {
    currentIndex = 0; // loop like radio
  }
}

// Load playlist
fetch(`${BACKEND_URL}/music/list`)
  .then(res => res.json())
  .then(list => {
    playlist = list;
    playNext();
  })
  .catch(() => {
    statusText.textContent = "Connection error";
  });

// When one audio ends → play next
player.addEventListener("ended", playNext);
