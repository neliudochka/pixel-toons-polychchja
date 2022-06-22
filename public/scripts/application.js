import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PicturePainer } from './picturePainter.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells } from './picture&components.js';


class Application {
  constructor(options) {
    this.options = options;
    this.picCanv = new PicturePainer(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette), this.options);
    this.createButtons();
  }

  createButtons() {
    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click',
      () => this.picCanv.updateStatus(fillPicture(this.picCanv
        .picture, deadCells, this.options.palette)));

    const randomButton = document.getElementById('random');
    randomButton.addEventListener('click',
      () => this.picCanv.updateStatus(fillPicture(this.picCanv
        .picture, randomCells, this.options.palette)));

    const reflectButton = document.getElementById('reflect');
    reflectButton.addEventListener('click',
      () => this.picCanv
        .updateStatus(reflectPicture(this.picCanv)));

    const gameOfLifeButton = document.getElementById('game-of-life');
    gameOfLifeButton.addEventListener('click',
      () => this.picCanv.updateStatus(gameOfLife(this.picCanv.picture)));

  }
}

export { Application };
