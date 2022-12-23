let nextImages = [
  "/candyland.png",
  "/mojito.png",
  "/rainbow.png",
  "/santorini.png",
  "/summer.png",
];

function getRandomImage() {
  let randomNum = Math.floor(Math.random() * nextImages.length);
  console.log("the random num", randomNum);
  // console.log('🚀 ~ file: getRandomImage.js:13 ~ getRandomImage ~ nextImages[randomNum]', nextImages[randomNum])
  return nextImages[randomNum];
}

export default getRandomImage;
