export type RoomCode = string;

/**
 * A description of the events that the frontend can send to the backend
 */
interface ClientToServerEvents {
  // A dummy endpoint for demo-ing how to use sockets
  ping: (message: string) => void;
  // Room-related endpoints
  ["room:create"]: () => RoomCode;
  ["room:join"]: (roomCode: RoomCode) => void;
  ["room:leave"]: () => void;
  ["room:send-message"]: (message: string) => void;
}
export default ClientToServerEvents;
