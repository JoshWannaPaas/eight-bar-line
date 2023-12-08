import { Instrument } from "common/dist/ensembles/Note";
import { atom } from "recoil";

export const currentInstrumentAtom = atom<Instrument>({
  key: "currentInstrumentAtom",
  default: Instrument.FLUTE,
});
