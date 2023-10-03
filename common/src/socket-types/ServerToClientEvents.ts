/**
 * A description of the events that the backend can send to the frontend
 */
interface ServerToClientEvents {
  ping: () => void;
}
export default ServerToClientEvents;
