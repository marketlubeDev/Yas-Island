import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  setZoomLevel,
  toggleDarkMode,
} from "../../../global/accessibilitySlice";
import Invert from "../../../assets/icons/invert.svg";
import Zoom from "../../../assets/icons/lens.svg";
import closeIcon from "../../../assets/icons/close.svg";

// import "./AccessibilityModal.css";

export default function AccessibilityModal({ isOpen, onClose }) {
  const { t } = useTranslation();
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
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      closeIcon={
        <span className="custom-modal-close">
          <img src={closeIcon} alt={t("accessibility.close")} />
        </span>
      }
      className="accessibility-web-modal"
      // width="40%"
    >
      <div className="modal-content">
        <h2>{t("accessibility.title")}</h2>
        <p className="subtitle">{t("accessibility.subtitle")}</p>

        <div className="options-container">
          <div
            className={`option-card ${
              isDarkMode || isHighContrast ? "active" : ""
            }`}
            onClick={handleDarkModeClick}
          >
            <div className="option-icon">
              <img src={Invert} alt={t("accessibility.colorBlindness")} />
            </div>
            <p>{t("accessibility.colorBlindness")}</p>
            <span>
              <span className={`invert-colors ${isDarkMode ? "active" : ""}`}>
                {t("accessibility.invertColors")}
              </span>{" "}
              <span className="vertical-divider-card"></span>
              <span
                className={`high-contrast ${isDarkMode ? "active" : ""}`}
                style={{ fontWeight: isHighContrast ? "bold" : "normal" }}
              >
                {t("accessibility.highContrast")}
              </span>
            </span>
          </div>

          <div
            className={`option-card ${zoomLevel !== 1 ? "active" : ""}`}
            onClick={handleZoomClick}
          >
            <div className="option-icon">
              <img src={Zoom} alt={t("accessibility.zoomMode")} />
            </div>
            <p>
              {t("accessibility.zoomMode")} ({getZoomLabel()})
            </p>
          </div>
        </div>

        <button className="continue-button" onClick={onClose}>
          {t("accessibility.continue")}
        </button>
      </div>
    </Modal>
  );
}
