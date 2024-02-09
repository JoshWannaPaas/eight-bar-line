import {
  ClientToServerEvents,
  ServerToClientEvents,
  UserID,
} from "common/dist";
import { atom, selector } from "recoil";
import { Socket } from "socket.io-client";

export const socketAtom = atom<
  Socket<ServerToClientEvents, ClientToServerEvents>
>({
  key: "socketAtom",
  dangerouslyAllowMutability: true,
});

export const userIDSelector = selector<UserID>({
  key: "userIDSelector",
  get: ({ get }) => {
    return sessionStorage.token ?? get(socketAtom).id;
  },
});
