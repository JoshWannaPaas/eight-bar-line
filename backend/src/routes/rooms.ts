import { Ensemble, RoomCode, UserID } from "common/dist";
import { IoType, SocketType } from "./types";

const rooms: Record<RoomCode, Ensemble> = {};

const ROOM_CODE_LEN = 6;

const registerRoomEvents = (io: IoType, socket: SocketType) => {
  /**
   * Creates a new room and adds this socket to the room.
   */
  const createRoom = () => {
    const existingRoomCodes = Object.keys(rooms);

    // Keep generating random roomCodes until there is no collision
    let roomCode: RoomCode;
    do roomCode = generateRoomCode();
    while (existingRoomCodes.includes(roomCode));
    rooms[roomCode] = new Ensemble();
    rooms[roomCode].joinRoom(socket.id);
    socket.join(roomCode);
    return roomCode;
  };

  const leaveRoom = () => {
    const currentRoomCode = getRoomCode(socket.id);
    if (currentRoomCode === undefined) return;
    const ensemble = rooms[currentRoomCode];
    ensemble.leaveRoom(socket.id);
    socket.leave(currentRoomCode);
  };

  /**
   * Handles whenever this user attempts to join a room.
   */
  const joinRoom = (roomCode: RoomCode) => {
    // If already in a room, leave.
    leaveRoom();

    /** @TODO Return a meaningful error message here */
    const ensemble = rooms[roomCode];
    if (ensemble === undefined) return;

    ensemble.joinRoom(socket.id);
    socket.join(roomCode);
  };

  const messageRoom = (message: string) => {};

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
