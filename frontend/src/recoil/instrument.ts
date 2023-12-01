import { Instrument } from "common/dist/ensembles/Note";
import { atom } from "recoil";

/** A value between 0 and 32 */
export const currentInstrumentAtom = atom<Instrument>({
  key: "currentInstrumentAtom",
  default: Instrument.FLUTE,
});
