import React, { useEffect } from "react";
import visaIcon from "../../../assets/images/visa3.png";
import { useTranslation } from "react-i18next";
import CheckOutSummaryMbl from "./Components/CheckOutSummaryMbl";
import PaymentMethodMbl from "./Components/PaymentMethodMbl";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";

function CardPaymentMobile() {
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
              <CheckOutSummaryMbl />
              <br />
              <br />

              {/* Payment Method */}
              <PaymentMethodMbl  />

     
             

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
