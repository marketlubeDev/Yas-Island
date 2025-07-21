import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import visaIcon from "../../../assets/images/visa3.png";
import { useTranslation } from "react-i18next";
import CheckOutSummaryMbl from "../../PaymentDetails/MobileComponents/CheckOutSummaryMbl";
import PaymentMethodMbl from "./Components/PaymentMethodMbl";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";

function CardPaymentMobile() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});

  // Get checkout data from Redux
  const checkout = useSelector((state) => state.checkout);

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
              {/* <CheckOutSummaryMbl /> */}
              <CheckOutSummaryMbl
                promoApplied={false}
                formData={formData}
                setFormData={setFormData}
                checkout={checkout}
                showPromoCode={false}
              />
              <br />
              <br />

              {/* Payment Method */}
              <PaymentMethodMbl />

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
