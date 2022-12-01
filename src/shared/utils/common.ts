import { nanoid } from "nanoid";

export const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const getId = () => nanoid();
