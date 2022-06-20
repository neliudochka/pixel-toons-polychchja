import { gameOfLife } from "./gameOfLife.js";
import { reflectPicture } from "./reflect.js";
import { Picture, Cell, fillPicture, randomCells, deadCells} from "./picture&components.js";
//import {} from "./draw.js";

//canvas parametrs
const options = {
  pixelSize: 50,
  canvasWidth:5,
  canvasHeight: 9,
  palette: ['#FFFFFF','#fc3005','#dc2802','#9b1d02', '#731902'],
  brush: new Cell(1, ['#FFFFFF','#fc3005','#dc2802','#9b1d02', '#731902'])
 }

// const picture.pixelSize=50;
 function drawPicture (picture, canvas) {
  canvas.width = picture.width * options.pixelSize;
  canvas.height = picture.height * options.pixelSize;
  const ctx = canvas.getContext('2d');
  canvas.style.backgroundColor = 'green';
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y).color();
      ctx.fillRect(x * options.pixelSize, y * options.pixelSize, options.pixelSize,options.pixelSize);
    }
  }
}

class PictureCanvas {
  constructor(picture) {
    this.canvas = createCanvas(picture);
    this.updateStatus(picture);
  }

  updateStatus(picture) {
    if(this.picture === picture) {
      console.log(this.picture,picture);
      console.log('d');
      return;
    }
      else {
      this.picture = picture;
      drawPicture(picture, this.canvas);
    }
  }
}

function createCanvas (picture){
  const canvas = document.createElement('canvas');
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.appendChild(canvas);
  canvas.addEventListener("mousedown", (event) => drawPixel(event, picture));
  return canvas;
};

function drawPixel (event, picture) {
  console.log(event);
  const coord = getMousePosition(event);
  changePixelColor(coord, event, picture);
}

function changePixelColor ({x, y}, event, picture) {
  const canvas = event.target;
  const ctx = canvas.getContext('2d');
  picture.pixels[x + y * picture.width].state = 1;

  ctx.fillStyle = picture.pixel(x, y).color();
  ctx.fillRect(x * options.pixelSize, y * options.pixelSize, options.pixelSize, options.pixelSize);
  console.log(picture.pixels);
  console.log(1, picCanv);
}

function getMousePosition (event) {
  const canPos = event.target.getBoundingClientRect();
  console.log(canPos);
  const coord = {
    x: Math.floor((event.clientX-canPos.left)/options.pixelSize),
    y: Math.floor((event.clientY-canPos.top)/options.pixelSize)
  };
  return coord;
}



const picture = new Picture(options.canvasWidth, options.canvasHeight, options.palette);
const picCanv = new PictureCanvas(picture);

//console.log(conv.picture);

//drawPicture(picture, canvas);

//buttons
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => picCanv.updateStatus(fillPicture(picCanv.picture, deadCells, options.palette)));

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", () => picCanv.updateStatus(fillPicture(picCanv.picture, randomCells, options.palette)));

const reflectButton = document.getElementById("reflect");
reflectButton.addEventListener("click", () => picCanv.updateStatus(reflectPicture(picCanv.picture)));

const gameOfLifeButton = document.getElementById("game-of-life");
gameOfLifeButton.addEventListener("click", () => picCanv.updateStatus(gameOfLife(picCanv.picture)));


export {picture};