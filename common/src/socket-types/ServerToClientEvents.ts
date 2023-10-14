/**
 * A description of the events that the backend can send to the frontend
 */
interface ServerToClientEvents {
  // A dummy endpoint for demo-ing how to use sockets
  pong: (message: string) => void;
}
export default ServerToClientEvents;
