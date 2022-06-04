const pixelSize = 20;
const brushColor = '#0000FF';

let canvas = document.createElement('canvas');
let canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

const picture = {
  height: 5,
  width: 5,
  pixels: ['#000000', '#000000', '#FFFFFF','#000000','#FFFFFF','#000000','#FFFFFF','#000000','#FFFFFF'],
  pixel(x, y){
    return this.pixels[x + y * this.width];
  }
};

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




