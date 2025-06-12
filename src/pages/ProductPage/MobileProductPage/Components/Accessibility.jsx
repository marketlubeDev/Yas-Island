import React, { useState } from "react";
import { Modal } from "antd";
import colorblindIcon from "../../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../../assets/icons/zoom.svg";
import closeIcon from "../../../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  setZoomLevel,
  toggleDarkMode,
} from "../../../../global/accessibilitySlice";

function Accessibility({ onClose, visible }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const zoomLevel = useSelector((state) => state.accessibility.zoomLevel);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  console.log("hello", isDarkMode);

  const isHighContrast = useSelector(
    (state) => state.accessibility.isHighContrast
  );

  const handleZoomClick = () => {
    let newZoomLevel;
    if (zoomLevel === 1) newZoomLevel = 1.12;
    else if (zoomLevel === 1.12) newZoomLevel = 1.25;
    else newZoomLevel = 1;

    dispatch(setZoomLevel(newZoomLevel));
  };

  const handleClose = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  const handleContinue = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  const handleDarkModeClick = () => {
    dispatch(toggleDarkMode());
  };

  // const handleHighContrastClick = () => {
  //   setIsHighContrast((prev) => !prev);
  //   setIsDarkMode(false);
  // };

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      centered
      width={400}
      className="accessibility-modal"
      closeIcon={
        <span className="custom-modal-close">
          <img src={closeIcon} alt="close" />
        </span>
      }
    >
      <div className="accessibility-popup-card">
        <div className="accessibility-popup-title">
          {t("accessibility.title")}
        </div>
        <div className="accessibility-popup-subtitle">
          {t("accessibility.subtitle")}
        </div>
        <div className="accessibility-popup-options">
          <div className="accessibility-popup-option">
            <div className="accessibility-popup-icon-circle">
              <img
                src={colorblindIcon}
                alt="Color blindness"
                width={32}
                height={32}
              />
            </div>
            <div className="accessibility-popup-label">
              {t("accessibility.colorBlindnessMode1")}
              <br />
              {t("accessibility.mode")}
              <div className="color-blindness-options">
                <span
                  className={`invert-colors ${isDarkMode ? "active" : ""}`}
                  onClick={handleDarkModeClick}
                  style={{ cursor: "pointer", marginRight: 8 }}
                >
                  {t("accessibility.invertColors") || "Invert Colors"}
                </span>
                <span className="vertical-divider" style={{ margin: "0 4px" }}>
                  |
                </span>
                <span
                  className={`high-contrast ${isHighContrast ? "active" : ""}`}
                  // onClick={handleHighContrastClick}
                  style={{ cursor: "pointer" }}
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
              {t("accessibility.zoomMode")} (
              {zoomLevel === 1.12 ? "1.25" : zoomLevel === 1.25 ? "1.5" : "1"}x)
            </div>
          </div>
        </div>
        <button
          className="accessibility-popup-continue"
          onClick={handleContinue}
        >
          {t("accessibility.continue")}
        </button>
      </div>
    </Modal>
  );
}

export default Accessibility;
