/**
 * A description of the events that the frontend can send to the backend
 */
interface ClientToServerEvents {
  pong: () => void;
}
export default ClientToServerEvents;
