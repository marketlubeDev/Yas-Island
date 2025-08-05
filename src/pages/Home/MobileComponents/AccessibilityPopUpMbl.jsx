import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import colorblindIcon from "../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../assets/icons/zoom.svg";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setZoomLevel, setColorMode } from "../../../global/accessibilitySlice";

function AccessibilityPopUpMbl() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  // Swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const colorModeRef = useRef(null);
  const zoomRef = useRef(null);

  // Helper function to get swipe text with fallback
  const getSwipeText = () => {
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar" ||
      t("accessibility.colorBlindness").includes("ع");

    const swipeText =
      t("mobile.swipeToChange") || (isRTL ? "اسحب لتغيير" : "Swipe to change");

    return isRTL ? `→ ${swipeText} ←` : `← ${swipeText} →`;
  };

  const zoomOptions = [
    { level: 1, label: "1x" },
    { level: 1.12, label: "1.25x" },
    { level: 1.25, label: "1.5x" },
    { level: 1.5, label: "2x" },
  ];

  const handleZoomClick = (level) => {
    dispatch(setZoomLevel(level));
  };

  const handleDarkModeClick = () => {
    // Toggle between normal and invert modes
    const newMode = isDarkMode ? "normal" : "invert";
    dispatch(setColorMode(newMode));
  };

  // Swipe handlers for color mode
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (section) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Check if current language is RTL (Arabic)
    const isRTL =
      document.documentElement.dir === "rtl" ||
      document.documentElement.lang === "ar" ||
      t("accessibility.colorBlindness").includes("ع");

    if (section === "color") {
      if (isRTL) {
        // RTL: Swipe right -> Invert, Swipe left -> Default
        if (isRightSwipe && !isDarkMode) {
          dispatch(setColorMode("invert"));
        } else if (isLeftSwipe && isDarkMode) {
          dispatch(setColorMode("normal"));
        }
      } else {
        // LTR: Swipe left -> Invert, Swipe right -> Default
        if (isLeftSwipe && !isDarkMode) {
          dispatch(setColorMode("invert"));
        } else if (isRightSwipe && isDarkMode) {
          dispatch(setColorMode("normal"));
        }
      }
    } else if (section === "zoom") {
      const currentIndex = zoomOptions.findIndex(
        (option) => option.level === zoomLevel
      );
      if (isRTL) {
        // RTL: Swipe right -> Next, Swipe left -> Previous
        if (isRightSwipe && currentIndex < zoomOptions.length - 1) {
          dispatch(setZoomLevel(zoomOptions[currentIndex + 1].level));
        } else if (isLeftSwipe && currentIndex > 0) {
          dispatch(setZoomLevel(zoomOptions[currentIndex - 1].level));
        }
      } else {
        // LTR: Swipe left -> Next, Swipe right -> Previous
        if (isLeftSwipe && currentIndex < zoomOptions.length - 1) {
          dispatch(setZoomLevel(zoomOptions[currentIndex + 1].level));
        } else if (isRightSwipe && currentIndex > 0) {
          dispatch(setZoomLevel(zoomOptions[currentIndex - 1].level));
        }
      }
    }
  };

  return (
    <div className="accessibility-popup-options">
      <div
        ref={colorModeRef}
        className={`accessibility-popup-option ${isDarkMode ? "active" : ""}`}
        onClick={handleDarkModeClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd("color")}
        style={{ cursor: "pointer", touchAction: "pan-y" }}
      >
        <div className="accessibility-popup-icon-circle">
          <img
            src={colorblindIcon}
            alt="Color blindness"
            width={32}
            height={32}
          />
        </div>
        <div className="accessibility-popup-label">
          {t("accessibility.colorBlindness") || "Color blindness mode"}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#999",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          {getSwipeText()}
        </div>
        <div
          className="color-mode-dots"
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[
            { mode: "normal", label: t("accessibility.default") || "Default" },
            {
              mode: "invert",
              label: t("accessibility.invertColors") || "Invert Colors",
            },
          ].map((option) => (
            <div
              key={option.mode}
              onClick={() => {
                const newMode = option.mode === "normal" ? "normal" : "invert";
                dispatch(setColorMode(newMode));
              }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor:
                  (option.mode === "normal" && !isDarkMode) ||
                  (option.mode === "invert" && isDarkMode)
                    ? "var(--color-base-accessibility-modal-btn-bg)"
                    : "#e0e0e0",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform:
                  (option.mode === "normal" && !isDarkMode) ||
                  (option.mode === "invert" && isDarkMode)
                    ? "scale(1.2)"
                    : "scale(1)",
                boxShadow:
                  (option.mode === "normal" && !isDarkMode) ||
                  (option.mode === "invert" && isDarkMode)
                    ? "0 2px 8px rgba(108, 99, 255, 0.3)"
                    : "none",
              }}
              title={option.label}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: "6px",
            textAlign: "center",
            fontSize: "10px",
            color: "var(--color-base-accessibility-modal-btn-bg)",
            fontWeight: "600",
            padding: "2px 6px",
            backgroundColor:
              "var(--color-base-product-card-card-item-bg) !important",
            borderRadius: "8px",
            display: "inline-block",
            margin: "6px auto 0",
          }}
        >
          {isDarkMode
            ? t("accessibility.invertColors") || "Invert Colors"
            : t("accessibility.default") || "Default"}
        </div>
      </div>
      <div
        ref={zoomRef}
        className={`accessibility-popup-option ${
          zoomLevel !== 1 ? "active" : ""
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd("zoom")}
        style={{ cursor: "pointer", touchAction: "pan-y" }}
      >
        <div className="accessibility-popup-icon-circle">
          <img src={zoomIcon} alt="Zoom mode" width={32} height={32} />
        </div>
        <div className="accessibility-popup-label">
          {t("accessibility.zoomMode") || "Zoom mode"}
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "#999",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          {getSwipeText()}
        </div>
        <div
          className="zoom-buttons"
          style={{
            display: "flex",
            gap: "6px",
            marginTop: "8px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {zoomOptions.map((option) => (
            <button
              key={option.level}
              onClick={() => handleZoomClick(option.level)}
              style={{
                padding: "4px 8px",
                borderRadius: "12px",
                border:
                  zoomLevel === option.level
                    ? "2px solid var(--color-base-accessibility-modal-btn-bg)"
                    : "1px solid #ddd",
                backgroundColor:
                  zoomLevel === option.level
                    ? "var(--color-base-accessibility-modal-btn-bg)"
                    : "var(--color-base-product-card-card-item-bg)",
                color:
                  zoomLevel === option.level
                    ? "white"
                    : "var(--color-base-accessibility-modal-btn-bg)",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                minWidth: "32px",
                outline: "none",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccessibilityPopUpMbl;
