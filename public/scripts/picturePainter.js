import { Canvas } from './canvas.js';


class PicturePainer {
  constructor(picture, options) {
    this.options = options;
    this.canvas = new Canvas(this).canvas;
    console.log('picPainter constuctor', this.canvas);
    this.updateStatus(picture);
  }

  updateStatus(picture) {
    if (this.picture === picture) {
      return;
    } else {
      this.picture = picture;
      this.drawPicture(picture);
    }
  }

  changePixelColor({ x, y }, event) {
    const canvas = event.target;
    const ctx = canvas.getContext('2d');

    this.picture.pixel(x, y).state = 1;
    ctx.fillStyle = this.picture.pixel(x, y).color();
    ctx.fillRect(
      x * this.options.pixelSize,
      y * this.options.pixelSize,
      this.options.pixelSize,
      this.options.pixelSize);
  }

  drawPicture() {
    const pixelSize = this.options.pixelSize;

    this.canvas.width = this.picture.width * pixelSize;
    this.canvas.height = this.picture.height * pixelSize;
    const ctx = this.canvas.getContext('2d');
    for (let y = 0; y < this.picture.height; y++) {
      for (let x = 0; x < this.picture.width; x++) {
        ctx.fillStyle = this.picture.pixel(x, y).color();
        ctx.fillRect(
          x * pixelSize,
          y * pixelSize,
          pixelSize,
          pixelSize);
      }
    }
  }

  fuckingShit() {
    console.log('bitch, you better be joking');
  }
}




/*
function createCanvas(picPainter) {
  const canvas = document.createElement('canvas');
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.appendChild(canvas);
  canvas.addEventListener('mousedown', (event) => drawPixel(event, picPainter));
  return canvas;
}

function drawPixel(event, picCanv) {
  const coord = getMousePosition(event, picCanv.options);
  changePixelColor(coord, event, picCanv);
}

function getMousePosition(event, options) {
  const canPos = event.target.getBoundingClientRect();
  return {
    x: Math.floor((event.clientX - canPos.left) / options.pixelSize),
    y: Math.floor((event.clientY - canPos.top) / options.pixelSize)
  };
}

function changePixelColor({ x, y }, event) {
  const canvas = event.target;
  const ctx = canvas.getContext('2d');


  const picture = this.picPainter.picture;
  picture.pixels[x + y * picture.width].state = 1;
  ctx.fillStyle = picture.pixel(x, y).color();
  ctx.fillRect(
    x * this.picCanv.options.pixelSize,
    y * this.picCanv.options.pixelSize,
    this.picCanv.options.pixelSize,
    this.picCanv.options.pixelSize);
}

function changePixelColor({ x, y }, event, picCanv) {
  const canvas = event.target;
  const ctx = canvas.getContext('2d');
  picCanv.picture.pixels[x + y * picCanv.picture.width].state = 1;
  ctx.fillStyle = picCanv.picture.pixel(x, y).color();
  ctx.fillRect(
    x * picCanv.options.pixelSize,
    y * picCanv.options.pixelSize,
    picCanv.options.pixelSize,
    picCanv.options.pixelSize);
}


*/



export { PicturePainer };
