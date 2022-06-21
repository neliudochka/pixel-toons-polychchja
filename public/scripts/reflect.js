function reflectPicture(picture) {
  const clonePicture1 = picture.copy();
  const newPixels = [];

  let limit = clonePicture1.width;
  const even = clonePicture1.height % 2 !== 0;
  if (even) {
    limit--;
  }
  for (let index = 0; index < clonePicture1.size;
    index += clonePicture1.width) {
    const row = [];
    for (let i = 0; i < limit; i++) {
      row[i] = clonePicture1.pixels[index + i];
    }
    newPixels.push(...row);
    if (even) newPixels.push(clonePicture1.pixels[index + limit]);
    const reverseRow = row.map((cell) => cell.copy()).reverse();
    newPixels.push(...reverseRow);
  }

  let w = 2 * limit;
  if (even) {
    w += 1;
  }

  clonePicture1.width = w;
  clonePicture1.size = w * clonePicture1.height;
  clonePicture1.pixels = newPixels;
  return clonePicture1;
}

export { reflectPicture };
