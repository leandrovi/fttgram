const WALLHAVEN_API_KEY="bCA33iwg4ZpbFMVc2XdM4DvCGbyPjZJt";

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
  imageUserImg.src = image.thumbs.small;
  imageUserImg.alt = image.id;

  const imageUserName = document.createElement("a");
  imageUserName.classList.add("image-user-name");
  imageUserName.href = image.short_url;

  const imageUserNameText = document.createTextNode(
    `${image.category} - ${image.id}`
  );

  imageUserName.appendChild(imageUserNameText);
  imageUserDiv.appendChild(imageUserImg);
  imageUserDiv.appendChild(imageUserName);

  // Image Content Div
  const imageContentDiv = document.createElement("div");
  imageContentDiv.classList.add("image-content");

  const imageContentImg = document.createElement("img");
  imageContentImg.src = image.path;
  imageContentImg.alt = image.id;

  imageContentDiv.appendChild(imageContentImg);

  // Image Info Div
  const imageInfoDiv = document.createElement("div");
  imageInfoDiv.classList.add("image-info");

  const imageInfoName = document.createElement("a");
  imageInfoName.classList.add("image-user-name");
  imageInfoName.href = image.short_url;

  const imageInfoNameText = document.createTextNode(image.id);
  imageInfoName.appendChild(imageInfoNameText);

  const imageInfoDescription = document.createElement("p");
  const imageInfoDescriptionText = document.createTextNode(
    `WallHaven: ${image.category} - ${image.id}`
  );
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

async function getWallHavenImages() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = new URL("https://wallhaven.cc/api/v1/search");
  const params = {
    per_page: 18,
    client_id: WALLHAVEN_API_KEY
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
    const response = await fetch(proxyurl + url, fetchParams);
    const data = response.data;
    console.log(data)
    const images = []

    loaderElement.classList.remove("active");

    return images;
  } catch (err) {
    loaderElement.classList.remove("active");
    console.log(error);
  }
}

window.onload = async e => {
  const images = await getWallHavenImages();
  console.log(images)
  if (!!images) {
    for (const image of images) {
      createImageComponent(image);
    }
  }
}