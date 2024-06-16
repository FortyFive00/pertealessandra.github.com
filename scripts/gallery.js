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
    const galleryItem = createGalleryItem();

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

  // Add the video items to gallery-container
  const videoElements = CreateVideoItems();

  // Access through videoElements list and append into container

  videoElements.forEach((videoElement) => {
    const galleryItem = createGalleryItem();
    galleryItem.append(videoElement);
    galleryContainer.append(galleryItem);
  });

  // Add the divider here
  const dividerElement = createDividerItem(null, true);
  galleryContainer.append(dividerElement);
};

const createGalleryItem = () => {
  const galleryItem = document.createElement("div");
  galleryItem.className = "gallery-item";

  return galleryItem;
};

const createDividerItem = (index, isLast = false) => {
  const data = dividerData;

  if (!data) {
    console.error("divider data doesn't exist");
    return;
  }

  const dividerItem = document.createElement("div");
  dividerItem.className = "divider-text";

  if (!data[index] && !isLast) {
    console.error("Index: " + index + " does not exist in divider data");
    return;
  }

  let textNode = "";
  if (!isLast) {
    textNode = document.createTextNode(data[index]);
  } else {
    const lastDividerData = dividerData[dividerData.length - 1];
    let lastDividerHtml = `${lastDividerData.first} <br> ${lastDividerData.second}`;

    textNode = dividerItem.innerHTML = lastDividerHtml;
  }

  dividerItem.append(textNode);

  return dividerItem;
};

const CreateVideoItems = () => {
  const data = videoData;
  let videoElements = [];

  data.forEach((video) => {
    // const galleryItem = document.createElement("div");
    // galleryItem.className = "gallery-item";

    const videoItem = document.createElement("video");
    videoItem.src = video.path;

    videoItem.muted = true;
    videoItem.autoplay = true;
    videoItem.controls = true;
    videoItem.loop = true;

    // galleryItem.append(videoItem);
    // galleryContainer.append(galleryItem);

    videoElements.push(videoItem);
  });

  if (data.length != videoElements.length) {
    console.error("Something went wrong creating the videos");
    return;
  }

  return videoElements;
};

createGalleryItems();
