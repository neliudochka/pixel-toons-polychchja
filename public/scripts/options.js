import { Color } from './color.js';
import { CellState } from './cell.js';

const Scale = 50;
const CanvasOptions = {
  'polotno': {
    type: 'canvas',
    container: 'polotno-container',
    handler(event) { console.log('log') },
    //this.drawPixel(event);
  },
  'palitra': {
    type: 'canvas',
    container: 'palitra-container',
    handler: '(event) => this.pickColor(event)'
  }
};


class Options {
  constructor(polotnoHeight, deadColor, aliveColor, hueNumber) {
    polotnoHeight = parseInt(polotnoHeight);
    hueNumber = parseInt(hueNumber);

    //option for different type of canvaces (canvas||palitra)
    this.polotno = CanvasOptions.polotno;
    this.palitra = CanvasOptions.palitra;
    this.common = {};

    this.setUpPalette(deadColor, aliveColor, hueNumber);

    this.setUpCommonOptions();
    this.setUpPolotnoOptions(polotnoHeight);
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

  setUpPolotnoOptions(polotnoHeight) {
    this.polotno.polotnoHeight = polotnoHeight;
    this.polotno.polotnoWidth = Math.round(polotnoHeight / 2);
  }

  setUpPalitraOptions() {
    this.palitra.length = this.common.palette.length;
    this.palitra.height = 1;
  }

}

export { Options };
