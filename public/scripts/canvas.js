class Canvas {
  constructor(picPainter, CanvasOptions) {
    this.picPainter = picPainter;
    this.pixelSize  = this.picPainter.options.pixelSize;
    this.createCanvas(CanvasOptions);
  }


  createCanvas(CanvasOptions) {
    const element = document.createElement(CanvasOptions.type);
    const container = document.getElementById(CanvasOptions.container);
    container.appendChild(element);
    element.addEventListener('mousedown', eval(CanvasOptions.handler));
    this.canvas = element;
  }

  drawPixel(event) {
    const coord = this.getMousePosition(event);
    this.picPainter.changePixelColor(coord, event);
  }

  pickColor() {
    const coord = this.getMousePosition(event);
    this.picPainter.changeAgeBrush(coord, event);
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
