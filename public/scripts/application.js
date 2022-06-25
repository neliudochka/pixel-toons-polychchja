import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PicturePainer } from './picturePainter.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells } from './picture&components.js';


//for button initialization



class Application {
  constructor(options) {
    this.options = options;
    this.picCanv = new PicturePainer(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette), this.options);
    this.setUpButtons();
  }

  setUpButtons() {
    const buttonsId = ['restart', 'random', 'reflect', 'game-of-life'];
    const handlers = {
      'restart': () => this.picCanv.updateStatus(fillPicture(this.picCanv
        .picture, deadCells, this.options.palette)),
      'random':  () => this.picCanv.updateStatus(fillPicture(this.picCanv
        .picture, randomCells, this.options.palette)),
      'reflect': () => this.picCanv
        .updateStatus(reflectPicture(this.picCanv)),
      'game-of-life': () => this.picCanv
        .updateStatus(gameOfLife(this.picCanv.picture))
    };

    buttonsId.map((id) =>  document.getElementById(id)
      .addEventListener('click', handlers[id]));
  }
}

export { Application };
