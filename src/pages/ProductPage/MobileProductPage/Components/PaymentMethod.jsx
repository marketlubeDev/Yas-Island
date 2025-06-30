import React from "react";
import { useTranslation } from "react-i18next";
import cardIcon from "../../../../assets/images/creditcard.png";
import paypalIcon from "../../../../assets/images/paypal.png";

function PaymentMethod() {
  const { t } = useTranslation();
  return (
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
            <input type="radio" name="payment" id="paymentMethod" />
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
          <input type="text" id="cardNumber" value="90494847473" readOnly />
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
  );
}

export default PaymentMethod;
