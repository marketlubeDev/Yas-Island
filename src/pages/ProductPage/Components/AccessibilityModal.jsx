import React, { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import Invert from "../../../assets/icons/invert.svg";
import Zoom from "../../../assets/icons/lens.svg";
import closeIcon from "../../../assets/icons/close.svg";

// import "./AccessibilityModal.css";

export default function AccessibilityModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomClick = () => {
    setZoomLevel((prevZoom) => {
      if (prevZoom === 1) return 1.12;
      if (prevZoom === 1.12) return 1.25;
      return 1;
    });
  };

  // Apply zoom to the document body
  React.useEffect(() => {
    document.body.style.zoom = zoomLevel;
    return () => {
      document.body.style.zoom = 1;
    };
  }, [zoomLevel]);

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
          <div className="option-card">
            <div className="option-icon">
              <img src={Invert} alt={t("accessibility.colorBlindness")} />
            </div>
            <p>{t("accessibility.colorBlindness")}</p>
          </div>

          <div className="option-card" onClick={handleZoomClick}>
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
