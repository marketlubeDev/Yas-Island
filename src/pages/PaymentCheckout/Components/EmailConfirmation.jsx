import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import VerificationBox from "./VerificationBox";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../global/checkoutSlice";

export default function EmailConfirmation({
  onVerificationComplete,
  showVerification,
  setShowVerification,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("");

  const handleConfirmEmail = () => {
    dispatch(setEmail(emailValue));
    if (!showVerification) {
      // First click - show verification box
      setShowVerification(true);
    } else {
      // Second click - complete verification and show payment details
      onVerificationComplete();
    }
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label>{t("payment.emailConfirmation.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("payment.emailConfirmation.emailPlaceholder")}
          className="form-control"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <div className="input-underline"></div>
      </div>

      <button className="confirm-button" onClick={handleConfirmEmail}>
        {showVerification
          ? t("payment.emailConfirmation.completeVerification")
          : t("payment.emailConfirmation.confirmButton")}
      </button>
    </div>
  );
}
