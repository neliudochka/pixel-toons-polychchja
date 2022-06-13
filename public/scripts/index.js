const brushColor = '#0000FF';

//canvas parametrs
const pixelSize = 50;
const canvasWidth = 3;
const canvasHeight = 5;
const canvasColor1 = '#FFFFFF';
const canvasColor2 = '#f7c0bc';

let canvas = document.createElement('canvas');
let canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';

class Picture {
  constructor(width, height, pixels = []) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  
  pixel(x, y){
    return this.pixels[x + y * this.width];
  }
}

//background
function backGr (width, height) {
  const pixels = new Array(width*height).fill(canvasColor1);
  for (let index = 0; index < width*height; index += width) {
    if((index/width)%2 === 0) {
      for (let i = 0; i < width; i++) {
        if (i%2 === 0) pixels[index+i] = canvasColor2;
      }
    }
    else {
      for (let i = 0; i < width; i++) {
        if (i%2 != 0) pixels[index+i] = canvasColor2;
      }
    }
  }
  return pixels; 
}

const picture = new Picture( canvasWidth, canvasHeight, backGr(canvasWidth,canvasHeight));

function createCanvas (picture, canvas) {
  canvas.width = picture.width * pixelSize;
  canvas.height = picture.height * pixelSize;
  canvas.style.backgroundColor = 'green';
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      ctx.fillStyle = picture.pixel(x, y);
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

createCanvas(picture, canvas);

canvas.addEventListener("mousedown", getMousePosition);

function getMousePosition (event) {
  const canPos = canvas.getBoundingClientRect();
  console.log(canPos);
  const coord = {
    x: Math.floor((event.clientX-canPos.left)/pixelSize),
    y: Math.floor((event.clientY-canPos.top)/pixelSize)
  };
  console.log(coord)
  changePixelColor(coord.x, coord.y);
}

function changePixelColor (x, y) {
  picture.pixels[x + y * picture.width] = brushColor;
  ctx.fillStyle = picture.pixel(x, y);
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  console.log(picture.pixels);
}


//algorithms
//переписати так, щоб фон фон продовжував йти шахмоткою?

function reflectCanvas (picture) {
  const newPixels = [];

  let limit = picture.width;
  const even = picture.width%2 != 0;
  if(even) {
    limit = picture.width - 1;
 }
  for(let index = 0; index < picture.width*picture.height; index += picture.width) {
    const row = [];
    for(let i = 0; i < limit; i++) {
      row[i] = picture.pixels[index+i];
    }
    newPixels.push(...row);
    if (even) newPixels.push(picture.pixels[index+limit]);
    newPixels.push(...row.reverse());
  }

  let w = 2*limit;
  if(even) {
    w += 1;
  }
  const newPicture = new Picture(w, picture.height, newPixels);
  return newPicture;
}

const reflectButton = document.getElementById("reflect");
reflectButton.addEventListener("mousedown", () => createCanvas(reflectCanvas(picture), canvas));

//
//
/*
class Picture {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = arrayRandom(width, height);
  }
}

function arrayRandom (width, height) {
  const array = new Array(width*height);
  for (let i = 0; i < width*height; i++) {
    array[i] = Math.round(Math.random());
  }
  return array;
}

function grid (picture){
  const arr = picture.pixels;
  const w = picture.width;
  for (let j = 0; j < picture.width*picture.height; j += w) {
      let arr1 = arr.slice(j, j+w)
      console.log(arr1);
  }
}


//gameoflive
function gameOfLife (picture){
  const firstGen = picture.pixels;
  const arraySize = picture.width*picture.height;
  const arrayWidth = picture.width;
  const arrayHeight = picture.height;
  const secondGen = new Array(arraySize);

  //count alive neighbors for each cell

  for (let i = 0; i < arraySize; i++) {
    secondGen[i] = countAlive(firstGen, i, arrayWidth, arrayHeight)
  }
}

function countAlive (array, index, w, size) {
  let numAlive = 0;
  const row = Math.trunc((index)/w)*w;
  for (let j = row-w; j < row + w*2; j += w) {
    for (let i = -1; i < 2; i++) {
      numAlive += array[(w+i+index)%w+(size+j)%size];
    }
  }
  numAlive -= array[index];
  return numAlive;
}





//tests
const p = new Picture(5,5);
console.log({w: p.width, h: p.height, pixels: p.pixels});

grid(p);
console.log(countAlive(p.pixels, 4, 5, 25));
*/