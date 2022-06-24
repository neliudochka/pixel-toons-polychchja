/*
Class that represents color in RGBA format.
Parameters r, g, b range from 0 to 255.
Parameter alpha ranges from 0 to 255.
 */

const range = 255;

class Color {
  constructor(r, g, b, alpha = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }

  //"Factory method" that creates color from given HEX value
  static fromHex(hexColor) {
    const radix = 16;

    const r = parseInt(hexColor.slice(1, 3), radix);
    const g = parseInt(hexColor.slice(3, 5), radix);
    const b = parseInt(hexColor.slice(5, 7), radix);
    return new Color(r, g, b);
  }

  //convert rgb to hsl
  //more about algorithm here:
  //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  toHSL() {
    const R = this.r / 255;
    const G = this.g / 255;
    const B = this.b / 255;

    const Cmax = Math.max(R, G, B);
    const Cmin = Math.min(R, G, B);
    const Delta = Cmax - Cmin;

    //If Delta = 0
    let H = 0;
    let S = 0;
    const L = (Cmax + Cmin) / 2;

    if (Delta !== 0) {
      const HueRules = new Map([
        [R, 60 * (((G - B) / Delta) % 6)],
        [G, 60 * (((B - R) / Delta) + 2)],
        [B, 60 * (((R - G) / Delta) + 4)]
      ]);

      H = HueRules.get(Cmax);
      S = Delta / (1 - Math.abs(2 * L - 1));
    }
    console.log(H);
    return { H, S, L };
  }

  //Converts color to RGBA CSS format.
  //Use when passing color to CSS style parameter
  toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.alpha / range})`;
  }

}

const C = new Color(2).toHSL();

//export { Color };

console.log(
  C.H.toFixed(2),
  C.S.toFixed(2),
  C.L.toFixed(2)
);


//export { Color };
