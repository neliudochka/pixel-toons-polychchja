const CONTEXT = '2d';


class PicturePainter {
  constructor(commonOpt, canvas, picture) {
    this.options = commonOpt;
    canvas.bindPicPainter(this);
    this.canvas = canvas.canvas;
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
    const ctx = canvas.getContext(CONTEXT);

    this.picture.pixel(x, y).setAge(this.options.ageBrush);
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
    const ctx = this.canvas.getContext(CONTEXT);
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

  changeAgeBrush({ x, y }) {
    this.options.ageBrush = this.picture.pixel(x, y).age;
  }
}


export { PicturePainter };
