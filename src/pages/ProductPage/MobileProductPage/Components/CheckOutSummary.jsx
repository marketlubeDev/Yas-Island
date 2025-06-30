import React from "react";
import { useTranslation } from "react-i18next";

function CheckOutSummary({ promoApplied }) {
  const { t } = useTranslation();

  // Calculate totals
  const subtotal = 935.71;
  const vatAndTax = 49.29;
  const promoSavings = promoApplied ? 100.0 : 0;
  const total = subtotal + vatAndTax - promoSavings;

  return (
    <div
      className="email-checkout__summary"
      style={{
        border: "1px solid var(--color-checkout-summary-border)",
      }}
    >
      <div
        className="email-checkout__summary-title"
        style={{ color: "var(--order-smry-ttl)" }}
      >
        {t("payment.orderSummary.title")}
      </div>
      <div className="email-checkout__summary-row email-checkout__summary-row--column">
        <span
          className="email-checkout__summary-label"
          style={{ color: "var(--color-email-form-otp-info)" }}
        >
          {t("payment.orderSummary.datesAndGuests")}
        </span>
        <span
          className="email-checkout__summary-value"
          style={{
            color: "var(--color-email-form-label)",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          THU 08- FEB 2025 &nbsp;&nbsp;&nbsp;&nbsp; ADULT - 2
          &nbsp;&nbsp;&nbsp;&nbsp; CHILDREN - 1
        </span>
      </div>
      <div
        className="email-checkout__summary-totals"
        style={{
          color: "var(--color-email-form-label)",
          backgroundColor: "var(--color-checkout-summary-row-bg)",
          border: "1px solid var(--color-checkout-summary-border)",
        }}
      >

        <div className="email-checkout__summary-row-container">
        <div className="email-checkout__summary-row">
          <span>{t("payment.orderSummary.subTotal")}</span>
          <span>AED {subtotal.toFixed(2)}</span>
        </div>
        <div className="email-checkout__summary-row">
          <span>{t("payment.orderSummary.vatAndTax")}</span>
          <span>+ {vatAndTax.toFixed(2)} VAT & Tax</span>
        </div>
        {promoApplied && (
          <div
            className="email-checkout__summary-row"
            style={{ color: "var(--color-pymnt-step-clr)" }}
          >
            <span>{t("payment.orderSummary.promoCodeSavings")}</span>
            <span>-{promoSavings.toFixed(2)}</span>
          </div>
        )}
        </div>


        
        <div className="email-checkout__summary-row email-checkout__summary-row--total">
          <span>{t("payment.orderSummary.total")}</span>
          <span>AED {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckOutSummary;
