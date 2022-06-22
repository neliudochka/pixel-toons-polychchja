//незабаром заміню перепишу алгоритм отримання розмірів пікселів
//і додам можливість обирати палетки різних кольорів
const options = {
  pixelSize: 50,
  palette: ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902']
};

class Options {
  constructor(canvasHeight) {
    this.pixelSize = options.pixelSize;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth(canvasHeight);
    this.palette = options.palette;
  }

  setCanvasWidth(canvasHeight) {
    this.canvasWidth = Math.round(canvasHeight / 2);
    //потрібно для reflect і прямокутних форм
    this.fullCanvasWidth = canvasHeight;
  }
}

export { Options };
