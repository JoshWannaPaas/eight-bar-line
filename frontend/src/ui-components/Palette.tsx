type ColorHex = string;

export type PaletteType = {
  name: string;
  attack: ColorHex;
  sustain: ColorHex;
  rest: ColorHex;
  icon: string;
};

const defaultRest: ColorHex = "#e0e0e0";

const grayscale: PaletteType = {
  name: "Grayscale",
  attack: "#5a5a5a",
  sustain: "#808080",
  rest: defaultRest,
  icon: "src/assets/grayscale.ico",
};

const sunset: PaletteType = {
  name: "Sunset",
  attack: "#f5487f",
  sustain: "#c7417b",
  rest: defaultRest,
  icon: "src/assets/sunset.ico",
};

const marine: PaletteType = {
  name: "Marine",
  attack: "#122c91",
  sustain: "#2a6fdb",
  rest: defaultRest,
  icon: "src/assets/marine.ico",
};

const goldenrod: PaletteType = {
  name: "Goldenrod",
  attack: "#ffa500",
  sustain: "#b38b00",
  rest: defaultRest,
  icon: "src/assets/goldenrod.ico",
};

// https://colors.muz.li/palette/006600/004700/bfffbf/80ff80/ffffff
const forest: PaletteType = {
  name: "Forest",
  attack: "#085d08",
  sustain: "#439843",
  rest: "#c2dfc2",
  icon: "src/assets/forest.ico",
};

export enum Palette {
  GRAYSCALE,
  SUNSET,
  MARINE,
  GOLDENROD,
  FOREST,
}

export const paletteDict: Record<Palette, PaletteType> = {
  [Palette.GRAYSCALE]: grayscale,
  [Palette.SUNSET]: sunset,
  [Palette.MARINE]: marine,
  [Palette.GOLDENROD]: goldenrod,
  [Palette.FOREST]: forest,
};
