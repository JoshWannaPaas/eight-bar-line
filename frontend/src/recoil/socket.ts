import { ClientToServerEvents, ServerToClientEvents } from "common/dist";
import {atom} from "recoil";
import { Socket } from "socket.io-client";

export const socketAtom = atom<Socket<ServerToClientEvents, ClientToServerEvents>>({
  key: "todo",
  dangerouslyAllowMutability: true,
})