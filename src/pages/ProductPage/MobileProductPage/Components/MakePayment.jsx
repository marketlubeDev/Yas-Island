import React from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
// Example image imports (replace with your actual paths)
import cardIcon from "../../../../assets/images/creditcard.png";
import paypalIcon from "../../../../assets/images/paypal.png";
import visaIcon from "../../../../assets/images/visa.svg";

function MakePayment({ onClose, onPaymentSuccess }) {
  return (
    <div className="outer-modal-bg">
      <div className="make-payment-modal">
        <div className="email-verification-header-fixed">
          <MobileHeader />
        </div>
        <div className="make-payment__content">
          {/* Order Summary */}
          <div className="make-payment__summary">
            <div className="make-payment__summary-title">
              1 day FERRARI WORLD YAS ISLAND
            </div>
            <div className="make-payment__summary-row">
              <span>DATES & GUESTS</span>
              <span>
                <b>THU 08- FEB 2025</b> &nbsp; ADULT - 2 &nbsp; CHILDREN - 1
              </span>
            </div>
            <div className="make-payment__summary-row">
              <span>Sub total :</span>
              <span>AED 935.71</span>
            </div>
            <div className="make-payment__summary-row">
              <span>vat & tax :</span>
              <span>+ 49.29 VAT & Tax</span>
            </div>
            <div className="make-payment__summary-row make-payment__summary-row--total">
              <span>Total :</span>
              <span>AED 985.00</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="make-payment__payment-method">
            <div className="make-payment__payment-options">
              <label>
                <input type="radio" name="payment" defaultChecked />
                <span>
                  <img
                    src={cardIcon}
                    alt="Card"
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  CREDIT/DEBIT CARD
                </span>
              </label>
              <label>
                <input type="radio" name="payment" />
                <span>
                  <img
                    src={paypalIcon}
                    alt="PayPal"
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  PAYPAL
                </span>
              </label>
            </div>
            <div className="make-payment__card-fields">
              <label>
                CREDIT/DEBIT CARD NUMBER
                <input type="text" value="90494847473" readOnly />
              </label>
              <div className="make-payment__card-row">
                <label>
                  EXPIRY DATE
                  <input type="text" value="06-2030" readOnly />
                </label>
                <label>
                  CVV
                  <input type="password" value="xxx" readOnly />
                </label>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button className="make-payment__pay-btn" onClick={onPaymentSuccess}>
            Make payment
          </button>

          {/* Card Logos */}
          <div className="make-payment__card-logos">
            <img
              src={visaIcon}
              alt="Visa"
              style={{ width: 160, height: 50, marginRight: 8 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakePayment;
