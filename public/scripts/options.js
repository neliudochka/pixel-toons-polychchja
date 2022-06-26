import { Color } from './color.js';
import { CellState } from './cell.js';

const Scale = 50;
const CanvasOptions = {
  'canvas': {
    type: 'canvas',
    container: 'canvas-container',
    handler: '(event) => this.drawPixel(event)'
  },
  'palitra': {
    type: 'canvas',
    container: 'palitra-container',
    handler: '(event) => this.pickColor(event)'
  }
};


class Options {
  constructor(canvasHeight, deadColor, aliveColor, hueNumber) {
    canvasHeight = parseInt(canvasHeight);
    hueNumber = parseInt(hueNumber);

    this.pixelSize = Scale;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth();
    this.setPallette(deadColor, aliveColor, hueNumber);

    //brush changes the color of the cell based on its age
    this.ageBrush = CellState.newBornAge;

    //option for different type of canvaces
    this.CanvasOptions = CanvasOptions;
  }

  setCanvasWidth() {
    this.canvasWidth = Math.round(this.canvasHeight / 2);
    //потрібно для reflect і в майбутньому для прямокутних форм
    this.fullCanvasWidth = this.canvasHeight;
  }

  setPallette(deadColor, aliveColor, hueNumber) {
    this.palette = [deadColor, aliveColor];

    const aliveHSL = Color.fromHex(aliveColor).toHSL();
    const interval = aliveHSL.L / hueNumber;
    for (let i = 1; i < hueNumber; i++) {
      const newHSL = Color.fromHex(this.palette[i]).toHSL();
      newHSL.L -= interval;
      this.palette[i + 1] = Color.fromHSL(newHSL).toHex();
    }
  }
}

export { Options };
