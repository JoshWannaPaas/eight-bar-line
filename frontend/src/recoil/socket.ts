import {
  ClientToServerEvents,
  ServerToClientEvents,
  UserID,
} from "common/dist";
import { AtomEffect, atom, selector } from "recoil";
import { Socket } from "socket.io-client";

export const socketAtom = atom<
  Socket<ServerToClientEvents, ClientToServerEvents>
>({
  key: "socketAtom",
  dangerouslyAllowMutability: true,
});

const store = typeof window !== "undefined" ? window.localStorage : null;

export const localStorageUserIDEffect: (key: string) => AtomEffect<UserID> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = store.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? store.removeItem(key)
          : store.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const userIDSelector = selector<UserID>({
  key: "userIDSelector",
  get: ({ get }) => {
    return sessionStorage.token ?? get(socketAtom).id;
  },
});

export const userIDAtom = atom<UserID>({
  key: "userIDAtom",
  default: selector<UserID>({
    key: "userIDSelect",
    get: ({ get }) => {
      return get(socketAtom).id;
    },
  }),
  effects: [localStorageUserIDEffect("current_user")],
});
