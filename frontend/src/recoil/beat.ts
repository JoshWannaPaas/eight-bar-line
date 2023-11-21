import { atom } from "recoil";

/** A value between 0 and 32 */
export const beatNumberAtom = atom<number>({
  key: "beatNumberAtom",
  default: 0,
});
