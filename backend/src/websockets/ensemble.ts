import { ClientToServerEvents, Instrument } from "common/dist/index.js";
import { getSocketId } from "../routes/types.js";
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
    ensemble.setInstrument(getSocketId(socket), instrument);
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
    return undefined;
  };

  const toggleNote = (row: number, col: number) => {
    const { username, roomCode } = socket.data;
    if (roomCode === undefined)
      return console.error(`User "${username}" is not in an ensemble.`);
    const ensemble = rooms[roomCode];
    ensemble.toggleNote(getSocketId(socket), row, col);
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
    return undefined;
  };

  socket.on("ensemble:fetch", fetchEnsemble);
  socket.on("ensemble:set-instrument", setInstrument);
  socket.on("ensemble:toggle-note", toggleNote);
};
export default registerEnsembleEvents;
