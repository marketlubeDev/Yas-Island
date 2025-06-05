import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import Invert from "../../../assets/icons/invert.svg";
import Zoom from "../../../assets/icons/lens.svg";
import closeIcon from "../../../assets/icons/close.svg";

// import "./AccessibilityModal.css";

export default function AccessibilityModal({ isOpen, onClose }) {
  const { t } = useTranslation();

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

          <div className="option-card">
            <div className="option-icon">
              <img src={Zoom} alt={t("accessibility.zoomMode")} />
            </div>
            <p>{t("accessibility.zoomMode")}</p>
          </div>
        </div>

        <button className="continue-button" onClick={onClose}>
          {t("accessibility.continue")}
        </button>
      </div>
    </Modal>
  );
}
