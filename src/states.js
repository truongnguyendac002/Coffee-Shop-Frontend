import { atom } from "recoil";

export const emailState = atom({
  key: "emailState",
  default: "",
});

export const userState = atom({
  key: 'userState',
  default: null,
});