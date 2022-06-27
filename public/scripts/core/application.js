import { PicturePainter } from './picturePainter.js';
import { Polotno, Palitra } from './canvas.js';
import { Picture,
  fillPicture,
  randomCells,
  deadCells } from './picture&components.js';
import { reflectPicture } from '../algorithms/reflect.js';
import { gameOfLife } from '../algorithms/gameOfLife.js';


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

    this.polotno = new PicturePainter(
      this.options.common,
      new Polotno(polOpt),
      new Picture(polOpt.polotnoWidth, polOpt.polotnoHeight, this.palette)
    );
  }

  createPalitra() {
    const palOpt = this.options.palitra;

    const palitraPic = new Picture(palOpt.length,
      palOpt.height,
      this.palette);

    for (let i = 0; i < palOpt.length; i++) {
      palitraPic.pixels[i].setAge(i);
    }

    this.palitra = new PicturePainter(
      this.options.common,
      new Palitra(palOpt),
      palitraPic
    );
  }

  createButtons() {
    const buttonsId = ['restart', 'random', 'reflect', 'game-of-life'];
    const handlers = {
      'restart': () => this.polotno.updateStatus(fillPicture(this.polotno
        .picture, deadCells, this.palette)),
      'random':  () => this.polotno.updateStatus(fillPicture(this.polotno
        .picture, randomCells, this.palette)),
      'reflect': () => this.polotno
        .updateStatus(reflectPicture(this.polotno.picture)),
      'game-of-life': () => this.polotno
        .updateStatus(gameOfLife(this.polotno.picture))
    };

    buttonsId.map((id) =>  document.getElementById(id)
      .addEventListener('click', handlers[id]));
  }


}


export { Application };
