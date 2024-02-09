import "express-session";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "common/dist/index.js";

import { Server, Socket } from "socket.io";

export type IoType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type SocketType = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

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
