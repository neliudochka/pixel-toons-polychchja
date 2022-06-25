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
    this.picPainter = new PicturePainer(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette), this.options);
    this.setUpButtons();
  }

  setUpButtons() {
    const buttonsId = ['restart', 'random', 'reflect', 'game-of-life'];
    const handlers = {
      'restart': () => this.picPainter.updateStatus(fillPicture(this.picPainter
        .picture, deadCells, this.options.palette)),
      'random':  () => this.picPainter.updateStatus(fillPicture(this.picPainter
        .picture, randomCells, this.options.palette)),
      'reflect': () => this.picPainter
        .updateStatus(reflectPicture(this.picPainter)),
      'game-of-life': () => this.picPainter
        .updateStatus(gameOfLife(this.picPainter.picture))
    };

    buttonsId.map((id) =>  document.getElementById(id)
      .addEventListener('click', handlers[id]));
  }
}

export { Application };
