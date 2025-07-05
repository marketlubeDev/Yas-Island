import React from "react";
import { useTranslation } from "react-i18next";

function OtpFormMbl({ onConfirm }) {
  const { t } = useTranslation();

  return (
    <form
      style={{ textAlign: "center" }}
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
  );
}

export default OtpFormMbl;
