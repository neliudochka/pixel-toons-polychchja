import { Cell } from './cell.js';

class Picture {
  constructor(width, height, pallete, pixels) {
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.pixels = pixels || fillPicture(this, deadCells, pallete).pixels;
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }

  copy() {
    return new Picture(this.width,
      this.height, this.pallete, this.pixels.map((cell) => cell.copy()));
  }
}


function fillPicture(picture, func, pallete) {
  let newPicture = {};
  if (picture.pixels) {
    newPicture = picture.copy();
  } else { newPicture = picture; }
  newPicture.pixels = func(picture.size).map((val) => new Cell(val, pallete));
  return newPicture;
}

function deadCells(size) {
  return new Array(size).fill(0);
}

function randomCells(size) {
  const array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = Math.round(Math.random());
  }
  return array;
}


export { Picture };
export { fillPicture };
export { deadCells };
export { randomCells };
