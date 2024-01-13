import { AtomEffect, atom } from "recoil";
import { Palette } from "../ui-components/Palette";

const store = typeof window !== "undefined" ? window.localStorage : null;

export const localStoragePaletteEffect: (key: string) => AtomEffect<Palette> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? store.removeItem(key)
          : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const paletteAtom = atom<Palette>({
  key: "paletteAtom",
  default: Palette.GRAYSCALE,
  effects: [localStoragePaletteEffect("current_user")],
});
