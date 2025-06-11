import React from "react";
import { Modal } from "antd";
import colorblindIcon from "../../../../assets/icons/colorblindness.svg";
import zoomIcon from "../../../../assets/icons/zoom.svg";
import closeIcon from "../../../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Accessibility({ onClose, visible }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
    window.scrollTo(0, 0);
  };

  const handleContinue = () => {
    onClose();
    window.scrollTo(0, 0);
  };

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
            </div>
          </div>
          <div className="accessibility-popup-option">
            <div className="accessibility-popup-icon-circle">
              <img src={zoomIcon} alt="Zoom mode" width={32} height={32} />
            </div>
            <div className="accessibility-popup-label">
              {t("accessibility.zoomMode")}
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
