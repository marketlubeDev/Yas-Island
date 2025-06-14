import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MobileHeader from "./MobileHeader";
import ConfirmEmail from "./ConfirmEmail";
import PaymentHeader from "./paymentHeader";
import CheckOut from "./CheckOut";

function EmailVerification({ onConfirmEmail, onBack }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("vivek@dev.panashi.ae");
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);

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
      {showCheckOut && (
        <CheckOut
          onBack={() => {
            setShowCheckOut(false);
            setShowConfirmEmail(true);
          }}
          onConfirmEmail={handleConfirmEmail}
        />
      )}
      {!showConfirmEmail ? (
        <div className="outer-modal-bg">
          <PaymentHeader step={1} onBack={onBack} />
          <form className="email-verification__form" onSubmit={handleSubmit}>
            <div className="email-verification-form-box">
              <label className="email-verification-label" id="email">
                {t("payment.emailConfirmation.emailLabel")}
              </label>
              <input
                id="email"
                type="email"
                className="email-verification-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("payment.emailConfirmation.emailPlaceholder")}
                required
                style={{ color: "var(--color-email-form-input-border)" }}
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
