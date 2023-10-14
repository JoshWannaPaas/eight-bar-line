import { EnsembleObject, Instrument } from "../index.js";

export type RoomCode = string;

/**
 * A description of the events that the frontend can send to the backend
 */
interface ClientToServerEvents {
  // A dummy endpoint for demo-ing how to use sockets
  ping: (message: string) => void;

  // Room-related endpoints

  /** Creates a new room and returns the room's code */
  ["room:create"]: () => RoomCode;
  /** Joins the room with the given room code, if it exists */
  ["room:join"]: (roomCode: RoomCode) => void;
  /** The user leaves their current room if they are currently in one */
  ["room:leave"]: () => void;
  /** Broadcasts a message to every other member of the room */
  ["room:send-message"]: (message: string) => void;

  // Ensemble-related endpoints

  /** Read the current state of the board */
  ["ensemble:fetch"]: () => EnsembleObject;
  /** Updates the instrument of the current user. Triggers an update */
  ["ensemble:set-instrument"]: (instrument: Instrument) => void;
  /** Toggles the state of the note between Rest to Attack to Sustain (if the previous note is not a rest) */
  ["ensemble:toggle-note"]: (row: number, col: number) => void;
}
export default ClientToServerEvents;
