import { CellAge } from './cell.js';
import { Color } from './color.js';

const SCALE = 50;
const CANVAS_OPTIONS = {
  polotno: {
    type: 'canvas',
    container: 'polotno-container',
    handler: (event, canv) => canv.drawPixel(event)
  },
  palitra: {
    type: 'canvas',
    container: 'palitra-container',
    handler: (event, canv) => canv.pickColor(event)
  }
};
const PALITRA_HEIGHT = 1;


class Options {
  constructor(polotnoHeight, deadColor, aliveColor, hueNumber) {
    polotnoHeight = parseInt(polotnoHeight);
    hueNumber = parseInt(hueNumber);

    //option for different type of canvaces (canvas||palitra)
    this.polotno = CANVAS_OPTIONS.polotno;
    this.palitra = CANVAS_OPTIONS.palitra;
    this.common = {};

    this.setUpPalette(deadColor, aliveColor, hueNumber);

    this.setUpCommonOptions();
    this.setUpPolotnoOptions(polotnoHeight);
    this.setUpPalitraOptions();
  }

  setUpCommonOptions() {
    this.common.pixelSize = SCALE;
    //brush changes the color of the cell based on its age
    this.common.ageBrush = CellAge.NEW_BORN_AGE;

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
    this.palitra.height = PALITRA_HEIGHT;
  }

}

export { Options };
