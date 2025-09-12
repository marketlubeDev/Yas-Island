import React, { useState, useRef, useEffect } from "react";
import { truncateText } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import ColorBlindIcon from "../../../assets/icons/ColorBlindIcon.jsx";
import CommonIcons from "../../../assets/icons/CommonIcons.jsx";
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
          <ColorBlindIcon
            width="32px"
            height="32px"
            color={isDarkMode ? "#FFAD33" : "#231942"}
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
          className="mode-switch"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "10px",
            padding: "4px 6px",
            borderRadius: "999px",
            border:
              "1px solid var(--color-base-accessibility-modal-card-border)",
            backgroundColor: "var(--color-base-product-card-card-item-bg)",
          }}
        >
          <button
            type="button"
            className={`switch-option ${!isDarkMode ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setColorMode("normal"));
            }}
            style={{
              border: "none",
              padding: "4px 10px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "10px",
              fontWeight: 600,
              backgroundColor: !isDarkMode
                ? "var(--color-base-accessibility-modal-btn-text)"
                : "transparent",
              color: !isDarkMode
                ? "#fff"
                : "var(--color-base-accessibility-modal-btn-text)",
            }}
          >
            {t("accessibility.default") || "Default"}
          </button>
          <span className="vertical-divider-card" />
          <button
            type="button"
            className={`switch-option ${isDarkMode ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setColorMode("invert"));
            }}
            style={{
              border: "none",
              padding: "4px 10px",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "10px",
              fontWeight: 600,
              backgroundColor: isDarkMode
                ? "var(--color-base-accessibility-modal-btn-text)"
                : "transparent",
              color: isDarkMode
                ? "#fff"
                : "var(--color-base-accessibility-modal-btn-text)",
            }}
          >
            {t("accessibility.invertColors") || "Invert Colors"}
          </button>
        </div>
      </div>
      <div
        ref={zoomRef}
        className={`accessibility-popup-option active`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={() => onTouchEnd("zoom")}
        style={{
          cursor: "pointer",
          touchAction: "pan-y",
          background: "var(--color-popup-box-bg)",
          border: "1px solid var(--color-popup-box-border)",
          boxShadow: "var(--color-popup-box-shadow)",
        }}
      >
        <div className="accessibility-popup-icon-circle">
          <CommonIcons
            type="search"
            width="32px"
            height="32px"
            color={isDarkMode ? "#FFAD33" : "#231942"}
          />
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
                    ? "2px solid var(--color-base-accessibility-modal-btn-text)"
                    : "1px solid #ddd",
                backgroundColor:
                  zoomLevel === option.level
                    ? "var(--color-base-accessibility-modal-btn-text)"
                    : "var(--color-base-product-card-card-item-bg)",
                color:
                  zoomLevel === option.level
                    ? "white"
                    : "var(--color-base-accessibility-modal-btn-text)",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: "600",
                transition: "all 0.2s ease",
                minWidth: "32px",
                outline: "none",
              }}
            >
              {truncateText(option.label, 15)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AccessibilityPopUpMbl;
