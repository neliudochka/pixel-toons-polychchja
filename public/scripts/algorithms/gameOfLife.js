function gameOfLife (picture){
  const arraySize = picture.size;
  const arrayWidth = picture.width;

  const generation = picture.pixels;
  const aliveNeighbors = new Array(arraySize);

  //count alive neighbors for each cell

  for (let i = 0; i < arraySize; i++) {
    aliveNeighbors[i] = countAlive(generation, i, arrayWidth, arraySize);
  }

  //rules
  //Any live cell with fewer than two live neighbours dies, as if by underpopulation.
  //Any live cell with two or three live neighbours lives on to the next generation.
  //Any live cell with more than three live neighbours dies, as if by overpopulation.
  //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

  for (let i = 0; i < arraySize; i++) {
    if (aliveNeighbors[i] < 2) generation[i].state = 'dead';
    if (aliveNeighbors[i] > 3) generation[i].state = 'dead';
    if (aliveNeighbors[i] === 3 && generation[i].state === 'dead') generation[i].state = 'alive';
    else generation[i].getOld();
  }

  return picture;
}

function countAlive (arrayOfCells, index, w, size) {
  let numAlive = 0;
  const row = Math.trunc((index)/w)*w;
  for (let j = row-w; j < row + w*2; j += w) {
    for (let i = -1; i < 2; i++) {
      numAlive += arrayOfCells[(w+i+index)%w+(size+j)%size].isAlive();
    }
  }
  numAlive -= arrayOfCells[index].isAlive();
  return numAlive;
}

export { gameOfLife };