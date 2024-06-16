const songs = [
  "./music/thousand.mp3",
  "./music/Perfect.mp3",
  "./music/talking.mp3",
  "./music/growold.mp3",
];

let currentSongIndex = 0;

const audio = document.getElementById("background-music");
const pauseButton = document.querySelector(".pause-btn");

if (audio) {
  audio.volume = 0.2;
  audio.src = songs[currentSongIndex]; // Imposta la canzone corrente
  try {
    //Logic goes in here
    audio.play();
  } catch (error) {
    console.error("Errore nella riproduzione dell'audio: ", error);
  }
} else {
  console.error("background-music was not found");
}

// Event listener per passare alla prossima canzone quando la corrente finisce
audio.addEventListener("ended", playNextSong);
audio.addEventListener("playing", () => {
  // Write your logic
  pauseButton.style.display = "block"; //Makes the button real fr
});

document.getElementById("next-song-btn").addEventListener("click", function () {
  playNextSong();
});

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex];
  audio.play();
}

document.getElementById("volume-slider").addEventListener("input", function () {
  audio.volume = this.value;
});

const pauseMusic = () => {
  console.log("Pausing music");

  let pauseButtonContext = pauseButton.textContent;

  //   We check if our button text is Pause (which automatically aready is)
  if (pauseButtonContext === "Pause") {
    // We are pausing the audio with its own function called pause()
    audio.pause();
    // After pausing the audio we changing the text inside to Continue
    pauseButton.textContent = "Continue";
  } else {
    // If audio text is not called Continue we changing it back to Pause
    pauseButton.textContent = "Pause";
    // We continue the audio to play again
    audio.play();
  }
};
