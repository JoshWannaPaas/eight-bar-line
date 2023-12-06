type ColorHex = string;

export type PaletteType = {
  name: string;
  attack: ColorHex;
  sustain: ColorHex;
  rest: ColorHex;
};

const defaultRest: ColorHex = "#e0e0e0";

const pGrayscale: PaletteType = {
  name: "Grayscale",
  attack: "#5a5a5a",
  sustain: "#808080",
  rest: defaultRest,
};

const pSunset: PaletteType = {
  name: "Sunset",
  attack: "#f5487f",
  sustain: "#c7417b",
  rest: defaultRest,
};

const pMarine: PaletteType = {
  name: "Marine",
  attack: "#122c91",
  sustain: "#2a6fdb",
  rest: defaultRest,
};

const pGoldenrod: PaletteType = {
  name: "Goldenrod",
  attack: "#ffa500",
  sustain: "#b38b00",
  rest: defaultRest,
};

// https://colors.muz.li/palette/006600/004700/bfffbf/80ff80/ffffff
const pForest: PaletteType = {
  name: "Forest",
  attack: "#085d08",
  sustain: "#439843",
  rest: "#c2dfc2",
};

export const paletteList = [pGrayscale, pSunset, pMarine, pGoldenrod, pForest];

export enum Palette {
  GRAYSCALE,
  SUNSET,
  MARINE,
  GOLDENROD,
  FOREST,
}
