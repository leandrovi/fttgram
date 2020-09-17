const UNPLASH_API_KEY="";

const loaderElement = document.querySelector(".loader");
const listElement = document.querySelector("#image-thumb");

function getDifferenceBetweenDays(image_date) {
  const now = new Date(Date.now());
  const imageDate = new Date(image_date);

  const timeDifference = now.getTime() - imageDate.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const differenceBetweenDays = Math.round(daysDifference);

  return differenceBetweenDays;
}

function createImageComponent(image) {
  const lineElement = document.createElement("li");

  // Image User Div
  const imageUserDiv = document.createElement("div");
  imageUserDiv.classList.add("image-user");

  const imageUserImg = document.createElement("img");
  imageUserImg.src = image.user.profile_image.medium;
  imageUserImg.alt = image.user.username;

  const imageUserName = document.createElement("a");
  imageUserName.classList.add("image-user-name");
  imageUserName.href = image.user.links.html;

  const imageUserNameText = document.createTextNode(image.user.username);

  imageUserName.appendChild(imageUserNameText);
  imageUserDiv.appendChild(imageUserImg);
  imageUserDiv.appendChild(imageUserName);

  // Image Content Div
  const imageContentDiv = document.createElement("div");
  imageContentDiv.classList.add("image-content");

  const imageContentImg = document.createElement("img");
  imageContentImg.src = image.urls.small;
  imageContentImg.alt = image.alt_description;

  imageContentDiv.appendChild(imageContentImg);

  // Image Info Div
  const imageInfoDiv = document.createElement("div");
  imageInfoDiv.classList.add("image-info");

  const imageInfoName = document.createElement("a");
  imageInfoName.classList.add("image-user-name");
  imageInfoName.href = image.user.links.html;

  const imageInfoNameText = document.createTextNode(image.user.username);
  imageInfoName.appendChild(imageInfoNameText);

  const imageInfoDescription = document.createElement("p");
  const imageInfoDescriptionText = document.createTextNode(image.alt_description);
  imageInfoDescription.appendChild(imageInfoDescriptionText);

  const imageInfoDaysAgoSpan = document.createElement("span");
  const imageDate = image.created_at;
  const differenceBetweenDays = getDifferenceBetweenDays(imageDate);
  const imageInfoDaysAgoSpanText = document.createTextNode(differenceBetweenDays);
  imageInfoDaysAgoSpan.appendChild(imageInfoDaysAgoSpanText);
  const imageInfoDaysAgoDivText = document.createTextNode("days ago");

  const imageInfoDaysAgoDiv = document.createElement("div");
  imageInfoDaysAgoDiv.appendChild(imageInfoDaysAgoSpan);
  imageInfoDaysAgoDiv.appendChild(imageInfoDaysAgoDivText);

  imageInfoDiv.appendChild(imageInfoName);
  imageInfoDiv.appendChild(imageInfoDescription);
  imageInfoDiv.appendChild(imageInfoDaysAgoDiv);

  // Append All Divs
  lineElement.appendChild(imageUserDiv);
  lineElement.appendChild(imageContentDiv);
  lineElement.appendChild(imageInfoDiv);

  listElement.appendChild(lineElement);
}

async function getUnsplashImages() {
  const url = new URL("https://api.unsplash.com/photos");

  const params = {
    per_page: 18,
    client_id: UNPLASH_API_KEY
  };

  url.search = new URLSearchParams(params).toString();

  const fetchParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    mode: "cors",
  };

  try {
    const response = await fetch(url, fetchParams);

    const images = response.json();
    console.log(images);

    loaderElement.classList.remove("active");

    return images;
  } catch (err) {
    loaderElement.classList.remove("active");
    console.log(error);
  }
}

window.onload = async (e) => {
  const images = await getUnsplashImages();

  if (!!images) {
    for (const image of images) {
      console.log(image);
      createImageComponent(image);
    }
  }
}
