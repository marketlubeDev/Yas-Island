import React from "react";
import { useTranslation } from "react-i18next";

export default function PromoCodeModalContent({ checkout }) {
  const { t } = useTranslation();

  return (
    <div className="promo-modal-content">
      <h2 className="promo-modal-content__title">{t("promo.applied")}</h2>
      <div className="promo-modal-content__amount">
        {t("promo.amount")} {checkout?.promotions?.[0]?.discount}
      </div>
      <div className="promo-modal-content__saved">{t("promo.saved")}</div>
      <hr className="promo-modal-content__divider" />
      {/* <hr className="promo-modal-content__divider" /> */}
      <div className="promo-modal-content__total">
        <span>{t("payment.orderSummary.total")}</span>
        <span className="promo-modal-content__total-amount">
          {t("promo.amount")} {checkout?.grossAmount}
        </span>
      </div>
    </div>
  );
}
