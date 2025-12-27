// ===============================
// CONFIG
// ===============================
const BACKEND_URL = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

// ===============================
// ELEMENTS
// ===============================
const audio = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");
const playBtn = document.getElementById("playBtn");
const liveBtn = document.getElementById("liveBtn");

let playlist = [];
let currentIndex = 0;
let radioMode = "auto"; // auto | live

// ===============================
// FETCH MUSIC LIST
// ===============================
async function loadRadioMusic() {
  try {
    statusText.innerText = "Loading radio…";

    const res = await fetch(`${BACKEND_URL}/music/list`);
    playlist = await res.json();

    if (!playlist || playlist.length === 0) {
      statusText.innerText = "No broadcast available";
      return;
    }

    currentIndex = 0;
    playCurrent();
  } catch (err) {
    console.error(err);
    statusText.innerText = "Radio offline";
  }
}

// ===============================
// PLAY CURRENT TRACK
// ===============================
function playCurrent() {
  if (playlist.length === 0) return;

  audio.src = BACKEND_URL + playlist[currentIndex];
  audio.play();

  statusText.innerText = "🔴 Oluwa-Timileyin Radio — Live Broadcast";
}

// ===============================
// AUTO CONTINUE (RADIO STYLE)
// ===============================
audio.addEventListener("ended", () => {
  if (radioMode !== "auto") return;

  currentIndex++;
  if (currentIndex >= playlist.length) {
    currentIndex = 0; // loop like real radio
  }
  playCurrent();
});

// ===============================
// PLAY BUTTON
// ===============================
playBtn.addEventListener("click", () => {
  radioMode = "auto";
  audio.play();
  statusText.innerText = "🔴 Oluwa-Timileyin Radio — Live Broadcast";
});

// ===============================
// LIVE MODE (MIC / STREAM LATER)
// ===============================
liveBtn.addEventListener("click", () => {
  radioMode = "live";

  audio.pause();
  audio.src = ""; // placeholder for real stream later

  statusText.innerText = "🎙️ Live session (coming soon)";
});

// ===============================
// AUTOSTART
// ===============================
window.addEventListener("load", () => {
  loadRadioMusic();
});
