class Picture {
  constructor(width, height, pallete, pixels) {
    this.width = width;
    this.height = height;
    this.size = width*height;
    this.pixels = pixels || fillPicture(this, deadCells, pallete).pixels;
  }

  pixel(x, y){
    return this.pixels[x + y * this.width];
  }
}

class Cell {
  constructor(state = 'dead', palette) {
    this.state = state;
    this.palette = palette;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value === 'dead' || value === 0) {
      this._state = 'dead';
      this.age = 0;
    }
    if (value === 'alive' || value === 1) {
      this._state = 'alive';
      this.age = 1;
    }
  }

  isAlive () {
    if (this.state === 'dead') return 0;
    else return 1;
  }

  getOld () {
    if(this._state === 'alive') {
      this.age++;
    }
    // add smth for else?
  }

  color() {
    const arrLen = this.palette.length;
    if(this.age < arrLen) return this.palette[this.age];
    return this.palette[arrLen-1];
  }
}

function fillPicture (picture, func, pallete) {
  picture.pixels = func(picture.size).map(val => new Cell(val, pallete));
  return picture;
}

function deadCells (size) {
  const array = new Array(size).fill(0);
  return array;
}


function randomCells (size) {
  const array = new Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = Math.round(Math.random());
  }
  return array;
}

export { Picture };
export { Cell };
export { fillPicture };
export { deadCells };
export { randomCells };



