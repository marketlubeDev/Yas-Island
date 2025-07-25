import React from "react";
import { useNavigate } from "react-router-dom";
import colorblindIcon from "../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../assets/icons/zoom.svg";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  setZoomLevel,
  toggleDarkMode,
} from "../../../global/accessibilitySlice";

function AccessibilityPopUpMbl() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const isHighContrast = useSelector(
    (state) => state.accessibility.isHighContrast
  );

  const handleZoomClick = () => {
    let newZoomLevel;
    if (zoomLevel === 1) newZoomLevel = 1.12;
    else if (zoomLevel === 1.12) newZoomLevel = 1.25;
    else if (zoomLevel === 1.25) newZoomLevel = 1.5;
    else newZoomLevel = 1;

    dispatch(setZoomLevel(newZoomLevel));
  };

  const getZoomLabel = () => {
    if (zoomLevel === 1.5) return "2x";
    if (zoomLevel === 1.25) return "1.5x";
    if (zoomLevel === 1.12) return "1.25x";
    return "1x";
  };

  const handleDarkModeClick = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="accessibility-popup-options">
      <div
        className={`accessibility-popup-option ${isDarkMode ? "active" : ""}`}
        onClick={handleDarkModeClick}
        style={{ cursor: "pointer" }}
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
          {/* {t("accessibility.colorBlindnessMode1")}
           {t("accessibility.mode")} */}
          <div className="color-blindness-options">
            <span
              className={`invert-colors ${isDarkMode ? "active" : ""}`}
              style={{ marginRight: 8 }}
            >
              {t("accessibility.invertColors") || "Invert Colors"}
            </span>
            <span
              className="vertical-divider"
              style={{ margin: "0 4px" }}
            ></span>
            <span
              className={`high-contrast ${
                isHighContrast ? "active highActive" : ""
              }`}
              // onClick={handleHighContrastClick}
            >
              {t("accessibility.highContrast") || "High Contrast"}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`accessibility-popup-option ${
          zoomLevel !== 1 ? "active" : ""
        }`}
        onClick={handleZoomClick}
        style={{ cursor: "pointer" }}
      >
        <div className="accessibility-popup-icon-circle">
          <img src={zoomIcon} alt="Zoom mode" width={32} height={32} />
        </div>
        <div className="accessibility-popup-label">
          {t("accessibility.zoomMode")} ({getZoomLabel()})
        </div>
      </div>
    </div>
  );
}

export default AccessibilityPopUpMbl;
