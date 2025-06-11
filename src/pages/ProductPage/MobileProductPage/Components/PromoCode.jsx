import React from "react";
import { useTranslation } from "react-i18next";

function PromoCodePopup({ onClose }) {
  const { t, i18n } = useTranslation();

  const toArabicNumeral = (num) => {
    if (i18n.language === "ar") {
      const arabicNumerals = [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩",
        ".",
      ];
      return num
        .toString()
        .split("")
        .map((digit) =>
          digit === "." ? "." : arabicNumerals[parseInt(digit, 10)]
        )
        .join("");
    }
    return num;
  };

  return (
    <div className="promo-popup-overlay">
      <div className="promo-popup-card">
        <button className="promo-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="promo-popup-title">{t("payment.promo.applied")}</div>
        <div className="promo-popup-amount">
          {t("payment.promo.amount")} {toArabicNumeral(100.0)}
        </div>
        <div className="promo-popup-saved">{t("payment.promo.saved")}</div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row">
          <span>{t("payment.orderSummary.subTotal")}</span>
          <span>
            {t("promo.amount")} {toArabicNumeral(935.71)}
          </span>
        </div>
        <div className="promo-popup-row">
          <span>{t("payment.orderSummary.vatAndTax")}</span>
          <span>+ 49.29 {t("payment.orderSummary.vatAndTax")}</span>
        </div>
        <div className="promo-popup-row">
          <span>{t("payment.promo.savings")}</span>
          <span>-{toArabicNumeral(100.0)}</span>
        </div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row promo-popup-row--total">
          <span>{t("payment.orderSummary.total")}</span>
          <span>
            {t("promo.amount")} {toArabicNumeral(885.0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PromoCodePopup;
