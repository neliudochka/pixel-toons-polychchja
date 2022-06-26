import { gameOfLife } from './gameOfLife.js';
import { reflectPicture } from './reflect.js';
import { PicturePainter } from './picturePainter.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells } from './picture&components.js';
import { increasingNumbArr } from './myFunctions.js';


class Application {
  constructor(options) {
    this.options = options;
    //виношу, бо багато де використовується
    this.palette = options.common.palette;

    this.createPolotno();
    this.createPalitra();
    this.createButtons();
  }

  createPolotno() {
    const polOpt = this.options.polotno;

    this.picPainter = new PicturePainter(
      new Picture(polOpt.polotnoWidth, polOpt.polotnoHeight, this.palette),
      this.options.common, polOpt);
  }

  createPalitra() {
    const palOpt = this.options.palitra;

    console.log(palOpt);
    const palitraPic = new Picture(palOpt.length,
      palOpt.height, this.palette);
    increasingNumbArr(palOpt.length)
      .map((i) => palitraPic.pixels[i].setAge(i));
    this.palitra = new PicturePainter(palitraPic, this.options.common, palOpt);
  }

  createButtons() {
    const buttonsId = ['restart', 'random', 'reflect', 'game-of-life'];
    const handlers = {
      'restart': () => this.picPainter.updateStatus(fillPicture(this.picPainter
        .picture, deadCells, this.palette)),
      'random':  () => this.picPainter.updateStatus(fillPicture(this.picPainter
        .picture, randomCells, this.palette)),
      'reflect': () => this.picPainter
        .updateStatus(reflectPicture(this.picPainter.picture)),
      'game-of-life': () => this.picPainter
        .updateStatus(gameOfLife(this.picPainter.picture))
    };

    buttonsId.map((id) =>  document.getElementById(id)
      .addEventListener('click', handlers[id]));
  }


}


export { Application };
