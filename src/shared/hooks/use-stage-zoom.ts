import Konva from "konva";
import { useState } from "react";
import { ZOOM_SCALE } from "../constant/draw";

export const useStageZoom = () => {
  const [stageDetails, setStageDetailds] = useState({
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
  });

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = e.target.getStage();
    const currentScale = stage ? stage.scaleX() : 1;
    const mousePos = stage
      ? stage.getRelativePointerPosition() ?? { x: 0, y: 0 }
      : { x: 0, y: 0 };
    const stagePos = stage ? { x: stage.x(), y: stage.y() } : { x: 0, y: 0 };
    const deltaY = e.evt.deltaY;

    const mousePointTo = {
      x: (mousePos.x - stagePos.x) / currentScale,
      y: (mousePos.y - stagePos.y) / currentScale,
    };

    const newScale =
      deltaY < 0 ? currentScale * ZOOM_SCALE : currentScale / ZOOM_SCALE;

    setStageDetailds({
      scaleX: newScale,
      scaleY: newScale,
      x: mousePos.x - mousePointTo.x * newScale,
      y: mousePos.y - mousePointTo.y * newScale,
    });
    stage && stage.batchDraw();
  };

  return [stageDetails, handleWheel as any];
};
