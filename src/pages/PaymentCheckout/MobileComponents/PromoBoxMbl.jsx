import React from "react";
import { useTranslation } from "react-i18next";

function PromoBoxMbl({ promo, setPromo, onApplyPromo }) {
  const { t } = useTranslation();

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
            className="email-checkout__input email-checkout__promo-input"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="f0981902"
          />
          <button
            type="button"
            className="email-checkout__promo-apply"
            onClick={() => {
              if (promo.trim()) {
                onApplyPromo();
              }
            }}
          >
            {t("payment.orderSummary.promoCode.apply")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoBoxMbl;
