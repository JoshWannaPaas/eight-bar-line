type ColorHex = string;

export type PaletteType = {
  name: string;
  attack: ColorHex;
  sustain: ColorHex;
  rest: ColorHex;
  icon: string;
  navigation: string;
};

const defaultRest: ColorHex = "#e0e0e0";

const grayscale: PaletteType = {
  name: "Grayscale",
  attack: "#5a5a5a",
  sustain: "#808080",
  rest: defaultRest,
  icon: "src/assets/grayscale.ico",
  navigation: "src/assets/navigation/nav-grayscale.png",
};

const sunset: PaletteType = {
  name: "Sunset",
  attack: "#f5487f",
  sustain: "#c7417b",
  rest: defaultRest,
  icon: "src/assets/sunset.ico",
  navigation: "src/assets/navigation/nav-sunset.png",
};

const marine: PaletteType = {
  name: "Marine",
  attack: "#122c91",
  sustain: "#2a6fdb",
  rest: defaultRest,
  icon: "src/assets/marine.ico",
  navigation: "src/assets/navigation/nav-marine.png",
};

const goldenrod: PaletteType = {
  name: "Goldenrod",
  attack: "#ffa500",
  sustain: "#b38b00",
  rest: defaultRest,
  icon: "src/assets/goldenrod.ico",
  navigation: "src/assets/navigation/nav-goldenrod.png",
};

// https://colors.muz.li/palette/006600/004700/bfffbf/80ff80/ffffff
const forest: PaletteType = {
  name: "Forest",
  attack: "#085d08",
  sustain: "#439843",
  rest: "#c2dfc2",
  icon: "src/assets/forest.ico",
  navigation: "src/assets/navigation/nav-forest.png",
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
