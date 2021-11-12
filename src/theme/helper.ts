import themeObj from "./themeObject";
import { Weights } from "./typographySettings";

export function getLighterColor(color: string) {
    return `${color}61`;
}
function padZero(str: string, len = 2) {
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  }
  
  export function invertColor(hex: string) {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  }
  

export function getPaletteColor({ palette, degree }: AppBaseColorType) {
    if (!palette) {
        return themeObj.palette.primary.dark;
    }
    if (!degree || !(degree in themeObj.palette[palette])) {
        return (themeObj.palette[palette] as any)['main'];
    }
    return (themeObj.palette[palette] as any)[degree];
}

export function getTextColor({ palette, degree }: AppBaseColorType) {
    if (!palette) {
        return themeObj.palette.text.main;
    }
    if (!degree || !(degree in themeObj.palette[palette])) {
        return (themeObj.palette[palette] as any)['main'];
    }
    return (themeObj.palette[palette] as any)[degree];
}

export const textWeight: Record<Weights, number> = {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 400,
    light: 300
};
