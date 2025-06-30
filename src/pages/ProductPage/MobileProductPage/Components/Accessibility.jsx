import React, { useState } from "react";
import { Modal } from "antd";
import closeIcon from "../../../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import AccessibilityPopUp from "./AccessibilityPopUp";

import closeIconInverter from "../../../../assets/icons/closeinverter.svg";

function Accessibility({ onClose, visible }) {
  const { t } = useTranslation();

  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  console.log("hello", isDarkMode);

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
          <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
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
        <AccessibilityPopUp />
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
