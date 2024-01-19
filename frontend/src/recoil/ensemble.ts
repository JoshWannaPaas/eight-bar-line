import { Ensemble } from "common/dist";
import { atom } from "recoil";

export const ensembleAtom = atom<Ensemble>({
  key: "ensembleAtom",
  default: new Ensemble(),
  dangerouslyAllowMutability: true,
});

// export const barlineSelector = selector<BarLine>({
//   key: "barlineSelector",
//   get: ({ get }) => {
//     return get(ensembleAtom).getBarLine(userIDSelector);
//   },
// });

export const userListAtom = atom<string[]>({
  key: "userListAtom",
  default: [],
})
