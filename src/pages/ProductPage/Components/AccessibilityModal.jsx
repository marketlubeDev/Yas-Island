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

  const handleZoomClick = () => {
    let newZoomLevel;
    if (zoomLevel === 1) newZoomLevel = 1.12;
    else if (zoomLevel === 1.12) newZoomLevel = 1.25;
    else newZoomLevel = 1;

    dispatch(setZoomLevel(newZoomLevel));
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
      className="accessibility-modal"
      width="40%"
    >
      <div className="modal-content">
        <h2>{t("accessibility.title")}</h2>
        <p className="subtitle">{t("accessibility.subtitle")}</p>

        <div className="options-container">
          <div className="option-card" onClick={handleDarkModeClick}>
            <div className="option-icon">
              <img src={Invert} alt={t("accessibility.colorBlindness")} />
            </div>
            <p>
              {isDarkMode ? "Invert Colors" : t("accessibility.colorBlindness")}
            </p>
          </div>

          <div
            className={`option-card ${zoomLevel !== 1 ? "active" : ""}`}
            onClick={handleZoomClick}
          >
            <div className="option-icon">
              <img src={Zoom} alt={t("accessibility.zoomMode")} />
            </div>
            <p>
              {t("accessibility.zoomMode")} (
              {zoomLevel === 1.12 ? "1.25" : zoomLevel === 1.25 ? "1.5" : "1"}x)
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
