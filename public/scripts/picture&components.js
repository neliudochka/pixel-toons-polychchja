class Picture {
  constructor(width, height, pixels = []) {
    this.width = width;
    this.height = height;
    this.size = width*height;
    this.pixels = pixels;
  }

  pixel(x, y){
    return this.pixels[x + y * this.width];
  }
}

class Cell {
  constructor(palette, state = 'dead') {
    this.palette = palette;
    this.state = state;
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

function defaultBackground (width, height, palette) {
  const arr = new Array(width * height).fill(new Cell(palette));
  return arr;
}

export { defaultBackground };
export { Picture };
export { Cell };