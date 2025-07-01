import React from "react";
import { useTranslation } from "react-i18next";

function CheckBoxMbl({
  acceptTerms,
  setAcceptTerms,
  receiveComms,
  setReceiveComms,
}) {
  const { t } = useTranslation();
  return (
    <div className="email-checkout__checkboxes">
      <label
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
          onChange={() => setAcceptTerms((v) => !v)}
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
      </label>
      <label
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
          onChange={() => setReceiveComms((v) => !v)}
        />
        {t("payment.orderSummary.terms.receiveCommunications")}
      </label>
    </div>
  );
}

export default CheckBoxMbl;
