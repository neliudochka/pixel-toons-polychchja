import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PicturePainter } from './picturePainter.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells,
} from './picture&components.js';

const CanvasOptions = {
  'canvas': {
    name: 'canvas',
    type: 'canvas',
    container: 'canvas-container',
    handler: '(event) => this.drawPixel(event)'
  },
  'palitra': {
    name: 'palitra',
    type: 'canvas',
    container: 'palitra-container',
    handler: '(event) => this.pickColor(event)'
  }
};

class Application {
  constructor(options) {
    this.options = options;
    this.picPainter = new PicturePainter(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette), this.options, CanvasOptions.canvas);
    this.setUpButtons();
    this.setUpPalitra();
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

  setUpPalitra() {
    const pallete = this.options.palette;
    const lenght = pallete.length;
    const height = 1;

    const palitraPic = new Picture(lenght, height, pallete);
    increasingAgeCells(lenght).map((i) => palitraPic.pixels[i].setAge(i));
    console.log(palitraPic);
    this.palitra = new PicturePainter(palitraPic, this.options,
      CanvasOptions.palitra);
  }
}


//olly for palitra
function increasingAgeCells(size) {
  return [...new Array(size).keys()];
}

export { Application };
