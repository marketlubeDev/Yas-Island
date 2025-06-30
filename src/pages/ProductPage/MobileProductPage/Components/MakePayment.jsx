import React from "react";
import visaIcon from "../../../../assets/images/visa.svg";
import { useTranslation } from "react-i18next";
import CheckOutSummary from "./CheckOutSummary";
import PaymentMethod from "./PaymentMethod";

function MakePayment({ onClose, onPaymentSuccess, promoApplied }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* <PaymentHeader /> */}
      <div className="outer-modal-bg">
        <div className="make-payment-modal-container">
          <div className="make-payment-modal">
            <div className="make-payment__content">
              {/* Order Summary */}
              <CheckOutSummary promoApplied={promoApplied} />
              <br />
              <br />

              {/* Payment Method */}
              <PaymentMethod />

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
      </div>
    </>
  );
}

export default MakePayment;
