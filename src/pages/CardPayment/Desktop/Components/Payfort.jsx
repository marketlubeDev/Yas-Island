import React from "react";
import "./payfort.css";

export default function Payfort() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="wrapper">
      <form id="paymentForm" className="container" onSubmit={handleSubmit}>
        <div className="input">
          <input
            id="cardNoInput"
            className="input-field"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder=" "
            aria-label="Card Number"
          />
          <label className="input-label" htmlFor="cardNoInput">
            <span className="input-label-content">Card number</span>
          </label>
        </div>

        <div className="half-containter">
          <div className="input half1">
            <input
              id="expDateInput"
              className="input-field"
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder=" "
              aria-label="Expiry Date"
            />
            <label className="input-label" htmlFor="expDateInput">
              <span className="input-label-content">Expiry date (MM/YY)</span>
            </label>
          </div>

          <div className="input half2">
            <input
              id="cvvInput"
              className="input-field"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder=" "
              aria-label="CVV"
            />
            <label className="input-label" htmlFor="cvvInput">
              <span className="input-label-content">CVV</span>
            </label>
          </div>
        </div>

        <button type="submit" className="pay br">
          Pay now
        </button>
      </form>
    </div>
  );
}
