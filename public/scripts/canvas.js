class Canvas {
  constructor(typeOpt) {
    this.createCanvas(typeOpt);
  }


  createCanvas(typeOpt) {
    const element = document.createElement(typeOpt.type);
    const container = document.getElementById(typeOpt.container);
    container.appendChild(element);
    element.addEventListener('mousedown',
      (event) => typeOpt.handler(event, this));
    this.canvas = element;
  }

  bindPicPainter(picPainter) {
    this.picPainter = picPainter;
    console.log(picPainter);
    this.pixelSize  = this.picPainter.options.pixelSize;
  }

  drawPixel(event) {
    const coord = this.getMousePosition(event);
    this.picPainter.changePixelColor(coord, event);
  }

  pickColor(event) {
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
