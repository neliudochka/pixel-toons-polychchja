import { Application } from './application.js';
//треба написати функцію/клас, що буде повертати опції
/*
{
    pixelSize: 50,
    canvasWidth: 5,
    canvasHeight: getInput(),
    palette: ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902'] };
*/
//buttons
//create button
class Options {
  constructor(canvasHeight) {
    this.pixalSize = 50;
    this.canvasHeight = canvasHeight;
    this.setCanvasWidth(canvasHeight);
    this.palette = ['#FFFFFF', '#fc3005', '#dc2802', '#9b1d02', '#731902'];
  }

  setCanvasWidth(canvasHeight) {
    this.canvasWidth = Math.round(canvasHeight / 2);
  }
}


//create button and popup
const popup = document.getElementById('popup');

const popupClose = document.getElementById('popup-close');
popupClose.addEventListener('click', () => changePopupDisplay(popup));

const popupOk = document.getElementById('popup-ok');
popupOk.addEventListener('click', () => getInput());

function changePopupDisplay(popup) {
  if (popup.style.display !== 'block') popup.style.display = 'block';
  else popup.style.display = 'none';
}

function getInput() {
  const input = document.getElementById('width-height');
  changePopupDisplay(popup);
  new Application(new Options(Number(input.value)));
}

const createButton = document.getElementById('create-button');
createButton.addEventListener('click', () => changePopupDisplay(popup));


export { Options };
