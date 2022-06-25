const CellState = {
  ALIVE: 'alive',
  DEAD: 'dead'
};

class Cell {
  constructor(state = CellState.DEAD, palette) {
    this.state = state;
    this.palette = palette;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value === CellState.DEAD || value === 0) {
      this._state = CellState.DEAD;
      this.age = 0;
    }
    if (value === CellState.ALIVE || value === 1) {
      this._state = CellState.ALIVE;
      this.age = 1;
    }
  }

  isAlive() {
    console.log(typeof CellState.DEAD);
    if (this.state === CellState.DEAD) return 0;
    else return 1;
  }

  makeOld() {
    if (this._state === CellState.ALIVE) {
      this.age++;
    }
  }

  color() {
    const arrLen = this.palette.length;
    if (this.age < arrLen) return this.palette[this.age];
    return this.palette[arrLen - 1];
  }

  copy() {
    const newCell = new Cell(this._state, this.palette);
    newCell.age = this.age;
    console.log(newCell);
    return newCell;
  }
}

export { CellState };
export { Cell };
