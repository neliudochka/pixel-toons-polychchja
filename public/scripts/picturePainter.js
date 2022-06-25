import { Canvas } from './canvas.js';


class PicturePainer {
  constructor(picture, options) {
    this.options = options;
    this.canvas = new Canvas(this).canvas;
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
}


export { PicturePainer };
