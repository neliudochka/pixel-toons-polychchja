import { Color } from './color.js';
import { CellState } from './cell.js';

const Scale = 50;
const CanvasOptions = {
  'polotno': {
    type: 'canvas',
    container: 'polotno-container',
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

    //option for different type of canvaces (canvas||palitra)
    this.canvas = CanvasOptions.polotno;
    this.palitra = CanvasOptions.palitra;
    this.common = {};

    this.setUpPalette(deadColor, aliveColor, hueNumber);

    this.setUpCommonOptions();
    this.setUpCanvasOptions(canvasHeight);
    this.setUpPalitraOptions();
  }

  setUpCommonOptions() {
    this.common.pixelSize = Scale;
    //brush changes the color of the cell based on its age
    this.common.ageBrush = CellState.NEW_BORN_AGE;

  }

  setUpPalette(deadColor, aliveColor, hueNumber) {
    const palette = [deadColor, aliveColor];

    const aliveHSL = Color.fromHex(aliveColor).toHSL();
    const interval = aliveHSL.L / hueNumber;
    for (let i = 1; i < hueNumber; i++) {
      const newHSL = Color.fromHex(palette[i]).toHSL();
      newHSL.L -= interval;
      palette[i + 1] = Color.fromHSL(newHSL).toHex();
    }
    this.common.palette = palette;
  }

  setUpCanvasOptions(canvasHeight) {
    this.canvas.canvasHeight = canvasHeight;
    this.canvas.canvasWidth = Math.round(canvasHeight / 2);
    //потрібно для reflect і в майбутньому для прямокутних форм
    this.canvas.fullCanvasWidth = canvasHeight;
  }

  setUpPalitraOptions() {
    this.palitra.length = this.common.palette.length;
    this.palitra.height = 1;
  }

}

export { Options };
