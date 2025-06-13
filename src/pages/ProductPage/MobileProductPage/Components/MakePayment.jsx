import React from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
// Example image imports (replace with your actual paths)
import cardIcon from "../../../../assets/images/creditcard.png";
import paypalIcon from "../../../../assets/images/paypal.png";
import visaIcon from "../../../../assets/images/visa.svg";
import PaymentHeader from "./PaymentHeader";
import { useTranslation } from "react-i18next";

function MakePayment({ onClose, onPaymentSuccess }) {
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
    <>
      {/* <PaymentHeader /> */}
      <div className="outer-modal-bg">
        <div className="make-payment-modal">
          <div className="make-payment__content">
            {/* Order Summary */}
            <div className="make-payment__summary">
              <div className="make-payment__summary-top">
                <div className="make-payment__summary-title">
                  {t("payment.orderSummary.title")}
                </div>
                <div className="make-payment__summary-dates-row">
                  <div>
                    <span className="make-payment__summary-dates-label">
                      {t("payment.orderSummary.datesAndGuests")}
                    </span>
                  </div>
                  <div style={{ color: "var(--color-email-form-label)" }}>
                    <b style={{ color: "var(--color-email-form-label)" }}>
                      THU 08- FEB 2025
                    </b>
                    &nbsp;&nbsp; ADULT - 2 &nbsp;&nbsp; CHILDREN - 1
                  </div>
                </div>
              </div>
              <div className="make-payment__summary-totals">
                <div className="make-payment__summary-row">
                  <span>{t("payment.orderSummary.subTotal")}</span>
                  <span>AED {toArabicNumeral(935.71)}</span>
                </div>
                <div className="make-payment__summary-row">
                  <span>{t("payment.orderSummary.vatAndTax")}</span>
                  <span>+ 49.29 VAT & Tax</span>
                </div>
                <div className="make-payment__summary-row make-payment__summary-row--total">
                  <span>{t("payment.orderSummary.total")}</span>
                  <span>AED {toArabicNumeral(985.0)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="make-payment__payment-method">
              <div className="make-payment__payment-options">
                <label id="paymentMethod">
                  <span className="payment-method-radio-row">
                    <input
                      type="radio"
                      name="payment"
                      id="paymentMethod"
                      defaultChecked
                    />
                    <img
                      src={cardIcon}
                      alt="Credit Card"
                      className="payment-method-card__img"
                    />
                  </span>
                  <div className="payment-method-card__label1">
                    {t("payment.cardPayment.paymentMethods.creditDebitCard")}
                  </div>
                </label>
                <label id="paymentMethod">
                  <span className="payment-method-radio-row">
                    <input
                      type="radio"
                      name="payment"
                      id="paymentMethod"
                    />
                    <img
                      src={paypalIcon}
                      alt="PayPal"
                      style={{ width: 56, height: 40 }}
                    />
                  </span>
                  <div className="payment-method-card__label2">
                    {t("payment.cardPayment.paymentMethods.paypal")}
                  </div>
                </label>
              </div>
              <div className="make-payment__card-fields">
                <label id="cardNumber">
                  {t("payment.cardPayment.form.cardNumber.label")}
                  <input
                    type="text"
                    id="cardNumber"
                    value="90494847473"
                    readOnly
                  />
                </label>
                <div className="make-payment__card-row">
                  <label id="expiryDate">
                    {t("payment.cardPayment.form.expiryDate.label")}
                    <input type="text" id="expiryDate" value="06-2030" readOnly />
                  </label>
                  <label id="cvv">
                    {t("payment.cardPayment.form.cvv.label")}
                    <input type="password" id="cvv" value="xxx" readOnly />
                  </label>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              className="make-payment__pay-btn"
              onClick={onPaymentSuccess}
            >
              {t("payment.cardPayment.makePayment")}
            </button>

            {/* Card Logos */}
            <div className="make-payment__card-logos">
              <img
                src={visaIcon}
                alt="Visa"
                style={{ width: 110, height: 50, marginRight: 8 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MakePayment;
