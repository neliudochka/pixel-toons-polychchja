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
  let Data = [];
  const inputId = ['width-height', 'dead-color', 'alive-color', 'hues-number'];
  Data = inputId.map((id) => document.getElementById(id).value);
  changePopupDisplay(popup);
  ee.emit('newOptions', Data);
}

//Create button
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', () => changePopupDisplay(popup));

export { ee };
