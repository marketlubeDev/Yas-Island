import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardPaymentDetail from "./CardPaymentDetail";
import OrderSummary from "../../../PaymentCheckout/Components/OrderSummary";

export default function CardPaymentBody() {
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.order.orderData);
  const checkout = useSelector((state) => state.checkout);

  const [formData, setFormData] = useState({
    firstName: checkout?.firstName || "",
    lastName: checkout?.lastName || "",
    country: checkout?.country || "",
    nationality: checkout?.nationality || "",
    email: checkout?.emailId || "",
    phoneCode: "+971",
    phoneNumber: checkout?.phoneNumber || "971",
    promoCode: checkout?.promoCode || "",
  });

  const handleBackClick = () => {
    // Navigate back to payment details
    navigate("/payment-details");
  };

  const handlePaymentComplete = () => {
    // Navigate to payment success
    navigate("/payment-success");
  };

  return (
    <div className="payment-checkout">
      <div className="payment-checkout__contentnew payment-checkout__contentnew--no-header">
        <CardPaymentDetail
          onBack={handleBackClick}
          onPaymentComplete={handlePaymentComplete}
          orderData={orderData}
        />
        <div className="order-summary-container" style={{ marginTop: "2rem" }}>
          <OrderSummary
            formData={formData}
            setFormData={setFormData}
            checkout={checkout}
            showPromoCode={false}
          />
        </div>
      </div>
    </div>
  );
}
