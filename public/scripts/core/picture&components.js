import { Cell } from './cell.js';

class Picture {
  constructor(width, height, palette, pixels) {
    this.width = width;
    this.height = height;
    this.size = width * height;
    this.palette = palette;
    this.pixels = pixels || fillPicture(this, deadCells, palette).pixels;
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }

  clone() {
    return new Picture(this.width,
      this.height, this.palette, this.pixels.map((cell) => cell.clone()));
  }
}


function fillPicture(picture, fn, palette) {
  let newPicture = picture;
  if (picture.pixels) {
    newPicture = picture.clone();
  }
  newPicture.pixels = fn(picture.size).map((val) => new Cell(palette, val,));
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
