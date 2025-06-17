import React from "react";
import arrow from "../../../assets/icons/left.svg";
import arrowDark from "../../../assets/icons/invertLeft.svg";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function PaymentCheckoutHeader({ onBackClick }) {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  return (
    <div className="payment-checkout__header">
      <button className="back-button" onClick={onBackClick}>
        <img src={isDarkMode ? arrowDark : arrow} alt={t("payment.arrow")} />{" "}
        {t("payment.back")}
      </button>
      <h1 className="payment-checkout__title">{t("payment.title")}</h1>
    </div>
  );
}
