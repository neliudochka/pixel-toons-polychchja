import { CellState } from './cell.js';

/*Game of Life rules:
  1.Any live cell with fewer than two live
  neighbours dies, as if by underpopulation

  2.Any live cell with two or three live
  neighbours lives on to the next generation

  3.Any live cell with more than three
  live neighbours dies, as if by overpopulation

  4.Any dead cell with exactly three live
  neighbours becomes a live cell, as if by reproduction
  */

const RULE_1 = 2;
const RULE_2 = 3;

function gameOfLife(picture) {
  const clonePicture = picture.clone();
  const arraySize = clonePicture.size;
  const arrayWidth = clonePicture.width;

  const generation = clonePicture.pixels;
  const aliveNeighbors = new Array(arraySize);

  //count alive neighbors for each cell
  for (let i = 0; i < arraySize; i++) {
    aliveNeighbors[i] = countAlive(generation, i, arrayWidth, arraySize);
  }

  for (let i = 0; i < arraySize; i++) {
    if (aliveNeighbors[i] < RULE_1) generation[i].state = CellState.DEAD;
    if (aliveNeighbors[i] > RULE_2) generation[i].state = CellState.DEAD;
    if (aliveNeighbors[i] === RULE_2 &&
      generation[i].state === CellState.DEAD) {
      generation[i].state = CellState.ALIVE;
    }
    else {
      generation[i].makeOld();
    }
  }

  return clonePicture;
}

function countAlive(arrayOfCells, index, width, size) {
  let numAlive = 0;
  const rowFirstEl = Math.trunc(index / width) * width;
  for (let j = rowFirstEl - width; j < rowFirstEl + width * 2; j += width) {
    for (let i = -1; i < 2; i++) {
      const column = (width + i + index) % width;
      const row = (size + j) % size;
      numAlive += arrayOfCells[column + row].isAlive();
    }
  }
  numAlive -= arrayOfCells[index].isAlive();
  return numAlive;
}

export { gameOfLife };
