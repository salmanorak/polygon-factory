import { Point } from "./draw";

export interface Polygon {
  id: string;
  points: Point[];
  color: string;
  isCompleted: boolean;
}
