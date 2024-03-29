import { Ensemble, RoomCode } from "common/dist/index.js";
import { getSocketId } from "../routes/types.js";
import { IoType, SocketType } from "./types.js";

export const rooms: Record<RoomCode, Ensemble> = {};

const ROOM_CODE_LEN = 6;

const registerRoomEvents = (io: IoType, socket: SocketType) => {
  /** Creates a new room and adds this socket to the room. */
  const createRoom = (callback: (arg0: RoomCode) => void) => {
    const existingRoomCodes = Object.keys(rooms);
    // Keep generating random roomCodes until there is no collision
    let roomCode: RoomCode;
    do roomCode = generateRoomCode();
    while (existingRoomCodes.includes(roomCode));
    const ensemble = new Ensemble();
    ensemble.joinRoom(getSocketId(socket));
    rooms[roomCode] = ensemble;
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    // Let everyone in the room know the list of users changed
    io.to(roomCode).emit("room:user-list", ensemble.getMembers());
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
    callback(roomCode);
  };

  const leaveRoom = () => {
    const { roomCode: currentRoomCode } = socket.data;
    if (currentRoomCode === undefined) return;
    const ensemble = rooms[currentRoomCode];
    ensemble.leaveRoom(getSocketId(socket));
    socket.leave(currentRoomCode);
    socket.data.roomCode = undefined;
    // Let everyone in the room know the list of users changed
    io.to(currentRoomCode).emit("room:user-list", ensemble.getMembers());
    io.to(currentRoomCode).emit("ensemble:update", ensemble.toObject());
    // If the room is empty, wait some time before deleting it. This is to
    // prevent the room from being deleted if the last user refreshed.
    if (ensemble.getMembers().length === 0) {
      setTimeout(() => {
        // If it is still empty, delete the room
        if (ensemble.getMembers().length === 0) {
          delete rooms[currentRoomCode];
        }
      }, 6_000);
    }
  };

  const joinRoom = (roomCode: RoomCode) => {
    // If already in a room, leave.
    // leaveRoom();
    console.log(`${getSocketId(socket)} joined the room`);
    const ensemble = rooms[roomCode];
    /** @TODO Return a meaningful error message here */
    if (ensemble === undefined) return;
    if (!ensemble.getMembers().includes(getSocketId(socket)))
      ensemble.joinRoom(getSocketId(socket));
    socket.join(roomCode);
    socket.data.roomCode = roomCode;
    // Let everyone in the room know the list of users changed
    io.to(roomCode).emit("room:user-list", ensemble.getMembers());
    io.to(roomCode).emit("ensemble:update", ensemble.toObject());
  };

  const messageRoom = (message: string) => {
    const { roomCode } = socket.data;
    if (roomCode === undefined) return;
    // Let everyone in the room EXCEPT `socket` know about the new message
    socket
      .to(roomCode)
      .emit("room:receive-message", getSocketId(socket), message);
  };

  socket.on("room:create", createRoom);
  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:send-message", messageRoom);
};
export default registerRoomEvents;

/**
 * @returns A random string of {@link ROOM_CODE_LEN} capital letters
 */
const generateRoomCode = (): RoomCode => {
  let roomCode = "";
  for (let i = 0; i < ROOM_CODE_LEN; i++) {
    // Generates a random capital alphabetical letter
    const charCode = 65 + Math.floor(Math.random() * 26);
    roomCode += String.fromCharCode(charCode);
  }
  return roomCode;
};
