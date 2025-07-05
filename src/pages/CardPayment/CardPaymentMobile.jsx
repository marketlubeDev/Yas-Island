import React, { useEffect } from "react";
import visaIcon from "../../assets/images/visa3.png";
import { useTranslation } from "react-i18next";
import CheckOutSummaryMbl from "./MobileComponent/CheckOutSummaryMbl";
import PaymentMethodMbl from "./MobileComponent/PaymentMethodMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";

function CardPaymentMobile({ onClose, onPaymentSuccess, promoApplied }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <PaymentHeader /> */}
      <MobileHeader />
      <div className="outer-modal-bg">
        <div className="make-payment-modal-container">
          <div className="make-payment-modal">
            <div className="make-payment__content">
              {/* Order Summary */}
              <CheckOutSummaryMbl promoApplied={promoApplied} />
              <br />
              <br />

              {/* Payment Method */}
              <PaymentMethodMbl />

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
                  style={{ width: 110, height: 35 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPaymentMobile;
