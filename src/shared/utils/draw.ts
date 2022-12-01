import { Polygon } from "./../types/shapes";
import { Point } from "../types/draw";
import { Stage as StageType } from "konva/lib/Stage";

export const getMousePos = (stage: StageType | null): Point => {
  const position = stage && stage.getPointerPosition();
  if (!position) return [0, 0];
  return [position.x, position.y];
};

export const getMessage = (
  points: any[],
  completed: any[],
  isMouseOnStart: boolean
) => {
  const hasPoint = !!points.length;
  const hasCompleted = !!completed.length;

  if (hasCompleted && !hasPoint) return "Start new polygon or edit completed";
  if (!hasCompleted && !hasPoint)
    return "Click on any point to start drawing a polygon";
  if (hasPoint && !isMouseOnStart) return "Pick new points to draw polygon";
  if (hasPoint && isMouseOnStart)
    return "Click on starting point to complete the current polygon";
};
