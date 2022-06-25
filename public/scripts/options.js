import { Color } from './color.js';
//незабаром заміню перепишу алгоритм отримання розмірів пікселів
//і додам можливість обирати палетки різних кольорів
const options = {
  pixelSize: 50,
//  palette: ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902']
};

class Options {
  constructor(canvasHeight, deadColor, aliveColor, hueNumber) {
    canvasHeight = parseInt(canvasHeight);
    hueNumber = parseInt(hueNumber);
    this.pixelSize = options.pixelSize;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth();
    this.setPallette(deadColor, aliveColor, hueNumber);
    console.log(this.palette);
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
