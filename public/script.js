const BACKEND = "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

const player = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");

// ================= MUSIC RADIO =================
async function playMusic() {
  statusText.innerText = "Mode: Music Radio";

  const res = await fetch(BACKEND + "/music/list");
  const files = await res.json();

  if (!files || files.length === 0) {
    alert("No music uploaded yet");
    return;
  }

  let index = 0;
  player.src = BACKEND + files[index];
  player.play();

  // Auto-play next song (continuous radio)
  player.onended = () => {
    index = (index + 1) % files.length;
    player.src = BACKEND + files[index];
    player.play();
  };
}

// ================= LIVE MIC (BROWSER MIC) =================
async function playLiveMic() {
  statusText.innerText = "Mode: Live Mic";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    player.srcObject = stream;
    player.play();
  } catch (err) {
    alert("Microphone access denied");
  }
}

// ================= STOP =================
function stopRadio() {
  statusText.innerText = "Stopped";

  if (player.srcObject) {
    player.srcObject.getTracks().forEach(track => track.stop());
    player.srcObject = null;
  }

  player.pause();
  player.src = "";
      }
