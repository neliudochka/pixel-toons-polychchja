import { ee } from './create.js';
import { Options } from './options.js';
import { Application } from './application.js';

window.onload = () => {
  ee.on('newOptions', (data) => {
    //видаляю канваси, щоб уникнути накладання кількох
    const canvases = document.querySelectorAll('canvas');
    //if NodeList is empty, loop will not iterate
    for (const item of canvases) {
      item.remove();
    }

    const help = new Application(new Options(...data));
    console.log('help', help);
  });
};


