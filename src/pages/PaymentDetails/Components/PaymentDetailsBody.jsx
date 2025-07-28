import React from "react";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import PaymentCheckHeading from "../../PaymentCheckout/Components/PaymentCheckHeading";
import PaymentDetails from "./PaymentDetails";
import { useNavigate } from "react-router-dom";

export default function PaymentDetailsBody() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/otp-confirmation");
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="details" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <PaymentDetails />
      </div>
    </div>
  );
}
