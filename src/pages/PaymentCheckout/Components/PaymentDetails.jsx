import React, { useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm";
import OrderSummary from "./OrderSummary";
import { useTranslation } from "react-i18next";
import AmazonPayDemoButton from "../../../components/payment/amazonpay";

export default function PaymentDetails({ onProceed }) {
  const { t } = useTranslation();
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
        {/* <button className="proceedbtn" onClick={onProceed}>
          {t("payment.paymentDetails.proceedToPayment")}
        </button> */}
        <AmazonPayDemoButton />
      </div>
    </div>
  );
}
