function reflectPicture(picture) {
  const clonePicture = picture.copy();
  const newPixels = [];

  let limit = clonePicture.width;
  const even = clonePicture.height % 2 !== 0;
  if (even) {
    limit--;
  }
  for (let index = 0; index < clonePicture.size; index += clonePicture.width) {
    const row = [];
    for (let i = 0; i < limit; i++) {
      row[i] = clonePicture.pixels[index + i];
    }
    newPixels.push(...row);
    if (even) newPixels.push(clonePicture.pixels[index + limit]);
    newPixels.push(...row.reverse());
  }

  let w = 2 * limit;
  if (even) {
    w += 1;
  }

  clonePicture.width = w;
  clonePicture.size = w * clonePicture.height;
  clonePicture.pixels = newPixels;
  return clonePicture;
}

export { reflectPicture };
