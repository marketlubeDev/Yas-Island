import React, { useState } from "react";
import PersonalDetailsForm from "../../PaymentCheckout/Components/PersonalDetailsForm";
import OrderSummary from "../../PaymentCheckout/Components/OrderSummary";
import { useTranslation } from "react-i18next";

export default function PaymentDetails({ onProceed }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "vivek",
    lastName: "panashi",
    country: "UAE",
    nationality: "UAE",
    email: "",
    phoneCode: "+971",
    phoneNumber: "971",
    promoCode: "f0981902",
  });

  return (
    <div className="payment-form">
      <PersonalDetailsForm formData={formData} setFormData={setFormData} />
      <div className="payment-form__right">
        <OrderSummary formData={formData} setFormData={setFormData} />
        <button className="proceedbtn" onClick={onProceed}>
          {t("payment.paymentDetails.proceedToPayment")}
        </button>
      </div>
    </div>
  );
}
