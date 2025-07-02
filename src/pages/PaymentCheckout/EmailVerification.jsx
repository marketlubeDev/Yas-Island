import React from "react";
import EmailVerificationBody from "./Components/EmailVerificationBody";
import Header from "../../layouts/Header/Header";

export default function EmailVerification() {
  return (
    <div className="payment-checkout-page">
      <Header />
      <EmailVerificationBody />
    </div>
  );
}
