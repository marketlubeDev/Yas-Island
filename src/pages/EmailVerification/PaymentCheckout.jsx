import React, { useEffect } from "react";
import PaymentCheckoutBody from "./Components/PaymentCheckoutBody";
import Header from "../../layouts/Header/Header";

export default function PaymentCheckout() {
  // Hide Yas Chat on the email verification/checkout page to avoid intercepting taps
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("page-payment-checkout");
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("page-payment-checkout");
      }
    };
  }, []);
  return (
    <div className="payment-checkout-page">
      <Header />
      {/* edited */}
      <PaymentCheckoutBody />
    </div>
  );
}
