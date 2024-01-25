import { Ensemble } from "common/dist";
import { atom } from "recoil";

/**
 * The client's copy of an Ensemble of BarLines.
 *
 * When the server receives an update to its Ensemble,
 * the server sends out a new Ensemble to all the clients,
 * which gets stored in their ensembleAtom.
 */
export const ensembleAtom = atom<Ensemble>({
  key: "ensembleAtom",
  default: new Ensemble(),
  dangerouslyAllowMutability: true,
});

// todo
/*
export const barlineSelector = selector<BarLine>({
  key: "barlineSelector",
  get: ({ get }) => {
    return get(ensembleAtom).getBarLine(userIDSelector);
  },
});
*/

/**
 * An array of all UserID's in the current Ensemble.
 *
 * This is used to display other clients's BarLines and have them
 * update in real time on each client.
 */
export const userListAtom = atom<string[]>({
  key: "userListAtom",
  default: [],
});
