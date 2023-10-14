import { Ensemble, RoomCode, UserID } from "common/dist";
import { IoType, SocketType } from "./types";

const rooms: Record<RoomCode, Ensemble> = {};

const ROOM_CODE_LEN = 6;

const registerRoomEvents = (io: IoType, socket: SocketType) => {
  /** Creates a new room and adds this socket to the room. */
  const createRoom = () => {
    const existingRoomCodes = Object.keys(rooms);
    // Keep generating random roomCodes until there is no collision
    let roomCode: RoomCode;
    do roomCode = generateRoomCode();
    while (existingRoomCodes.includes(roomCode));
    const ensemble = new Ensemble();
    ensemble.joinRoom(socket.id);
    rooms[roomCode] = ensemble;
    socket.join(roomCode);
    // Let everyone in the room know the list of users changed
    io.to(roomCode).emit("room:user-list", ensemble.getMembers());
    return roomCode;
  };

  const leaveRoom = () => {
    const currentRoomCode = getRoomCode(socket.id);
    if (currentRoomCode === undefined) return;
    const ensemble = rooms[currentRoomCode];
    ensemble.leaveRoom(socket.id);
    socket.leave(currentRoomCode);
    // Let everyone in the room know the list of users changed
    io.to(currentRoomCode).emit("room:user-list", ensemble.getMembers());
  };

  const joinRoom = (roomCode: RoomCode) => {
    // If already in a room, leave.
    leaveRoom();
    const ensemble = rooms[roomCode];
    /** @TODO Return a meaningful error message here */
    if (ensemble === undefined) return;
    ensemble.joinRoom(socket.id);
    socket.join(roomCode);
    // Let everyone in the room know the list of users changed
    io.to(roomCode).emit("room:user-list", ensemble.getMembers());
  };

  const messageRoom = (message: string) => {
    const roomCode = getRoomCode(socket.id);
    if (roomCode === undefined) return;
    // Let everyone in the room EXCEPT `socket` know about the new message
    socket.to(roomCode).emit("room:receive-message", socket.id, message);
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

/**
 * @returns the room code for the ensemble that contains the user
 *
 * Specifications
 * --------------
 * - Assumes that a user is in at most 1 room.
 */
const getRoomCode = (userId: UserID): RoomCode | undefined => {
  const matchingEntry = Object.entries(rooms).find(([roomCode, ensemble]) =>
    ensemble.hasUser(userId),
  );
  return matchingEntry?.[0];
};
