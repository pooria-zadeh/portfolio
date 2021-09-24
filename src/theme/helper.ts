import themeObj from "./themeObject";
import { Weights } from "./typographySettings";

export function inferLighter(color: string) {
    return `${color}61`;
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
