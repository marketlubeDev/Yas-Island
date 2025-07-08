import React, { useState } from "react";
import PersonalDetailsForm from "../../PaymentCheckout/Components/PersonalDetailsForm";
import OrderSummary from "../../PaymentCheckout/Components/OrderSummary";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function PaymentDetails({ onProceed }) {
  const verificationEmail = useSelector((state) => state.cart.verificationEmail);
  const checkout = useSelector((state) => state.checkout);
  console.log(checkout , "checkout>>");
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: checkout?.firstName || "",
    lastName: checkout?.lastName || "",
    country: checkout?.country || "",
    nationality: checkout?.nationality || "",
    email: verificationEmail,
    phoneCode: "+971",
    phoneNumber: "971",
    promoCode: "",
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
