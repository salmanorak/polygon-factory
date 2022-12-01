import Konva from "konva";

export type Point = [number, number];

export type MousePosition = Point;

export type KonvaEventHandler = (
  event: Konva.KonvaEventObject<MouseEvent>
) => void;
