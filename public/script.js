const BACKEND_URL =
  "https://oluwa-timileyin-radio-backend-jgwk.onrender.com";

const player = document.getElementById("radioPlayer");
const statusText = document.getElementById("status");

fetch(`${BACKEND_URL}/music/list`)
  .then(res => res.json())
  .then(list => {
    if (!list || list.length === 0) {
      statusText.textContent = "No broadcast available now";
      return;
    }

    // Play first audio like radio stream
    player.src = BACKEND_URL + list[0];
    player.play();

    statusText.textContent = "🔴 Broadcasting Live";
  })
  .catch(err => {
    console.error(err);
    statusText.textContent = "Connection error";
  });
