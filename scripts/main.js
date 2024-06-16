document.getElementById("show-poem-btn").addEventListener("click", function () {
  audio.volume = 0.1;
  audio.play();
  const hiddenContent = document.querySelector("#hidden-content");

  if (hiddenContent) {
    hiddenContent.classList.remove("hidden-content");
    this.style.opacity = "0";
    setTimeout(() => {
      this.style.display = "none";
    }, 500);
  }
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 6500); // Cambia immagine ogni 6.5 secondi
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.style.top = "100%"; // Inizia dal fondo della pagina
  document.querySelector(".heart-bg").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

setInterval(createHeart, 300);

// Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

const contentContainers = document.querySelectorAll(".content-container");
contentContainers.forEach((container) => {
  observer.observe(container);
});

// Function to show slides in content containers
let contentSlideIndexes = [0, 0, 0, 0]; // Initialize slide indexes for each content slideshow
const contentSlideshows = document.querySelectorAll(".content-slideshow");

function showContentSlides() {
  contentSlideshows.forEach((slideshow, index) => {
    let slides = slideshow.getElementsByClassName("content-slide");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    contentSlideIndexes[index]++;
    if (contentSlideIndexes[index] > slides.length) {
      contentSlideIndexes[index] = 1;
    }
    slides[contentSlideIndexes[index] - 1].style.display = "block";
  });
  setTimeout(showContentSlides, 5000); // Cambia immagine ogni 5 secondi
}
// Grazie di tutto
showContentSlides();
