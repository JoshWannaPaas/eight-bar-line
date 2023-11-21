import { RoomCode } from "./ClientToServerEvents.js";

/**
 * Additional information that is attached to each client
 */
interface SocketData {
  username: string;
  roomCode: RoomCode | undefined;
}

export default SocketData;
