import { options } from './index.js';

class PictureCanvas {
  constructor(picture) {
    this.updateStatus(picture);
  }

  updateStatus(picture) {
    if (this.picture === picture) {
      return;
    } else {
      this.picture = picture;
      drawPicture(picture, this.checkCanvas(this.canvas));
    }
  }

  checkCanvas(canvas) {
    if (!canvas) this.canvas = createCanvas(this);
    return this.canvas;
  }
}

function createCanvas(picCanv) {
  const canvas = document.createElement('canvas');
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.appendChild(canvas);
  canvas.addEventListener('mousedown', (event) => drawPixel(event, picCanv));
  return canvas;
}

function drawPixel(event, picCanv) {
  const coord = getMousePosition(event);
  changePixelColor(coord, event, picCanv);
}

function getMousePosition(event) {
  const canPos = event.target.getBoundingClientRect();
  const coord = {
    x: Math.floor((event.clientX - canPos.left) / options.pixelSize),
    y: Math.floor((event.clientY - canPos.top) / options.pixelSize)
  };
  return coord;
}

function changePixelColor({ x, y }, event, picCanv) {
  const canvas = event.target;
  const ctx = canvas.getContext('2d');
  picCanv.picture.pixels[x + y * picCanv.picture.width].state = 1;
  ctx.fillStyle = picCanv.picture.pixel(x, y).color();
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
