class Canvas {
  constructor(typeOpt) {
    this.createCanvas(typeOpt);
  }

  createCanvas(typeOpt) {
    const element = document.createElement(typeOpt.type);
    const container = document.getElementById(typeOpt.container);
    container.appendChild(element);
    element.addEventListener('mousedown',
      (event) => this.callMouseDown(event));
    this.canvas = element;
  }

  callMouseDown() {
    console.log('you are a fool! you need to use child class!!');
  }

  bindPicPainter(picPainter) {
    this.picPainter = picPainter;
    console.log(picPainter);
    this.pixelSize  = this.picPainter.options.pixelSize;
  }

  getMousePosition(event) {
    const canPos = event.target.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - canPos.left) / this.pixelSize),
      y: Math.floor((event.clientY - canPos.top) / this.pixelSize)
    };
  }

}

class Polotno extends Canvas {
  callMouseDown(event) {
    console.log('polotno');
    this.drawPixel(event);
  }

  drawPixel(event) {
    const coord = this.getMousePosition(event);
    this.picPainter.changePixelColor(coord, event);
  }
}

class Palitra extends Canvas {
  callMouseDown(event) {
    console.log('palitra');
    this.pickColor(event);
  }

  pickColor(event) {
    const coord = this.getMousePosition(event);
    this.picPainter.changeAgeBrush(coord, event);
  }
}

export { Polotno };
export { Palitra };
