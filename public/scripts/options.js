import { Color } from './color.js';
//незабаром заміню перепишу алгоритм отримання розмірів пікселів
//і додам можливість обирати палетки різних кольорів
const options = {
  pixelSize: 50,
  palette: ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902']
};

class Options {
  constructor(canvasHeight, deadColor, aliveColor, hueNumber) {
    canvasHeight = parseInt(canvasHeight);
    hueNumber = parseInt(hueNumber);
    console.log(typeof canvasHeight);
    this.pixelSize = options.pixelSize;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth();
    this.palette = options.palette;
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
    console.log('alive', aliveHSL);
    for (let i = 2; i < 2 + hueNumber; i++) {
      const hueHSL = aliveHSL;
      hueHSL.L = aliveHSL.L - interval;
      console.log('hue', hueHSL);
      console.log(Color.fromHSL(hueHSL).toHex());
      const hue = Color.fromHSL(hueHSL).toHex();
      this.palette.push(hue);
      hueNumber--;
    }
  }
}

export { Options };
