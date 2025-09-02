import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import { useUppercaseInput } from "../../../hooks/useUppercaseInput";

function PromoBoxMbl() {
  const { t } = useTranslation();
  // Use uppercase input hook for promo code with display transformation
  const promoCodeInput = useUppercaseInput("");
  const [status, setStatus] = useState(null); // null | 'valid' | 'invalid'
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      if (!promoCodeInput.rawValue) {
        setStatus("invalid");
        setLoading(false);
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
        return;
      }
      const response = await validatePromocode(promoCodeInput.rawValue);
      if (!response?.data?.coupondetails?.coupon) {
        setStatus("invalid");
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
      } else {
        setStatus("valid");
        toast.success(t("orderSummary.promoCodeApplied"), {
          position: "top-center",
        });
      }
    } catch (e) {
      setStatus("invalid");
      toast.error(t("toastMessages.invalidPromoCode"), {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="email-checkout__promo-container">
      <div
        className="email-checkout__promo-box"
        style={{
          backgroundColor: "var(--color-checkout-summary-bg)",
          border: "1px solid var(--color-checkout-summary-border)",
        }}
      >
        <label id="promoCode" className="email-checkout__label">
          {t("payment.orderSummary.promoCode.label")}
          <br />
          {t("payment.orderSummary.promoCode.label2")}
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            id="promoCode"
            type="text"
            className={`email-checkout__input email-checkout__promo-input ${
              status === "valid"
                ? "valid"
                : status === "invalid"
                ? "invalid"
                : ""
            }`}
            placeholder="f0981902"
            value={promoCodeInput.displayValue}
            onChange={(e) => {
              promoCodeInput.onChange(e);
              setStatus(null);
            }}
            onCompositionStart={promoCodeInput.onCompositionStart}
            onCompositionEnd={promoCodeInput.onCompositionEnd}
            onFocus={() => setStatus(null)}
          />
          <button
            type="button"
            className="email-checkout__promo-apply"
            onClick={handleApply}
            disabled={loading}
          >
            {loading
              ? t("common.loading")
              : t("payment.orderSummary.promoCode.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoBoxMbl;
