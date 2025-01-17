import { EventEmitter } from './utils/EventEmmiter.js';

const ee = new EventEmitter();

//додаю функціонал вікну, що з'являється за натискання Create
const popup = document.getElementById('popup');

const popupClose = document.getElementById('popup-close');
popupClose.addEventListener('click', () => changePopupDisplay(popup));

const popupOk = document.getElementById('popup-ok');
popupOk.addEventListener('click', () => getInput());

function changePopupDisplay(popup) {
  if (popup.style.display !== 'none') popup.style.display = 'none';
  else popup.style.display = 'block';
}

function getInput() {
  let data = [];
  const inputId = ['width-height', 'dead-color', 'alive-color', 'hues-number'];
  data = inputId.map((id) => document.getElementById(id).value);
  changePopupDisplay(popup);
  ee.emit('newOptions', data);
}

//Create button
const createButton = document.getElementById('create-button');
createButton.addEventListener('click', () => changePopupDisplay(popup));

export { ee };
