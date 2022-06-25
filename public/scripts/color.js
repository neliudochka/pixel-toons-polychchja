/*
Class that represents color in RGB format.
Parameters r, g, b range from 0 to 255.
 */

const range = 255;

class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  //"Factory method" that creates color from given HEX value
  static fromHex(hexColor) {
    const radix = 16;

    const r = parseInt(hexColor.slice(1, 3), radix);
    const g = parseInt(hexColor.slice(3, 5), radix);
    const b = parseInt(hexColor.slice(5, 7), radix);
    return new Color(r, g, b);
  }

  //convert hsl to rgb
  //more about algorithm here:
  //https://www.rapidtables.com/convert/color/hsl-to-rgb.html
  static fromHSL(H, S, L) {
    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs((H / 60) % 2 - 1));
    const m = L - C / 2;

    const rule = Math.floor(H / 60);
    const rules = new Map([
      [0, [C, X, 0]],
      [1, [X, C, 0]],
      [2, [0, C, X]],
      [3, [0, X, C]],
      [4, [X, 0, C]],
      [5, [C, 0, X]]
    ]);
    const [R, G, B] = rules.get(rule);
    const r = Math.round((R + m) * range);
    const g = Math.round((G + m) * range);
    const b = Math.round((B + m) * range);
    console.log(rules);
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

}

const C = Color.fromHSL(247, 0.5, 0.3);

//export { Color };

console.log(
  C
);


//export { Color };
