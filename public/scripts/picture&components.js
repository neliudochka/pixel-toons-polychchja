const State = {
  ALIVE: 'alive',
  DEAD: 'dead'
};

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
    console.log(this.pixels);
    return new Picture(this.width, this.height, this.pallete, this.pixels);
  }
}

class Cell {
  constructor(state = State.DEAD, palette) {
    this.state = state;
    this.palette = palette;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value === State.DEAD || value === 0) {
      this._state = State.DEAD;
      this.age = 0;
    }
    if (value === State.ALIVE || value === 1) {
      this._state = State.ALIVE;
      this.age = 1;
    }
  }

  isAlive() {
    if (this.state === State.DEAD) return 0;
    else return 1;
  }

  getOld() {
    if (this._state === State.ALIVE) {
      this.age++;
    }
    // add smth for else?
  }

  color() {
    const arrLen = this.palette.length;
    if (this.age < arrLen) return this.palette[this.age];
    return this.palette[arrLen - 1];
  }
}


function fillPicture(picture, func, pallete) {
  let newPicture = {};
  if (picture.pixels) newPicture =  picture.copy();
  else newPicture = picture;
  newPicture.pixels = func(picture.size).map((val) => new Cell(val, pallete));
  console.log(newPicture);
  return newPicture;
}

function deadCells(size) {
  const array = new Array(size).fill(0);
  return array;
}

function randomCells(size) {
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
export { State };
