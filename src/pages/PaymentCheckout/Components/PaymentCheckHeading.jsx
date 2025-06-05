import React from "react";
import arrow from "../../../assets/icons/left.svg";
import { useTranslation } from "react-i18next";

export default function PaymentCheckoutHeader({ onBackClick }) {
  const { t } = useTranslation();

  return (
    <div className="payment-checkout__header">
      <button className="back-button" onClick={onBackClick}>
        <img src={arrow} alt={t("payment.arrow")} /> {t("payment.back")}
      </button>
      <h1 className="payment-checkout__title">{t("payment.title")}</h1>
    </div>
  );
}
