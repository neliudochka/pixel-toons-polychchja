const CellState = {
  ALIVE: 'alive',
  DEAD: 'dead'
};

const CellAge = {
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
    if (value === CellState.DEAD || value === CellAge.DEAD_AGE) {
      this._state = CellState.DEAD;
      this.age = CellAge.DEAD_AGE;
    }
    if (value === CellState.ALIVE || value === CellAge.NEW_BORN_AGE) {
      this._state = CellState.ALIVE;
      this.age = CellAge.NEW_BORN_AGE;
    }
  }

  isAlive() {
    if (this.state === CellState.DEAD) return CellAge.DEAD_AGE;
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

  clone() {
    const newCell = new Cell(this._state, this.palette);
    newCell.age = this.age;
    return newCell;
  }

  //only for palette and drawing
  setAge(age) {
    if (age !== CellAge.DEAD_AGE) {
      this._state = CellState.ALIVE;
      this.age = age;
    } else {
      this._state = CellState.DEAD;
      this.age = CellAge.DEAD_AGE;
    }
  }
}

export { Cell };
export { CellState };
export { CellAge };
