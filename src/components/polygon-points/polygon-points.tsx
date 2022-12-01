import { FC } from "react";
import { Circle } from "react-konva";
import { KonvaEventHandler, Point } from "../../shared/types/draw";
import { Shape } from "konva/lib/Shape";

interface PolygonPointsProps {
  polygonIndex: number;
  points: Point[];
  isActiveDraw: boolean;
  color: string;
  onMouseOverIn?: Function;
  onMouseOverOut?: Function;
  onDragMove: (
    polygonIndex: number,
    pointIndex: number,
    isActive: boolean
  ) => KonvaEventHandler;
}

const PolygonPoints: FC<PolygonPointsProps> = ({
  polygonIndex,
  points,
  isActiveDraw,
  color,
  onMouseOverIn,
  onMouseOverOut,
  onDragMove,
}) => {
  const handleMouseOverStartPoint: KonvaEventHandler = (event) => {
    if (points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });
    if (event.target instanceof Shape) event.target.fill("green");
    onMouseOverIn && onMouseOverIn(true);
  };

  const handleMouseOutStartPoint: KonvaEventHandler = (event) => {
    event?.target?.scale({ x: 1, y: 1 });
    if (event.target instanceof Shape) event.target.fill("red");
    onMouseOverOut && onMouseOverOut(false);
  };

  const firstPointAttr = {
    hitStrokeWidth: 12,
    fill: "red",
    onMouseOver: handleMouseOverStartPoint,
    onMouseOut: handleMouseOutStartPoint,
  };

  return (
    <>
      {points.map((point, pointIndex) => {
        const isFirst = pointIndex === 0;
        const x = point[0];
        const y = point[1];
        const startPointAttr = isFirst && isActiveDraw ? firstPointAttr : null;
        return (
          <Circle
            key={pointIndex}
            x={x}
            y={y}
            radius={6}
            fill="white"
            stroke={color}
            strokeWidth={3}
            onDragMove={onDragMove(polygonIndex, pointIndex, isActiveDraw)}
            draggable
            {...startPointAttr}
          />
        );
      })}
    </>
  );
};

export default PolygonPoints;
