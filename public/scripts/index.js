import { ee } from './create.js';
import { Options } from './options.js';
import { Application } from './application.js';

window.onload = () => {
  ee.on('newOptions', (data) => {
    /*    const canvas = document.getElementsByTagName('canvas');
    //очищую, щоб уникнути накладання кількох канвасів
    if (canvas.length > 0) canvas.item(0).remove();
  */
    const shit = new Application(new Options(data));
    console.log('shit', shit);
  });
};


