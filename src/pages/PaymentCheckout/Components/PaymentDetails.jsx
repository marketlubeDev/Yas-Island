import React, { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import OrderSummary from "./OrderSummary";

export default function PaymentDetails({ onProceed }) {
  const [formData, setFormData] = useState({
    firstName: "vivek",
    lastName: "panashi",
    country: "UAE",
    nationality: "UAE",
    phoneCode: "+971",
    phoneNumber: "527263748",
    promoCode: "f0981902",
  });

  return (
    <div className="payment-form">
      <PersonalDetailsForm formData={formData} setFormData={setFormData} />
      <div className="payment-form__right">
        <OrderSummary formData={formData} setFormData={setFormData} />
        <button className="proceedbtn" onClick={onProceed}>
          Proceed to payment
        </button>
      </div>
    </div>
  );
}
