import { AtomEffect, atom } from "recoil";

// Temporary declartion for testing purposes
// Login info will NOT be plain text when finished
export type User = {
  username: string;
  password: string;
};

const store = typeof window !== "undefined" ? window.localStorage : null;

export const localStorageLoginEffect: (key: string) => AtomEffect<User> =
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

export const defaultUser = {
  username: "Guest",
  password: "password",
};

export const currentLoginAtom = atom<User>({
  key: "currentLoginAtom",
  default: defaultUser,
  effects: [localStorageLoginEffect("current_user")],
});
