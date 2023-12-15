import { Ensemble } from "common/dist";
import { atom } from "recoil";

export const ensembleAtom = atom<Ensemble>({
  key: "ensembleAtom",
  default: new Ensemble(),
  dangerouslyAllowMutability: true,
});
