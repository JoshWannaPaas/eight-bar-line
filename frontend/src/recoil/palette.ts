import { atom } from "recoil";
import { Palette } from "../ui-components/Palette";

export const paletteAtom = atom<Palette>({
  key: "paletteAtom",
  default: Palette.GRAYSCALE,
});
