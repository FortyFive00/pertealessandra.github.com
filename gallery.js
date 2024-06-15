const songs = [
  "./music/thousand.mp3",
  "./music/Perfect.mp3",
  "./music/talking.mp3",
  "./music/growold.mp3",
];
let currentSongIndex = 0;
const audio = document.getElementById("background-music");

document.getElementById("next-song-btn").addEventListener("click", function () {
  playNextSong();
});

function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex];
  audio.play().catch((error) => {
    console.error("Errore nella riproduzione dell'audio: ", error);
  });
}

audio.addEventListener("ended", function () {
  playNextSong();
});

document.getElementById("volume-slider").addEventListener("input", function () {
  audio.volume = this.value;
});

function saveAudioState() {
  localStorage.setItem("audioCurrentTime", audio.currentTime);
  localStorage.setItem("currentSongIndex", currentSongIndex);
  localStorage.setItem("audioVolume", audio.volume);
  audio.pause();
}

function loadAudioState() {
  const savedTime = localStorage.getItem("audioCurrentTime");
  const savedIndex = localStorage.getItem("currentSongIndex");
  const savedVolume = localStorage.getItem("audioVolume");

  if (savedTime !== null) {
    audio.currentTime = savedTime;
  }
  if (savedIndex !== null) {
    currentSongIndex = parseInt(savedIndex);
    audio.src = songs[currentSongIndex];
  }
  if (savedVolume !== null) {
    audio.volume = savedVolume;
  }

  audio.play().catch((error) => {
    console.error("Errore nella riproduzione dell'audio: ", error);
  });
}

window.addEventListener("load", function () {
  loadAudioState();
  // Controlla se il browser blocca l'autoplay
  audio.play().catch(() => {
    // In caso di blocco, riproduci l'audio al primo interazione dell'utente
    window.addEventListener(
      "click",
      function () {
        audio.play().catch((error) => {
          console.error("Errore nella riproduzione dell'audio: ", error);
        });
      },
      { once: true }
    );
  });
});

window.addEventListener("beforeunload", saveAudioState);

const createGalleryItems = () => {
  const galleryContainer = document.querySelector(".gallery-container");

  if (!galleryContainer) {
    console.error("Gallery container was not found");
    return;
  }

  let dividerIndex = 0;
  // create loop
  for (let i = 0; i < 55; i++) {
    dividerIndex++;
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    const galleryItemImage = document.createElement("img");
    galleryItemImage.alt = "Gallery Image";
    galleryItemImage.src = "./images/Foto" + i + ".jpg";

    galleryItem.append(galleryItemImage);
    galleryContainer.append(galleryItem);

    //Check if 3 elements have been created
    if (dividerIndex == 3) {
      dividerIndex = 0;
      const calculation = Math.floor(i / 3);
      const dividerElement = createDividerItem(calculation);

      //  Initializing dividerElement inside gallery-container
      galleryContainer.append(dividerElement);
    }
  }
};

const createDividerItem = (index) => {
  const data = dividerData;

  if (!data) {
    console.error("divider data doesn't exist");
    return;
  }

  const dividerItem = document.createElement("div");
  dividerItem.className = "divider-text";

  if (!data[index]) {
    console.error("Index: " + index + " does not exist in divider data");
    return;
  }

  const textNode = document.createTextNode(data[index]);
  dividerItem.append(textNode);

  return dividerItem;
};

createGalleryItems();
