import { FC, useEffect, useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import { usePanWithSpace } from "../../shared/hooks/use-pan-with-space";
import { useStageZoom } from "../../shared/hooks/use-stage-zoom";
import { useWindowSize } from "../../shared/hooks/use-window-size";
import {
  KonvaEventHandler,
  MousePosition,
  Point,
} from "../../shared/types/draw";
import { Polygon } from "../../shared/types/shapes";
import { updateArrayItem } from "../../shared/utils/array";
import { getId, getRandomColor } from "../../shared/utils/common";
import { getMessage, getMousePos } from "../../shared/utils/draw";
import ExportToJSON from "../export-to-file";
import ImportFile from "../import-file";
import PolygonGroup from "../polygon-group";

const PolygonDrawer: FC = () => {
  const windowSize = useWindowSize();
  const [completed, setCompleted] = useState<Polygon[]>([]);
  const [id, setId] = useState<string>(getId());
  const [points, setPoints] = useState<Point[]>([]);
  const [pointerPosition, setPointerPosition] = useState<MousePosition>([0, 0]);
  const [isOnStartingPoint, setIsOnStartingPoint] = useState<boolean>(false);
  const [stageDetails, handleWheel] = useStageZoom();
  const enableStageDrag = usePanWithSpace();

  const handleClick: KonvaEventHandler = (event) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    if (isOnStartingPoint && points.length >= 3) {
      setCompleted((c) =>
        c.concat([
          {
            id,
            points,
            isCompleted: true,
            color: getRandomColor(),
          },
        ])
      );
      setPoints([]);
      setId(getId());
    } else {
      setPoints((c) => [...c, mousePos]);
    }
  };

  const handleMouseMove: KonvaEventHandler = (event) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);
    setPointerPosition(mousePos);
  };

  const handleMouseOverStartPoint: KonvaEventHandler = () => {
    setIsOnStartingPoint(true);
  };

  const handleMouseOutStartPoint: KonvaEventHandler = () => {
    setIsOnStartingPoint(false);
  };

  const handlePointDragMove =
    (
      polygonIndex: number,
      pointIndex: number,
      isActive: boolean
    ): KonvaEventHandler =>
    (event) => {
      if (isActive) return;

      const shape = event.target;
      const pos = [shape.attrs.x, shape.attrs.y] as Point;

      const polygon = completed[polygonIndex];
      const rest = completed.filter((p) => p.id !== polygon.id);
      setCompleted([
        ...rest,
        {
          ...polygon,
          points: updateArrayItem(polygon.points, pos, pointIndex),
        },
      ]);
    };

  const handleJSONUpload = (uploadedData: any) => {
    setCompleted(uploadedData);
  };

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPoints([]);
      }
    };

    document.body.addEventListener("keydown", keydownHandler);

    return () => {
      document.body.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const message = getMessage(points, completed, isOnStartingPoint);
  return (
    <>
      <Stage
        {...windowSize}
        {...stageDetails}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        draggable={enableStageDrag}
        style={{
          cursor: enableStageDrag ? "grab" : "inherit",
        }}
      >
        <Layer>
          <Text x={10} y={10} text={message} fontSize={18} draggable />
          {completed.map(({ id, points, color }, index) => (
            <PolygonGroup
              key={id}
              id={id}
              points={points}
              color={color}
              strokeWidth={2}
              isClosed={true}
              index={index}
              isActiveDraw={false}
              onDragMove={handlePointDragMove}
            />
          ))}
          <PolygonGroup
            id={id}
            points={points.concat(pointerPosition)}
            color="black"
            strokeWidth={4}
            isClosed={false}
            index={1}
            isActiveDraw
            onMouseOverIn={handleMouseOverStartPoint}
            onMouseOverOut={handleMouseOutStartPoint}
            onDragMove={handlePointDragMove}
          />
        </Layer>
      </Stage>
      <ExportToJSON json={completed} fileName="polygon" />
      <ImportFile handler={handleJSONUpload} />
    </>
  );
};

export default PolygonDrawer;
