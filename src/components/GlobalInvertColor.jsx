import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalInvertColor() {
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-base-bg",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-text",
      isDarkMode ? "#E7EBD4" : "#000"
    );
    document.documentElement.style.setProperty(
      "--color-base-btn-bg",
      isDarkMode ? "#1A1206" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-btn-border",
      isDarkMode ? "#FFAD33" : "#dcd6e5"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-bg",
      isDarkMode
        ? "#FFAD33"
        : "linear-gradient(180deg, #0597e5 0%, #0758dd 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-chat-btn-text",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-border",
      isDarkMode ? "#F7B141" : "#F7D148"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-invert-border",
      isDarkMode ? "transparent" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-bg",
      isDarkMode ? "#160802" : "#e9f7fd"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-box",
      isDarkMode ? "#FCBA58" : "#80bfe4"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-box-border",
      isDarkMode ? "#FCBA58" : "#80bfe4"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-icon-bg",
      isDarkMode
        ? "#F8A622"
        : "linear-gradient(135deg, #da3164 0%, #ae219f 50%, #547ee0 100%)"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-bg",
      isDarkMode ? "#000" : "#fff"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-text",
      isDarkMode ? "#E7EBD4" : "rgba(#18142b80, 0.5)"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-right-text-active",
      isDarkMode ? "#FFAD33" : "#2563c0"
    );
    document.documentElement.style.setProperty(
      "--color-base-side-bar-item-inactive-border",
      isDarkMode ? "#F7B141" : "#e3daf2"
    );

    // product_Card
    document.documentElement.style.setProperty(
      "--color-base-product-card-bg",
      isDarkMode ? "#0B0C0C" : "#f0f0f0"
    );

    return () => {
      document.documentElement.style.setProperty("--color-base-bg", "#fff");
      document.documentElement.style.setProperty("--color-base-text", "#000");
      document.documentElement.style.setProperty("--color-base-btn-bg", "#fff");
      document.documentElement.style.setProperty(
        "--color-base-btn-border",
        "#dcd6e5"
      );
      document.documentElement.style.setProperty(
        "--color-base-chat-btn-bg",
        "linear-gradient(180deg, #0597e5 0%, #0758dd 100%)"
      );
      document.documentElement.style.setProperty(
        "--color-base-chat-btn-text",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-border",
        "#f7d148"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-invert-border",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-bg",
        "#e9f7fd"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-box",
        "#160802"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-box-border",
        "#80bfe4"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-icon-bg",
        "linear-gradient(135deg, #da3164 0%, #ae219f 50%, #547ee0 100%)"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-bg",
        "#fff"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-text",
        "rgba(#18142b80, 0.5)"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-right-text-active",
        "#2563c0"
      );
      document.documentElement.style.setProperty(
        "--color-base-side-bar-item-inactive-border",
        "#e3daf2"
      );

      // product_Card
      document.documentElement.style.setProperty(
        "--color-base-product-card-bg",
        "#f0f0f0"
      );
    };
  }, [isDarkMode]);

  return null;
}
