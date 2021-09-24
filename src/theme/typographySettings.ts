export type Weights = 'bold' | 'semibold' | 'medium' | 'regular' | 'light';

export type Variants =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption'
    | 'caption2';

const baseFonts: Record<Variants, { size: number; pxSize: number; ptSize: number }> = {
    h1: { size: 1.5, pxSize: 30, ptSize: 25 },
    h2: { size: 1.389, pxSize: 25, ptSize: 22 },
    h3: { size: 1.389, pxSize: 25, ptSize: 22 },
    h4: { size: 1.222, pxSize: 22, ptSize: 18 },
    h5: { size: 1.222, pxSize: 22, ptSize: 18 },
    h6: { size: 1, pxSize: 18, ptSize: 15 },
    body1: { size: 1, pxSize: 18, ptSize: 15 },
    body2: { size: 0.833, pxSize: 15, ptSize: 13 },
    body3: { size: 0.722, pxSize: 13, ptSize: 12 },
    caption: { size: 0.667, pxSize: 13, ptSize: 12 },
    caption2: { size: 0.556, pxSize: 12, ptSize: 10 }
};

const baseSize = 18;

export const variants = Object.entries(baseFonts).reduce((acc, [cur, value]) => {
    // const maxRem = ((value.pxSize / baseSize) ) * 1.2;
    // const minRem = ((value.pxSize / baseSize) * 9) / 14;
    const fontSize = `${value.pxSize / baseSize}rem`;
    return {
        ...acc,
        [cur]: {
            // fontSize: `clamp(${minRem}rem,calc(${minRem}rem + ${1}vw),${maxRem}rem)`,
            fontSize,
            marginBlockStart: 0,
            marginBlockEnd: 0,
            lineHeight: 1.5
        }
    };
}, {} as Record<Variants, any>);

export const fontSelector = (lang: AppLanguages) => {
    let fontArray = [];
    switch (lang) {
        case 'en':
        case 'fr':
            fontArray = ['Lato', 'Arial', 'sans-serif'];
            break;
        // case 'fa':
        //     fontArray = ['IRANSans', 'Arial'];
        //     break;
        default:
            fontArray = ['Lato', 'Arial', 'sans-serif'];
            break;
    }
    return fontArray.join(',');
};
