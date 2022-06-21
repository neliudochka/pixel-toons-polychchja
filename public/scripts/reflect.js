import { options } from './index.js';

function reflectPicture(picture) {
  const clonePicture = picture.copy();
  const newPixels = [];

  let limit = clonePicture.width;

  //made in order to prevent iternal reflect
  if (picture.width === options.canvasHeight) {
    limit = options.canvasWidth;
  }

  const odd = clonePicture.height % 2 !== 0;
  if (odd) limit--;

  for (let index = 0; index < clonePicture.size; index += clonePicture.width) {
    const row = [];
    for (let i = 0; i < limit; i++) {
      row[i] = clonePicture.pixels[index + i];
    }
    newPixels.push(...row);
    if (odd) newPixels.push(clonePicture.pixels[index + limit]);
    const reverseRow = row.map((cell) => cell.copy()).reverse();
    newPixels.push(...reverseRow);
  }

  let w = 2 * limit;
  if (odd) {
    w += 1;
  }

  clonePicture.width = w;
  clonePicture.size = w * clonePicture.height;
  clonePicture.pixels = newPixels;
  return clonePicture;
}

export { reflectPicture };
