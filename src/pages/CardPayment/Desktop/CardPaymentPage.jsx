import React, { useEffect } from "react";
import CardPaymentBody from "./Components/CardPaymentBody";
import Header from "../../../layouts/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardPaymentPage() {
  const { isCheckout } = useLocation().state || { isCheckout: false };
  const navigate = useNavigate();
  useEffect(() => {
    if (!isCheckout) {
      navigate("/");
    }
  }, [isCheckout]);
  return (
    <div className="payment-checkout-page">
      <Header />
      <CardPaymentBody isCheckout={isCheckout} />
    </div>
  );
}
