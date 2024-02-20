import "express-session";

declare module "express-session" {
  interface SessionData {
    username: string;
  }
}

/**
 * Loads the socket's token if it exists, otherwise returns the socket's id.
 */
export const getSocketId = (socket: SocketType) => {
  return socket.handshake.auth.token ?? socket.id;
};
