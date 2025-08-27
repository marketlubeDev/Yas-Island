import React, { useEffect } from "react";
import PaymentResponseBody from "./Components/PaymentResponseBody";
import Header from "../../layouts/Header/Header";

export default function PaymentResponsePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="payment-checkout-page">
      <Header />
      <PaymentResponseBody />
    </div>
  );
}
