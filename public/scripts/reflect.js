function reflectPicture(picCanv) {
  const clonePicture = picCanv.picture.copy();
  const newPixels = [];

  let limit = clonePicture.width;

  //condition in order to prevent iternal reflect
  if (clonePicture.width === picCanv.options.fullCanvasWidth) {
    limit = picCanv.options.canvasWidth;
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

  let newWidth = 2 * limit;
  if (odd) {
    newWidth += 1;
  }

  clonePicture.width = newWidth;
  clonePicture.size = newWidth * clonePicture.height;
  clonePicture.pixels = newPixels;
  return clonePicture;
}

export { reflectPicture };
