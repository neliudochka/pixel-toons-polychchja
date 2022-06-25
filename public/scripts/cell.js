const CellState = {
  alive: 'alive',
  dead: 'dead',
  newBornAge: 1,
  deadAge: 0
};

class Cell {
  constructor(state = CellState.dead, palette) {
    this.state = state;
    this.palette = palette;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value === CellState.dead || value === CellState.deadAge) {
      this._state = CellState.dead;
      this.age = CellState.deadAge;
    }
    if (value === CellState.alive || value === CellState.newBornAge) {
      this._state = CellState.alive;
      this.age = CellState.newBornAge;
    }
  }

  isAlive() {
    if (this.state === CellState.dead) return CellState.deadAge;
    else return 1;
  }

  makeOld() {
    if (this._state === CellState.alive) {
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

  //only for pallete and drawing
  setAge(age) {
    if (age !== CellState.deadAge) {
      this._state = CellState.alive;
      this.age = age;
    } else {
      this._state = CellState.dead;
      this.age = CellState.deadAge;
    }
  }
}

export { CellState };
export { Cell };
