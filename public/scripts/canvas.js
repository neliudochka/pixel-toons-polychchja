class Canvas {
  constructor(picPainter, typeOpt) {
    this.picPainter = picPainter;
    this.pixelSize  = this.picPainter.options.pixelSize;
    this.createCanvas(typeOpt);
  }


  createCanvas(typeOpt) {
    const element = document.createElement(typeOpt.type);
    const container = document.getElementById(typeOpt.container);
    container.appendChild(element);
    element.addEventListener('mousedown', () => typeOpt.handler());
    this.canvas = element;
  }

  /*
  handler() {

  }
*/

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
