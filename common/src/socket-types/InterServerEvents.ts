/**
 * A description of the events that different backends
 * can send to each other
 *
 * @note We don't plan to use this, but we use it in
 * the backend for type annotations
 */
interface InterServerEvents {
  ping: () => void;
}
export default InterServerEvents;
