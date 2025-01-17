import { ee } from './create.js';
import { Application } from './core/application.js';
import { Options } from './options/options.js';

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


