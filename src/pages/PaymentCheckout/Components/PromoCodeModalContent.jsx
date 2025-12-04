import React from "react";
import { useTranslation } from "react-i18next";

export default function PromoCodeModalContent({ checkout }) {
  const { t } = useTranslation();

  // Prefer the coupon that the user actually applied
  const appliedCoupon = checkout?.coupons?.[0];

  // Try to find the promotion that corresponds to the applied coupon code.
  // Fallbacks:
  //  - any promotion of type "2" (coupon-type promotion)
  //  - first promotion that has a discount
  //  - first promotion in the list
  const appliedPromotion =
    checkout?.promotions?.find(
      (promotion) =>
        appliedCoupon?.code && promotion?.code === appliedCoupon.code
    ) ||
    checkout?.promotions?.find((promotion) => promotion?.type === "2") ||
    checkout?.promotions?.find((promotion) => promotion?.discount) ||
    checkout?.promotions?.[0];

  const appliedCouponCode = appliedCoupon?.code || appliedPromotion?.code || "";

  const rawDiscount =
    appliedPromotion?.discount ?? checkout?.promotions?.[0]?.discount ?? 0;
  const formattedDiscount = Math.abs(Number(rawDiscount) || 0).toFixed(2);

  return (
    <div className="promo-modal-content celebrate">
      <div className="ribbons" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, idx) => (
          <span key={idx} className="ribbon" />
        ))}
      </div>
      <h2 className="promo-modal-content__title">{t("promo.applied")}</h2>

      {appliedCouponCode && (
        <div className="promo-modal-content__coupon">
          {t("orderSummary.couponApplied")}{" "}
          <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
            {appliedCouponCode}
          </span>
        </div>
      )}

      <div className="promo-modal-content__amount" style={{ color: "green" }}>
        {/* {t("orderSummary.couponSavings")}{" "} */}
        <span style={{ fontWeight: "bold" }}>
          {t("common.aed")} {formattedDiscount}
        </span>
      </div>

      <div className="promo-modal-content__saved">{t("promo.saved")}</div>
      <hr className="promo-modal-content__divider" />

      <div className="promo-modal-content__total">
        <span>{t("payment.orderSummary.total")}</span>
        <span className="promo-modal-content__total-amount">
          {t("common.aed")} {checkout?.grossAmount}
        </span>
      </div>
    </div>
  );
}
