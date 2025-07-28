import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
  termsAndConditions,
}) {
  const { t } = useTranslation();
  const modalBodyRef = useRef(null);

  // Reset scroll position when modal opens
  useEffect(() => {
    if (isOpen && modalBodyRef.current) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        if (modalBodyRef.current) {
          modalBodyRef.current.scrollTop = 0;
        }
      }, 100);
    }
  }, [isOpen, termsAndConditions]);

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
            ref={modalBodyRef}
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
