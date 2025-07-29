import React from "react";
import { useTranslation } from "react-i18next";

function CheckBoxMbl({
  acceptTerms,
  setAcceptTerms,
  receiveComms,
  setReceiveComms,
  handleTermsChange,
}) {
  const { t } = useTranslation();
  return (
    <div className="email-checkout__checkboxes">
      <div
        id="acceptTerms"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}
      >
        <input
          id="acceptTerms"
          type="checkbox"
          checked={acceptTerms}
          onChange={() => handleTermsChange("terms", !acceptTerms)}
          required
        />
        {t("payment.orderSummary.terms.acceptTerms")}{" "}
        <a
          style={{
            textDecoration: "underline",
          }}
        >
          {t("payment.orderSummary.terms.termsAndConditions")}
        </a>
      </div>
      <div
        id="receiveComms"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <input
          id="receiveComms"
          type="checkbox"
          checked={receiveComms}
          onChange={() => handleTermsChange("consent", !receiveComms)}
        />
        {t("payment.orderSummary.terms.receiveCommunications")}
      </div>
    </div>
  );
}

export default CheckBoxMbl;
