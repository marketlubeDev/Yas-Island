import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../assets/icons/close.svg";
import closeIconInverter from "../../../assets/icons/closeinverter.svg";
import { useSelector } from "react-redux";

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
  termsAndConditions,
}) {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width="70%"
      className="terms-modal"
      // closeIcon={
      //   <span className="custom-modal-close">
      //     <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
      //   </span>
      // }
      closeIcon={false}
    >
      <div className="terms-modal-content">
        {termsAndConditions ? (
          <div
            className="terms-modal-body"
            dangerouslySetInnerHTML={{ __html: termsAndConditions }}
          />
        ) : (
          <div className="terms-modal-loading">
            <p>Loading...</p>
          </div>
        )}

        <div className="terms-modal-footer">
          <button className="terms-modal-close-btn" onClick={onClose}>
            {t("accessibility.close")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
