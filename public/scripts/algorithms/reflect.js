function reflectPicture (picture) {
  const newPixels = [];

  let limit = picture.width;
  const even = (picture.width%2 != 0);
  if(even) {
    limit--;
  }
  for(let index = 0; index < picture.size; index += picture.width) {
    const row = [];
    for(let i = 0; i < limit; i++) {
      row[i] = picture.pixels[index+i];
    }
    newPixels.push(...row);
    if (even) newPixels.push(picture.pixels[index+limit]);
    newPixels.push(...row.reverse());
  }

  let w = 2*limit;
  if(even) {
    w += 1;
  }

  picture.width = w;
  picture.size = w*picture.height;
  picture.pixels = newPixels;
  return picture;
}

 export { reflectPicture };