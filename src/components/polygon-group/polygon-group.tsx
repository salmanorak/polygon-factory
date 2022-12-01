import { FC } from "react";
import { Line, Group } from "react-konva";
import { KonvaEventHandler, Point } from "../../shared/types/draw";

import PolygonPoints from "../polygon-points";

interface PolygonGroup {
  points: Point[];
  color: string;
  strokeWidth: number;
  id: string;
  isClosed: boolean;
  onMouseOverIn?: KonvaEventHandler;
  onMouseOverOut?: KonvaEventHandler;
  onDragMove: (
    polygonIndex: number,
    pointIndex: number,
    isActive: boolean
  ) => KonvaEventHandler;
  index: number;
  isActiveDraw: boolean;
}

const PolygonGroup: FC<PolygonGroup> = ({
  id,
  points,
  color,
  strokeWidth,
  isClosed,
  onMouseOverIn,
  onMouseOverOut,
  onDragMove,
  index,
  isActiveDraw,
}) => {
  const flatPoints = points.flat();
  const clickedPoints = isActiveDraw ? points.slice(0, -2) : points;
  return (
    <Group draggable key={id}>
      <Line
        points={flatPoints}
        stroke={color}
        fill={color}
        strokeWidth={strokeWidth}
        closed={isClosed}
      />
      <PolygonPoints
        points={clickedPoints}
        polygonIndex={index}
        isActiveDraw={isActiveDraw}
        color={color}
        onDragMove={onDragMove}
        onMouseOverIn={onMouseOverIn}
        onMouseOverOut={onMouseOverOut}
      />
    </Group>
  );
};

export default PolygonGroup;
