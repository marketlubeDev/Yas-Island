import React, { useEffect } from "react";
import PaymentSuccessBody from "./Components/PaymentSuccessBody";
import Header from "../../layouts/Header/Header";

export default function PaymentSuccessPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="payment-checkout-page">
      <Header />
      <PaymentSuccessBody />
    </div>
  );
}
