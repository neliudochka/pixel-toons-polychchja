import { gameOfLife } from "./gameOfLife.js";
import { reflectPicture } from "./reflect.js";
import { PictureCanvas } from "./canvas.js";
import { Picture, fillPicture, randomCells, deadCells} from "./picture&components.js";

//canvas parametrs
const options = {
  pixelSize: 50,
  canvasWidth:5,
  canvasHeight: 9,
  palette: ['#FFFFFF','#fc3005','#dc2802','#9b1d02', '#731902']
 }


 window.onload = () => {
  const picture = new Picture(options.canvasWidth, options.canvasHeight, options.palette);
  const picCanv = new PictureCanvas(picture);


//buttons
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => picCanv.updateStatus(fillPicture(picCanv.picture, deadCells, options.palette)));

const randomButton = document.getElementById("random");
randomButton.addEventListener("click", () => picCanv.updateStatus(fillPicture(picCanv.picture, randomCells, options.palette)));

const reflectButton = document.getElementById("reflect");
reflectButton.addEventListener("click", () => picCanv.updateStatus(reflectPicture(picCanv.picture)));

const gameOfLifeButton = document.getElementById("game-of-life");
gameOfLifeButton.addEventListener("click", () => picCanv.updateStatus(gameOfLife(picCanv.picture)));
};



export { options };