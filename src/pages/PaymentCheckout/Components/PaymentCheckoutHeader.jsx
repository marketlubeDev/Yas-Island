import React from "react";

const PaymentCheckoutHeader = () => {
  return (
    <header className="payment-header">
      <div className="logo">
        <img src="/path-to-your-logo.png" alt="Yas Island Logo" />
      </div>

      <div className="controls">
        <button className="control-btn" aria-label="Accessibility options">
          <i className="fas fa-universal-access"></i>
        </button>
        <button className="control-btn language-btn">
          <i className="fas fa-globe"></i>
          English
        </button>
      </div>

      <button className="cart-btn">
        <i className="fas fa-shopping-cart"></i>
        View Cart
        <span className="cart-count">9</span>
      </button>
    </header>
  );
};

export default PaymentCheckoutHeader;
