import React, { useEffect, useState } from "react";
import PersonalDetailsForm from "../../PaymentCheckout/Components/PersonalDetailsForm";
import OrderSummary from "../../PaymentCheckout/Components/OrderSummary";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updatePersonalDetails } from "../../../global/checkoutSlice";

export default function PaymentDetails() {
  const checkout = useSelector((state) => state.checkout);
  const currentLanguage = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

  useEffect(() => {
    dispatch(updatePersonalDetails({
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      nationality: formData.nationality,
      emailId: formData.email,
      phoneNumber: formData.phoneNumber
    }));
  }, [formData, dispatch]);


  const handleProceedToPayment = () => {

  const data =  {
    coupons: [],
    items: checkout?.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      performance: [
        {
          performanceId: item.performances[0]
        }
      ],
      validFrom: item.validFrom,
      validTo: item.validTo
    })),
    emailId: checkout?.emailId,
    language: currentLanguage,
    amount: checkout?.netAmount,
    firstName: checkout?.firstName,
    lastName: checkout?.lastName,
    phoneNumber: checkout?.phoneNumber,
    countryCode: checkout?.country,
    isTnCAgrred: true,
    isConsentAgreed: true
  }
    console.log(data , "data>>")
    // navigate("/card-payment");
  };

  return (
    <div className="payment-form">
      <PersonalDetailsForm formData={formData} setFormData={setFormData} />
      <div className="payment-form__right">
        <OrderSummary formData={formData} setFormData={setFormData} checkout={checkout} />
        <button className="proceedbtn" onClick={handleProceedToPayment}>
          {t("payment.paymentDetails.proceedToPayment")}
        </button>
      </div>
    </div>
  );
}
