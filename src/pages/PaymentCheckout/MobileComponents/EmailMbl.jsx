import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setEmail } from "../../../global/checkoutSlice";
import { useState } from "react";

function EmailMbl({ onEmailSubmit }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("vivek@dev.panashi.ae");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setEmail(emailValue));
    if (onEmailSubmit) {
      onEmailSubmit();
    }
  };
  return (
    <>
      <form className="email-verification__form" onSubmit={handleSubmit}>
        <div className="email-verification-form-box">
          <label className="email-verification-label" id="email">
            {t("payment.emailConfirmation.emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            className="email-verification-input"
            // value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder={t("payment.emailConfirmation.emailPlaceholder")}
            required
            style={{ color: "var(--color-email-form-input-border)" }}
          />
          <button className="email-verification-confirm-btn" type="submit">
            {t("payment.emailConfirmation.confirmButton")}
          </button>
        </div>
      </form>
    </>
  );
}

export default EmailMbl;
