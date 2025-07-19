import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function CheckOutSummaryMbl({ promoApplied = false }) {
  const { t } = useTranslation();
  const [showItems, setShowItems] = useState(false);

  // Calculate totals
  const subtotal = 561.9;
  const vat = 28.1;
  const promoSavings = promoApplied ? 100.0 : 0;
  const total = subtotal + vat - promoSavings;

  return (
    <div className="email-checkout__summary">
      {/* Header */}
      <div className="email-checkout__summary-title">
        <h3>{t("orderSummary.title")}</h3>
        <span>1 {t("orderSummary.items")}</span>
      </div>
      {/* View Items Button */}
      <button
        onClick={() => setShowItems(!showItems)}
        className="email-checkout__summary-viewItems"
        type="button"
      >
        <div className="email-checkout__summary-viewItems-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="email-checkout__summary-viewItems-icon-text">
            {t("orderSummary.viewItems")}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: showItems ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {/* Item Details Section */}
      {showItems && (
        <div className="email-checkout__summary-viewItems-content">
          <div className="email-checkout__summary-viewItems-content-item">
            <span className="email-checkout__summary-viewItems-content-item-title">
              1 Day Water World
            </span>
            <span className="email-checkout__summary-viewItems-content-item-price">
              AED 561.90
            </span>
          </div>

          <div className="email-checkout__summary-viewItems-content-item-details">
            <div className="email-checkout__summary-viewItems-content-item-details-setOne">
              <span className="setSection-Content">
                {t("orderSummary.variants")}
              </span>
              <span className="setSection-Value">Adult</span>
            </div>
            <div className="email-checkout__summary-viewItems-content-item-details-setTwo">
              <span className="setSection-Content">
                {t("orderSummary.date")}
              </span>
              <span className="setSection-Value">Sat, Jul 19, 2025</span>
            </div>
            <div className="email-checkout__summary-viewItems-content-item-details-setThree">
              <span className="setSection-Content">
                {t("orderSummary.quantity")}
              </span>
              <span className="setSection-Value">2</span>
            </div>
          </div>

          <div className="email-checkout__summary-viewItems-content-item-price-details">
            <div className="email-checkout__summary-viewItems-content-item-price-details-netAmount">
              <span className="netAmount-Content">
                {t("orderSummary.netAmount")} :
              </span>
              <span className="netAmount-Value">AED 561.90</span>
            </div>
            <div className="email-checkout__summary-viewItems-content-item-price-details-vat">
              <span className="vat-Content">{t("orderSummary.vat")} :</span>
              <span className="vat-Value">+ AED 28.10</span>
            </div>
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="email-checkout__summary-costBreakdown">
        <div className="email-checkout__summary-costBreakdown-subTotal">
          <span className="subTotal-Content">
            {t("payment.orderSummary.subTotal")}
          </span>
          <span className="subTotal-Value">AED {subtotal.toFixed(1)}</span>
        </div>
        <div className="email-checkout__summary-costBreakdown-vat">
          <span className="vat-Content">{t("orderSummary.vat")}</span>
          <span className="vat-Value">+ {vat.toFixed(1)} VAT</span>
        </div>
      </div>

      {/* Promo Code Section */}
      {promoApplied && (
        <div className="email-checkout__summary-promoCode">
          <div className="email-checkout__summary-promoCode-title">
            {t("orderSummary.promoDiscount")}
          </div>
          <div className="email-checkout__summary-promoCode-input-container">
            <input
              type="text"
              placeholder={t("orderSummary.enterPromoCode")}
              className="email-checkout__summary-promoCode-input-container-inputBox"
            />
            <button
              className="email-checkout__summary-promoCode-input-container-applyButton"
              type="button"
            >
              {t("orderSummary.apply")}
            </button>
          </div>
        </div>
      )}
      {/* Total */}
      <div className="email-checkout__summary-grandTotal">
        <span className="grandTotal-Content">
          {t("payment.orderSummary.total")}
        </span>
        <span className="grandTotal-Value">AED {total.toFixed(0)}</span>
      </div>

      {/* Secure Payment Button */}
      <div className="email-checkout__summary-securePayment">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        {t("orderSummary.securePayment")}
      </div>
    </div>
  );
}

export default CheckOutSummaryMbl;
