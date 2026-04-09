import type { User } from "../types";

const getUser = (key: string) => {
  const foundUser = window.localStorage.getItem(key);
  if (foundUser) {
    return JSON.parse(foundUser);
  }
};

const addUser = (key: string, user: User) => {
  window.localStorage.setItem(key, JSON.stringify(user));
};

const removeUser = (key: string) => {
  window.localStorage.removeItem(key);
};

export default { getUser, addUser, removeUser };
