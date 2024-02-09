import "express-session";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "common/dist/index.js";

import { Server, Socket } from "socket.io";
import { Request } from "express";

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

/** A helper type for defining a simple Http request expecting only a body */
export type ReqBody<T> = Request<unknown, unknown, T>;