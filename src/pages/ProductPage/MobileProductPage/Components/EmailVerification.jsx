import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader";
import ConfirmEmail from "./ConfirmEmail";
import PaymentHeader from "./paymentHeader";

function EmailVerification({ onConfirmEmail }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("vivek@dev.panashi.ae");
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmEmail(true);
  };

  const handleConfirmOTP = () => {
    if (onConfirmEmail) {
      onConfirmEmail();
    }
  };

  return (
    <>
      {!showConfirmEmail ? (
        <div className="outer-modal-bg">
          <PaymentHeader />
          <form className="email-verification__form" onSubmit={handleSubmit}>
            <div className="email-verification-form-box">
              <label className="email-verification-label">
                {t("payment.emailConfirmation.emailLabel")}
              </label>
              <input
                type="email"
                className="email-verification-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("payment.emailConfirmation.emailPlaceholder")}
                required
              />
              <button className="email-verification-confirm-btn" type="submit">
                {t("payment.emailConfirmation.confirmButton")}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <ConfirmEmail
          onBack={() => setShowConfirmEmail(false)}
          onConfirm={handleConfirmOTP}
        />
      )}
    </>
  );
}

export default EmailVerification;
