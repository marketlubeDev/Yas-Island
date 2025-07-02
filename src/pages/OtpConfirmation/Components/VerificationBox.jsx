import React from "react";
import { useTranslation } from "react-i18next";

export default function VerificationBox({ email }) {
  const { t } = useTranslation();

  return (
    <div className="verification-containerBox">
      <p className="verification-text">
        {t("payment.verification.codeSent")}{" "}
        <span className="email" style={{ textDecoration: "underline" }}>
          {email}
        </span>
      </p>
      <p className="spam-notice">{t("payment.verification.checkSpam")}</p>

      <div className="verification-container">
        <p className="verification-label">
          {t("payment.verification.enterCode")}
        </p>
        <div className="code-inputs">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-input"
            />
          ))}
        </div>
      </div>
      <div className="timer-section">
        <span className="expire-text">
          {t("payment.verification.willExpire")}
        </span>
        <span className="timer">03:00</span>
        <button className="resend-btn">
          {t("payment.verification.resend")}
        </button>
      </div>
    </div>
  );
}
