import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalZoomEffect() {
  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);

  useEffect(() => {
    document.body.style.zoom = zoomLevel;
    return () => {
      document.body.style.zoom = 1;
    };
  }, [zoomLevel]);

  return null;
}
