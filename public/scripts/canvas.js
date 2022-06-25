class Canvas {
  constructor(picPainter) {
    this.picPainter = picPainter;
    this.pixelSize  = this.picPainter.options.pixelSize;
    this.createCanvas();
  }


  //I`ll rewrite this one
  createCanvas() {
    const canvas = document.createElement('canvas');
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.appendChild(canvas);
    canvas.addEventListener('mousedown',
      (event) => this.drawPixel(event));
    this.canvas = canvas;
  }

  drawPixel(event) {
    const coord = this.getMousePosition(event);
    this.picPainter.changePixelColor(coord, event);
  }

  getMousePosition(event) {
    const canPos = event.target.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - canPos.left) / this.pixelSize),
      y: Math.floor((event.clientY - canPos.top) / this.pixelSize)
    };
  }
}

export { Canvas };
