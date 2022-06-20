import { options } from './index.js';

class PictureCanvas {
  constructor(picture) {
    this.canvas = createCanvas(picture);
    this.updateStatus(picture);
  }

  updateStatus(picture) {
    if (this.picture === picture) {
      return;
    } else {
      this.picture = picture;
      drawPicture(picture, this.canvas);
    }
  }
}

function createCanvas(picture) {
  const canvas = document.createElement('canvas');
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.appendChild(canvas);
  canvas.addEventListener('mousedown', (event) => drawPixel(event, picture));
  return canvas;
}

function drawPixel(event, picture) {
  const coord = getMousePosition(event);
  changePixelColor(coord, event, picture);
}

function getMousePosition(event) {
  const canPos = event.target.getBoundingClientRect();
  return {
    x: Math.floor((event.clientX - canPos.left) / options.pixelSize),
    y: Math.floor((event.clientY - canPos.top) / options.pixelSize)
  };
}

function changePixelColor({ x, y }, event, picture) {
  const canvas = event.target;
  const ctx = canvas.getContext('2d');
  picture.pixels[x + y * picture.width].state = 1;

  ctx.fillStyle = picture.pixel(x, y).color();
  ctx.fillRect(
    x * options.pixelSize,
    y * options.pixelSize,
    options.pixelSize,
    options.pixelSize);
}

function drawPicture(picture, canvas) {
  canvas.width = picture.width * options.pixelSize;
  canvas.height = picture.height * options.pixelSize;
  const ctx = canvas.getContext('2d');
  canvas.style.backgroundColor = 'green';
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y).color();
      ctx.fillRect(
        x * options.pixelSize,
        y * options.pixelSize,
        options.pixelSize,
        options.pixelSize);
    }
  }
}

export { PictureCanvas };
