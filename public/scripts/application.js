import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PicturePainter } from './picturePainter.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells,
} from './picture&components.js';

const CavasType = {
  canvas: 'canvas',
  palitra: 'palitra'
};

class Application {
  constructor(options) {
    this.options = options;
    this.picPainter = new PicturePainter(new Picture(this.options.canvasWidth,
      this.options.canvasHeight,
      this.options.palette), this.options, CavasType.canvas);
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
    increasingNumbArr(lenght).map((i) => palitraPic.pixels[i].setAge(i));
    this.palitra = new PicturePainter(palitraPic, this.options,
      CavasType.palitra);
  }
}


//придумати куди засунути
function increasingNumbArr(size) {
  return [...new Array(size).keys()];
}

export { Application };
