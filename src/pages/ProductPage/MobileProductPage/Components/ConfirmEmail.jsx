import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import backIcon from "../../../../assets/icons/back.svg";
import PaymentHeader from "./PaymentHeader";
import OtpSection from "./OtpSection";
import Timer from "./Timer";

function ConfirmEmail({ email = "vivek@dev.panashi.ae", onConfirm, onBack }) {
  const { t } = useTranslation();

  return (
    <div className="confirm-email__overlay">
      <div className="confirm-email__modal">
        <PaymentHeader step={1} onBack={onBack} />
        <div className="confirm-email__content">
          <div className="confirm-email__form-container">
            <div className="confirm-email__label">
              {t("payment.emailConfirmation.emailLabel")}
            </div>
            <div className="confirm-email__input-underline">{email}</div>
            <OtpSection />

            <div className="confirm-email__otp-info">
              {t("payment.verification.codeSent")} <span>{email}</span>
              <br />
              <div className="confirm-email__otp-warning">
                {t("payment.verification.checkSpam")}
              </div>
            </div>

            <Timer />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onConfirm();
              }}
            >
              <button
                className="confirm-email__confirm-btn"
                type="submit"
                style={{ marginTop: 24 }}
              >
                {t("payment.verification.confirmOtp")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmail;
