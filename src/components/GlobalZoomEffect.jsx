import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalZoomEffect() {
  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);

  useEffect(() => {
    const root = document.documentElement;

    // Set zoom level as CSS custom property
    root.style.setProperty("--accessibility-zoom-level", zoomLevel);

    // Add zoom level class for conditional styling
    root.classList.remove("zoom-1x", "zoom-1-25x", "zoom-1-5x");

    // Detect desktop viewport for stronger scaling at 1.25x
    const isDesktop =
      typeof window !== "undefined"
        ? window.matchMedia("(min-width: 1025px)").matches
        : false;

    if (zoomLevel === 1) {
      root.classList.add("zoom-1x");
      // For 1x, ensure NO zoom scaling is applied
      root.style.setProperty("--zoom-scale", "1");
    } else if (zoomLevel === 1.12) {
      // 1.25x in UI
      root.classList.add("zoom-1-25x");
      // Only apply zoom for non-1x levels
      root.style.setProperty("--zoom-scale", isDesktop ? "1.25" : "1.12");
    } else if (zoomLevel === 1.25) {
      // 1.5x in UI
      root.classList.add("zoom-1-5x");
      // Only apply zoom for non-1x levels
      root.style.setProperty("--zoom-scale", "1.25");
    }

    return () => {
      // Cleanup
      root.style.removeProperty("--accessibility-zoom-level");
      root.style.removeProperty("--zoom-scale");
      root.classList.remove("zoom-1x", "zoom-1-25x", "zoom-1-5x");
    };
  }, [zoomLevel]);

  return null;
}
