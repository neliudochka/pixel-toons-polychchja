import { ee } from './create.js';
import { Options } from './options.js';
import { Application } from './application.js';

window.onload = () => {
  ee.on('newOptions', (data) => {
    const canvases = document.querySelectorAll('canvas');
    //очищую, щоб уникнути накладання кількох канвасів
    if (canvases.length > 0) {
      for (const item of canvases) {
        item.remove();
      }
    }

    const help = new Application(new Options(...data));
    console.log('help', help);
  });
};


