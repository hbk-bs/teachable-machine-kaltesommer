let video;
let label = "Waiting...";
let currentColor = "white";
let model;

const URL = "https://teachablemachine.withgoogle.com/models/VOQjAedL9/";

const objects = [
  document.getElementById("fishes"),
  document.getElementById("fishes-1"),
  document.getElementById("fishes-2"),
  document.getElementById("bubble")
];

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
    currentColor = colorMap[label]?.col || "white";
    document.getElementById("label-output").innerText = `Detected Color: ${label}`;
  }
  setTimeout(predictLoop, 200);
}

// Wait for each SVG object to load, then add click listeners
objects.forEach(obj => {
  obj.addEventListener("load", () => {
    const svgDoc = obj.contentDocument;
    if (!svgDoc) return;

    const clickableElements = svgDoc.querySelectorAll("path, rect, circle, polygon");

    clickableElements.forEach(el => {
      el.style.cursor = "pointer";
      el.addEventListener("click", () => {
        console.log("Clicked element in", obj.id, "with color:", currentColor);
        el.setAttribute("fill", currentColor);
        document.getElementById("correct-sound").play();
      });
    });
  });
});
