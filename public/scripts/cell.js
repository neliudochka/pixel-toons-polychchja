const CellState = {
  ALIVE: 'alive',
  DEAD: 'dead',
  NEW_BORN_AGE: 1,
  DEAD_AGE: 0
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
    if (value === CellState.DEAD || value === CellState.DEAD_AGE) {
      this._state = CellState.DEAD;
      this.age = CellState.DEAD_AGE;
    }
    if (value === CellState.ALIVE || value === CellState.NEW_BORN_AGE) {
      this._state = CellState.ALIVE;
      this.age = CellState.NEW_BORN_AGE;
    }
  }

  isAlive() {
    if (this.state === CellState.DEAD) return CellState.DEAD_AGE;
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
    return newCell;
  }

  //only for palette and drawing
  setAge(age) {
    if (age !== CellState.DEAD_AGE) {
      this._state = CellState.ALIVE;
      this.age = age;
    } else {
      this._state = CellState.DEAD;
      this.age = CellState.DEAD_AGE;
    }
  }
}

export { CellState };
export { Cell };
