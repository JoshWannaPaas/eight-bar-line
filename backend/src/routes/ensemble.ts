import { Ensemble, Instrument } from "common/dist/index.js";
import { IoType, SocketType } from "./types";

const registerEnsembleEvents = (io: IoType, socket: SocketType) => {
  const fetchEnsemble = () => {
    console.log("WIP");
    return new Ensemble().toObject();
  };

  const setInstrument = (instrument: Instrument) => {
    console.log("WIP");
    const ensemble = new Ensemble();
    ensemble.setInstrument(socket.id, instrument);
  };

  const toggleNote = (row: number, col: number) => {
    console.log("WIP");
    const ensemble = new Ensemble();
    ensemble.toggleNote(socket.id, row, col);
  };

  socket.on("ensemble:fetch", fetchEnsemble);
  socket.on("ensemble:set-instrument", setInstrument);
  socket.on("ensemble:toggle-note", toggleNote);
};
export default registerEnsembleEvents;
