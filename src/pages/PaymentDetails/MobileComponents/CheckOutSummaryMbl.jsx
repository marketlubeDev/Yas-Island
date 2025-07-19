import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function CheckOutSummaryMbl({ promoApplied }) {
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
      <div className="email-checkout__summary-title" style={{}}>
        <h3>Order Summary</h3>
        <span>1 item</span>
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
          <span style={{ color: "#333" }}>View Items</span>
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

          <div style={{ marginBottom: "8px" }}>
            <div
              className="email-checkout__summary-viewItems-content-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>Variants</span>
              <span style={{ color: "#333", fontSize: "14px" }}>Adult</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>Date</span>
              <span style={{ color: "#333", fontSize: "14px" }}>
                Sat, Jul 19, 2025
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#666", fontSize: "14px" }}>Quantity</span>
              <span style={{ color: "#333", fontSize: "14px" }}>2</span>
            </div>
          </div>

          <div
            style={{
              paddingTop: "8px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px",
              }}
            >
              <span style={{ color: "#333", fontSize: "14px" }}>
                Net Amount :
              </span>
              <span style={{ color: "#333", fontSize: "14px" }}>
                AED 561.90
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#333", fontSize: "14px" }}>VAT :</span>
              <span style={{ color: "#333", fontSize: "14px" }}>
                + AED 28.10
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ color: "#333" }}>
            {t("payment.orderSummary.subTotal")}
          </span>
          <span style={{ color: "#333" }}>AED {subtotal.toFixed(1)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#333" }}>VAT</span>
          <span style={{ color: "#333" }}>+ {vat.toFixed(1)} VAT</span>
        </div>
      </div>

      {/* Promo Code Section */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "12px",
            color: "#333",
            textTransform: "uppercase",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          Enter your promo code to get discount
        </div>
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            placeholder="Enter promo code"
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          />
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "6px",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Total */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          paddingTop: "12px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <span style={{ fontWeight: "bold", color: "#333" }}>
          {t("payment.orderSummary.total")}
        </span>
        <span style={{ fontWeight: "bold", color: "#333" }}>
          AED {total.toFixed(0)}
        </span>
      </div>

      {/* Secure Payment Button */}
      <div
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "none",
          color: "#4CAF50",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
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
        Secure Payment
      </div>
    </div>
  );
}

export default CheckOutSummaryMbl;
