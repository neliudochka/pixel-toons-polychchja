import { EventEmitter } from './EventEmmiter.js';

const ee = new EventEmitter();

//додаю функціонал вікну, що з'являється за натискання Create
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
  ee.emit('newOptions', parseInt(input.value));
}

//Create button
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', () => changePopupDisplay(popup));

export { ee };
