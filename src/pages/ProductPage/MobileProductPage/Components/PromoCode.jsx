import React from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close.svg";
import closeIconInverter from "../../../../assets/icons/closeinverter.svg";
import { useSelector } from "react-redux";

function PromoCodePopup({ onClose }) {
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

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
        <span className="promo-popup-custom-close" onClick={onClose}>
          <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
        </span>
        <div className="promo-popup-title">{t("promo.applied")}</div>
        <div className="promo-popup-amount">
          {t("promo.amount")} {toArabicNumeral(100.0)}
        </div>
        <div className="promo-popup-saved">{t("promo.saved")}</div>
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
          <span>{t("promo.savings")}</span>
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
