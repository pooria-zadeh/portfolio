import { variants } from "./typographySettings";
import { BP_DN, BP_UP, BP_UP_H, BP_DN_H, breakpointsKeys } from "./breakpoint";

export const TOOLBAR_HEIGHT = 70;
const SHADOW_COLOR = "rgb(0, 0, 0,0.43)";

const themeObj = {
  palette: {
    primary: {
      main: "#0B0B0B",
      light: "#B3B3B3",
      dark: "#0B0B0B",
      "100": "#",
      "200": "#",
      "300": "#",
      "400": "#",
      "500": "#",
      "600": "#",
    },
    secondary: {
      main: "#F7C8DA",
      dark: "#",
      light: "#",
      "100": "#",
      "200": "#",
      "300": "#",
    },

    info: {
      main: "#1492E6",
      blue: "#007AFF",

      red: "#FF4D4D",
    },

    grey: {
      "100": "#A2A6BB",
      "200": "#E5E7F0",
      "300": "#858AA0",
      "400": "#C6C6C8",
      "500": "",
      "600": "#707070",
      "700": "",
      smoothGrey: "#818181",
      smoothestGrey: "#b8b8b8",
      liteGray: "#ececec",
    },

    background: {
      gray: "#B3B3B3",
      boldGray: "#B3B3B3",
      main: "#F7F2F4",
      "100": "#EDEDF4",
      "200": "#F8F8F8EB",
    },
    text: {
      main: "#0B0B0B",
      black: "#000000",
      "200": "#515C6F",
      "600": "#1F1F1F",
    },
  },
  shape: {
    borderRadius: {
      common: 8,
      tiny: 4,
      small: 8,
      medium: 12,
      large: 16,
      xlarge: 24,
    },
  },

  shadows: {
    shadowColor: SHADOW_COLOR,

    common: `0px 0px 7px 4px ${SHADOW_COLOR}, 0 1px 2px rgba(0,0,0,0.24)`,
  },
  sizes: {
    pageHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,

    maxWidth: 1200,
  },
  breakpoints: {
    breakpointsKeys,
    up: BP_UP,
    down: BP_DN,
    height: {
      up: BP_UP_H,
      down: BP_DN_H,
    },
  },
  mixins: {
    toolbar: {
      minHeight: TOOLBAR_HEIGHT,
      paddingBottom: 5,
    },
  },
  transition: {
    duration: "0.3s",
    background: "0.3s background-color",
  },
  typography: {
    // useNextVariants: true,
    fontFamily: ["Lato", "Arial", "sans-serif"].join(","),
    allVariants: { fontWeight: "normal" },
    transform: { small: "scale(0.85)", xsmall: "scale(0.75)" },
    ...variants,
  },
  zIndex: {
    modal: 9999,
    menu: 8888,
    toolbar: 8000,
  },
};

export default themeObj;
