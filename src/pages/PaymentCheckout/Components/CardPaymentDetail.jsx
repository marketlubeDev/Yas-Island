import React from "react";
import cardIcon from "../../../assets/icons/card.png";
import paypalIcon from "../../../assets/icons/paypal.png";
import visaIcon from "../../../assets/icons/payment.png";

export default function CardPaymentDetail({ onPaymentComplete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    // For now, we'll just trigger the success view
    onPaymentComplete();
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Please enter payment details</h2>

      <div className="payment-methods">
        <label className="method active">
          <input
            type="radio"
            name="payment"
            defaultChecked
            className="method-input custom-radio"
            style={{ height: "20px", width: "20px" }}
          />
          <span className="custom-radio-check"></span>
          <div className="method-content">
            <span className="card-icon">
              <img src={cardIcon} alt="card" />
            </span>
            <span className="method-title">CREDIT/DEBIT CARD</span>
          </div>
        </label>

        <label className="method">
          <input
            type="radio"
            name="payment"
            className="method-input custom-radio"
            style={{ height: "20px", width: "20px" }}
          />
          <span className="custom-radio-check"></span>
          <div className="method-content">
            <span className="paypal-icon">
              <img src={paypalIcon} alt="paypal" />
            </span>
            <span className="method-title">PAYPAL</span>
          </div>
        </label>
      </div>

      <form className="payment-form">
        <div className="payment-input-row">
          <div className="payment-input-group">
            <label className="payment-input-label">
              CREDIT/DEBIT CARD NUMBER
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="card-input"
            />
          </div>
          <div className="payment-input-group">
            <label className="payment-input-label">EXPIRY DATE</label>
            <input type="text" placeholder="MM/YYYY" className="date-input" />
          </div>
        </div>

        <div className="payment-input-row">
          <div className="payment-input-group">
            <label className="payment-input-label">CVV</label>
            <input
              type="text"
              placeholder="***"
              maxLength="3"
              className="cvv-input"
            />
          </div>
        </div>
      </form>
      <div className="payment-button-container">
        <button type="submit" onClick={handleSubmit} className="payment-button">
          Make payment
        </button>
        <div className="card-logos">
          {/* <img src="/path-to/visa.png" alt="visa" className="card-logo" />
          <img
            src="/path-to/mastercard.png"
            alt="mastercard"
            className="card-logo"
          />
          <img src="/path-to/amex.png" alt="amex" className="card-logo" /> */}
          <img src={visaIcon} alt="visa" className="card-logo" />
        </div>
      </div>
    </div>
  );
}
