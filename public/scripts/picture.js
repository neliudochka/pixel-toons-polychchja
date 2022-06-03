//переписати через next()?

class Picture {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  fillEverything(width, height, color) {
    const pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }

  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }

  draw(pixels) {
    const clone = [...this.pixels];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const i = y * this.width + x;
        clone[i] = pixels[i];
      }
    }
  return new Picture(this.width, this.height, clone);
  }
}

function updateState(state, action) {
  return {...state, ...action};
}

export {Picture};