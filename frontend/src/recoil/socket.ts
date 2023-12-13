import { ClientToServerEvents, ServerToClientEvents } from "common/dist";
import { atom, selector } from "recoil";
import { Socket } from "socket.io-client";

export const socketAtom = atom<
  Socket<ServerToClientEvents, ClientToServerEvents>
>({
  key: "todo",
  dangerouslyAllowMutability: true,
});

export const userIDSelector = selector<string>({
  key: "userIDSelector",
  get: ({ get }) => {
    return get(socketAtom).id;
  },
});
