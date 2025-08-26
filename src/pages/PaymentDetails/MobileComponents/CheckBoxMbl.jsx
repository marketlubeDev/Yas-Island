import React from "react";
import { useTranslation } from "react-i18next";

function CheckBoxMbl({
  acceptTerms,
  receiveComms,
  handleTermsChange,
  handleTermsClick,
}) {
  const { t } = useTranslation();
  return (
    <div className="email-checkout__checkboxes-compact">
      <div className="checkbox-row">
        <input
          id="acceptTerms"
          type="checkbox"
          checked={acceptTerms}
          onChange={() => handleTermsChange("terms", !acceptTerms)}
          required
          className="checkbox-input-compact"
        />
        <label htmlFor="acceptTerms" className="checkbox-label-compact">
          {t("payment.orderSummary.terms.acceptTerms")}{" "}
          <a
            href="#"
            onClick={handleTermsClick}
            className="terms-link"
          >
            {t("payment.orderSummary.terms.termsAndConditions")}
          </a>
        </label>
      </div>
      <div className="checkbox-row">
        <input
          id="receiveComms"
          type="checkbox"
          checked={receiveComms}
          onChange={() => handleTermsChange("consent", !receiveComms)}
          className="checkbox-input-compact"
        />
        <label htmlFor="receiveComms" className="checkbox-label-compact">
          {t("payment.orderSummary.terms.receiveCommunications")}
        </label>
      </div>
    </div>
  );
}

export default CheckBoxMbl;
