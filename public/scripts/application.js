import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PictureCanvas } from './canvas.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells } from './picture&components.js';


// eslint-disable-next-line max-len
//функція повертатиме опції і вони будуть запихуватися в аплікейшн і все буде білдитися

class Application {
  constructor(options) {
    this.options = options;
    this.picCanv = new PictureCanvas(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette));
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
        .updateStatus(reflectPicture(this.picCanv.picture)));

    const gameOfLifeButton = document.getElementById('game-of-life');
    gameOfLifeButton.addEventListener('click',
      () => this.picCanv.updateStatus(gameOfLife(this.picCanv.picture)));
  }
}

export { Application };
