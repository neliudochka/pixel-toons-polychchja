/*
Class that represents color in RGB format.
Parameters r, g, b range from 0 to 255.
 */

const RANGE = 255;
const ANGLE = 60;
const FULL_CIRCLE = 360;
const hexRadix = 16;


class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  //convert hsl to rgb
  //more about algorithm here:
  //https://www.rapidtables.com/convert/color/hsl-to-rgb.html
  static fromHSL({ H, S, L }) {
    const C = (1 - Math.abs(2 * L - 1)) * S;
    const X = C * (1 - Math.abs((H / ANGLE) % 2 - 1));
    const m = L - C / 2;

    const rule = Math.floor(H / ANGLE);
    const rules = new Map([
      [0, [C, X, 0]],
      [1, [X, C, 0]],
      [2, [0, C, X]],
      [3, [0, X, C]],
      [4, [X, 0, C]],
      [5, [C, 0, X]]
    ]);
    const [R, G, B] = rules.get(rule);
    const r = Math.round((R + m) * RANGE);
    const g = Math.round((G + m) * RANGE);
    const b = Math.round((B + m) * RANGE);
    return new Color(r, g, b);
  }

  //"Factory method" that creates color from given HEX value
  static fromHex(hexColor) {

    const expression = new RegExp(/#(.{2})(.{2})(.{2})(.{0,2})/);
    //Getting second to fifth group
    const result = expression.exec(hexColor).slice(1, 5);
    const values = result.map((value) => {
      if (value !== '') return parseInt(value, hexRadix);
      else return RANGE;
    });

    return new Color(...values);
  }

  //convert rgb to hsl
  //more about algorithm here:
  //https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  toHSL() {
    const R = this.r / RANGE;
    const G = this.g / RANGE;
    const B = this.b / RANGE;

    const Cmax = Math.max(R, G, B);
    const Cmin = Math.min(R, G, B);
    const Delta = Cmax - Cmin;

    //If Delta = 0
    let H = 0;
    let S = 0;
    const L = (Cmax + Cmin) / 2;

    if (Delta !== 0) {
      const HueRules = new Map([
        [R, ANGLE * ((G - B) / Delta) % 6],
        [G, ANGLE * (((B - R) / Delta) + 2)],
        [B, ANGLE * (((R - G) / Delta) + 4)]
      ]);

      H = (FULL_CIRCLE + HueRules.get(Cmax)) % FULL_CIRCLE;
      S = Delta / (1 - Math.abs(2 * L - 1));
    }
    return { H, S, L };
  }

  toHex() {
    let hex = '#';
    const colors = { r: this.r, g: this.g, b: this.b };
    for (const key in colors) {
      let item = colors[key].toString(hexRadix);
      if (item.length === 1) item = '0' + item;
      hex += item;
    }
    return hex;
  }

}

export { Color };
