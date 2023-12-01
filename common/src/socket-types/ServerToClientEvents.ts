import { EnsembleObject } from "../index.js";

/**
 * A description of the events that the backend can send to the frontend
 */
interface ServerToClientEvents {
  // A dummy endpoint for demo-ing how to use sockets
  pong: (message: string) => void;

  /** Triggered when someone in the same room broadcasts a message */
  ["room:receive-message"]: (username: string, message: string) => void;
  /** Triggered whenever someone joins or leaves the room */
  ["room:user-list"]: (usernames: readonly string[]) => void;

  /** Triggered whenever another user modifies the Ensemble  */
  ["ensemble:update"]: (newState: EnsembleObject) => void;
}
export default ServerToClientEvents;
