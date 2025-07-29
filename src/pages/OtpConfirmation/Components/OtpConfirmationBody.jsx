import React, { useEffect, useState } from "react";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import PaymentCheckHeading from "../../PaymentCheckout/Components/PaymentCheckHeading";
import VerificationBox from "./VerificationBox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function OtpConfirmationBody() {
  const { email } = useSelector((state) => state.otp);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/email-verification");
    }
  }, [email, navigate]);

  const handleBackClick = () => {
    navigate("/email-verification");
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="email" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <div className="form-container">
          <VerificationBox email={email} />
        </div>
      </div>
    </div>
  );
}
