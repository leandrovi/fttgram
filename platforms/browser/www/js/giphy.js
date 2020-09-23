const GIPHY_API_KEY= "6b6CPBQgLXtRFlDBObqUvyeJbh16bpow";

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
  imageUserImg.src = image.user.avatar_url;
  imageUserImg.alt = image.user.username;

  const imageUserName = document.createElement("a");
  imageUserName.classList.add("image-user-name");
  imageUserName.href = image.user.profile_url;

  const imageUserNameText = document.createTextNode(image.user.username);

  imageUserName.appendChild(imageUserNameText);
  imageUserDiv.appendChild(imageUserImg);
  imageUserDiv.appendChild(imageUserName);

  // Image Content Div
  const imageContentDiv = document.createElement("div");
  imageContentDiv.classList.add("image-content");

  const imageContentImg = document.createElement("img");
  imageContentImg.src = image.images.fixed_height.url;
  imageContentImg.alt = image.title;

  imageContentDiv.appendChild(imageContentImg);

  // Image Info Div
  const imageInfoDiv = document.createElement("div");
  imageInfoDiv.classList.add("image-info");

  const imageInfoName = document.createElement("a");
  imageInfoName.classList.add("image-user-name");
  imageInfoName.href = image.user.profile_url;

  const imageInfoNameText = document.createTextNode(image.user.username);
  imageInfoName.appendChild(imageInfoNameText);

  const imageInfoDescription = document.createElement("p");
  const imageInfoDescriptionText = document.createTextNode(image.title);
  imageInfoDescription.appendChild(imageInfoDescriptionText);

  const imageInfoDaysAgoSpan = document.createElement("span");
  const imageDate = image.import_datetime;
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
  const url = new URL("https://api.giphy.com/v1/gifs/trending");

  const params = {
    limit: 18,
    api_key: GIPHY_API_KEY
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
    console.log(response);
    const images = await response.json();

    loaderElement.classList.remove("active");

    return images.data;
  } catch (err) {
    loaderElement.classList.remove("active");
    console.log(error);
  }
}

window.onload = async e => {
  const images = await getUnsplashImages();

  if (!!images) {
    for (const image of images) {
      createImageComponent(image);
    }
  }
}
