let video;
let label = "Waiting...";
let currentColor = "white";
let model;

const URL = "https://teachablemachine.withgoogle.com/models/VOQjAedL9/";

const svgImg1 = document.getElementById("fishes");
const svgImg2 = document.getElementById("fishes-1");
const svgImg3 = document.getElementById("fishes-2");
const svgImg4 = document.getElementById("bubble");

const bildschirm = document.getElementById("bildschirm")

svgImg1.style.backgroundColor = "white";
svgImg2.style.backgroundColor = "white";
svgImg3.style.backgroundColor = "white";
svgImg4.style.backgroundColor = "white";

svgImg1.addEventListener('click', () => {
  console.log("Clicked svgImg1 with color:", currentColor);
  svgImg1.style.backgroundColor = currentColor;
});

svgImg2.addEventListener('click', () => {
  console.log("Clicked svgImg2 with color:", currentColor);
  svgImg2.style.backgroundColor = currentColor;
});

svgImg3.addEventListener('click', () => {
  console.log("Clicked svgImg3 with color:", currentColor);
  svgImg3.style.backgroundColor = currentColor;
});

svgImg4.addEventListener('click', () => {
  console.log("Clicked svgImg4 with color:", currentColor);
  svgImg4.style.backgroundColor = currentColor;
});
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



const colorMap = {
  "red": { num: 1, col: "#ff4c4c" },
  "yellow": { num: 2, col: "#ffe600" },
  "blue": { num: 3, col: "#4c6cff" },
  "purple": { num: 4, col: "#800080" },
  "green": { num: 5, col: "#4cff4c" },
  "orange": { num: 6, col: "#ffa500" },
  "pink": { num: 7, col: "#ffc0cb" },
  "black": { num: 8, col: "#000000" }
};

function setup() {
  let canvas = createCanvas(320, 240);
  canvas.parent("p5-container");

  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide(); 

  loadModel2();
}


function draw() {
  background(255);
  image(video, 0, 0);
}

async function loadModel2() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  model = await tmImage.load(modelURL, metadataURL);
  predictLoop();
}

async function predictLoop() {
  if (video && video.elt && model) {
    const prediction = await model.predict(video.elt);
    prediction.sort((a, b) => b.probability - a.probability);
    label = prediction[0].className;
    console.log(label)
    currentColor = colorMap[label].col;
    document.getElementById("label-output").innerText = `Detected Color: ${label}`;
  }
  setTimeout(predictLoop, 200);
}