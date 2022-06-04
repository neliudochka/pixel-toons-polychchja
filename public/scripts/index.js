const brushColor = '#0000FF';

//canvas parametrs
const pixelSize = 50;
const canvasWidth = 5;
const canvasHeight = 5;
const canvasColor1 = '#FFFFFF';
const canvasColor2 = '#f7c0bc';

let canvas = document.createElement('canvas');
let canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

class Picture {
  constructor(width, height, pixels = []) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  
  pixel(x, y){
    return this.pixels[x + y * this.width];
  }
}

//background
function backGr (width, height) {
  const pixels = new Array(width*height).fill(canvasColor1);
  for (let index = 0; index < width*height; index += width) {
    if((index/width)%2 === 0) {
      console.log(index);
      for (let i = 0; i < width; i++) {
        if (i%2 === 0) pixels[index+i] = canvasColor2;
      }
    }
    else {
      for (let i = 0; i < width; i++) {
        if (i%2 != 0) pixels[index+i] = canvasColor2;
      }
    }
  }
  return pixels; 
}

const picture = new Picture( canvasWidth, canvasHeight, backGr(canvasWidth,canvasHeight));

function createCanvas (picture, canvas) {
  canvas.width = picture.width * pixelSize;
  canvas.height = picture.height * pixelSize;
  canvas.style.backgroundColor = 'green';
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y);
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

createCanvas(picture, canvas);

console.log(canvas.getBoundingClientRect());

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




