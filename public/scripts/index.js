import { gameOfLife } from "./gameOfLife.js";
import { reflectPicture } from "./reflect.js";
import { Picture, fillPicture, randomCells, deadCells} from "./picture&components.js";

//canvas parametrs
const options = {
  pixelSize: 50,
  canvasWidth:6,
  canvasHeight: 12,
  canvasColor1: '#FFFFFF',
  canvasColor2: '#f7c0bc',
  brushColor: '#0000FF',
  palette: ['#FFFFFF','#fc3005','#dc2802','#9b1d02', '#731902']
 }


const canvas = document.createElement('canvas');
const canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');

function draw (picture, canvas) {
  canvas.width = picture.width * options.pixelSize;
  canvas.height = picture.height * options.pixelSize;
  canvas.style.backgroundColor = 'green';
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y).color();
      ctx.fillRect(x * options.pixelSize, y * options.pixelSize, options.pixelSize, options.pixelSize);
    }
  }
}

const picture = new Picture(options.canvasWidth, options.canvasHeight, options.palette);

draw(picture, canvas);

//buttons
const gameOfLifeButton = document.getElementById("game-of-life");
gameOfLifeButton.addEventListener("click", () => draw(gameOfLife(picture), canvas));

const reflectButton = document.getElementById("reflect");
reflectButton.addEventListener("click", () => draw(reflectPicture(picture), canvas));

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", () => draw(fillPicture(picture, randomCells, options.palette), canvas));


const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => draw(fillPicture(picture, deadCells, options.palette), canvas));

/*
canvas.addEventListener("mousedown", getMousePosition);

function getMousePosition (event) {
  const canPos = canvas.getBoundingClientRect();
  console.log(canPos);
  const coord = {
    x: Math.floor((event.clientX-canPos.left)/pixelSize),
    y: Math.floor((event.clientY-canPos.top)/pixelSize)
  };
  console.log(coord)
  changePixelColor(coord.x, coord.y);
}

function changePixelColor (x, y) {
  picture.pixels[x + y * picture.width] = brushColor;
  ctx.fillStyle = picture.pixel(x, y);
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  console.log(picture.pixels);
}


//algorithms
//переписати так, щоб фон фон продовжував йти шахмоткою?




//gameoflive
function gameOfLife (picture){
  const firstGen = picture.pixels;
  const arraySize = picture.width*picture.height;
  const arrayWidth = picture.width;
  const arrayHeight = picture.height;
  const secondGen = new Array(arraySize);

  //count alive neighbors for each cell

  for (let i = 0; i < arraySize; i++) {
    secondGen[i] = countAlive(firstGen, i, arrayWidth, arrayHeight)
  }
}



//tests
const p = new Picture(5,5);
console.log({w: p.width, h: p.height, pixels: p.pixels});

grid(p);
console.log(countAlive(p.pixels, 4, 5, 25));
*/