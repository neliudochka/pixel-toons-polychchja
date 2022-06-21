class Options {
  constructor(canvasHeight) {
    this.pixelSize = 50;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth(canvasHeight);
    this.palette = ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902'];
  }

  setCanvasWidth(canvasHeight) {
    this.canvasWidth = Math.round(canvasHeight / 2);
    //потрібно для reflect і прямокутних форм
    this.fullCanvasWidth = canvasHeight;
  }
}

export { Options };
