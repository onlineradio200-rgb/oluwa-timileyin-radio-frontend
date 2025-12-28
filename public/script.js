const BACKEND_URL = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";
let playlist = [];
let currentIndex = 0;

const player = document.getElementById("player");
const statusText = document.getElementById("status");
let liveStream = false;

// Fetch playlist
async function loadPlaylist() {
  const res = await fetch(`${BACKEND_URL}/music/list`);
  playlist = await res.json();
  playNext();
}

// Play next audio in playlist
function playNext() {
  if (liveStream) return; // Live mic overrides music

  if (!playlist || playlist.length === 0) {
    statusText.textContent = "No audio available";
    return;
  }

  player.src = BACKEND_URL + playlist[currentIndex];
  player.play();
  statusText.textContent = `Playing: ${playlist[currentIndex]}`;

  currentIndex++;
  if (currentIndex >= playlist.length) currentIndex = 0;
}

// Auto play next track when current ends
player.addEventListener("ended", playNext);

// Start everything
window.onload = loadPlaylist;

// ----- LIVE MIC OVERRIDE -----
function startLiveMic() {
  liveStream = true;
  player.pause();
  statusText.textContent = "🔴 Live Broadcast (Mic)";
}

function stopLiveMic() {
  liveStream = false;
  statusText.textContent = "Resuming playlist...";
  playNext();
      }
