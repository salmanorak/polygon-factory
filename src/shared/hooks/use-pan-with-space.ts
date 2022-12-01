import { useEffect, useState } from "react";

export const usePanWithSpace = () => {
  const [enablePan, setEnablePan] = useState<boolean>(false);
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setEnablePan(true);
      }
    };
    const keyupHandler = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setEnablePan(false);
      }
    };
    document.body.addEventListener("keydown", keydownHandler);
    document.body.addEventListener("keyup", keyupHandler);

    return () => {
      document.body.removeEventListener("keydown", keydownHandler);
      document.body.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return enablePan;
};
