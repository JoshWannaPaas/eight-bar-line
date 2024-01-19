import { ClientToServerEvents, Instrument } from "common/dist/index.js";
import { IoType, SocketType } from "./types.js";
import { rooms } from "./rooms.js";

const registerEnsembleEvents = (io: IoType, socket: SocketType) => {
  const fetchEnsemble: ClientToServerEvents["ensemble:fetch"] = (callback) => {
    const { username, roomCode } = socket.data;
    if (roomCode === undefined)
      return console.error(`User "${username}" is not in an ensemble.`);
    const ensemble = rooms[roomCode];

    return callback(ensemble.toObject());
  };

  const setInstrument = (instrument: Instrument) => {
    const { username, roomCode } = socket.data;
    if (roomCode === undefined)
      return console.error(`User "${username}" is not in an ensemble.`);
    const ensemble = rooms[roomCode];
    ensemble.setInstrument(socket.id, instrument);
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
    return undefined;
  };

  const toggleNote = (row: number, col: number) => {
    console.log("User is toggling: ", row, col)
    const { username, roomCode } = socket.data;
    if (roomCode === undefined)
      return console.error(`User "${username}" is not in an ensemble.`);
    const ensemble = rooms[roomCode];
    ensemble.toggleNote(socket.id, row, col);
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
    return undefined;
  };

  socket.on("ensemble:fetch", fetchEnsemble);
  socket.on("ensemble:set-instrument", setInstrument);
  socket.on("ensemble:toggle-note", toggleNote);
};
export default registerEnsembleEvents;
