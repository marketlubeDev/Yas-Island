import React from "react";
import { useTranslation } from "react-i18next";

export default function PromoCodeModalContent({checkout}) {
  const { t } = useTranslation();

  return (
    <div className="promo-modal-content">
      <h2 className="promo-modal-content__title">{t("promo.applied")}</h2>
      <div className="promo-modal-content__amount">
        {t("promo.amount")} {checkout?.promotions?.[0]?.discount}
      </div>
      <div className="promo-modal-content__saved">{t("promo.saved")}</div>
      <hr className="promo-modal-content__divider" />
      {/* <div className="promo-modal-content__summary">
        <div className="promo-modal-content__row">
          <span>{t("payment.orderSummary.subTotal")}</span>
          <span>{t("promo.amount")} 935.71</span>
        </div>
        <div className="promo-modal-content__row">
          <span>{t("payment.orderSummary.vatAndTax")}</span>
          <span>+ 49.29 {t("cart.vat")} & Tax</span>
        </div>
        <div className="promo-modal-content__row promo-modal-content__row--savings">
          <span>{t("promo.savings")}</span>
          <span>{checkout?.promotions?.[0]?.discount}</span>
        </div>
      </div> */}
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
