import React, { useEffect, useState } from "react";
import PersonalDetailsForm from "../../PaymentCheckout/Components/PersonalDetailsForm";
import OrderSummary from "../../PaymentCheckout/Components/OrderSummary";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { updatePersonalDetails } from "../../../global/checkoutSlice";
import { setOrderData } from "../../../global/orderSlice";
import usePayment from "../../../apiHooks/payment/payment";
import { useNavigate } from "react-router-dom";

export default function PaymentDetails() {
  const checkout = useSelector((state) => state.checkout);
  const currentLanguage = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: createOrder, isPending } = usePayment();
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
        performance: item.performances,
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

    createOrder(data, {
      onSuccess: (responseData) => {
        console.log(responseData, "API Response>>")
        // Store the order data in Redux
        dispatch(setOrderData(responseData));
        // Navigate to card payment page
        navigate('/card-payment');
      },
      onError: (error) => {
        console.log(error, "error>>")
      }
    });
  };

  return (
    <div className="payment-form">
      <PersonalDetailsForm formData={formData} setFormData={setFormData} />
      <div className="payment-form__right">
        <OrderSummary formData={formData} setFormData={setFormData} checkout={checkout} />
        <button className="proceedbtn" onClick={handleProceedToPayment} disabled={isPending}>
          {isPending ? "Processing..." : t("payment.paymentDetails.proceedToPayment")}
        </button>
      </div>
    </div>
  );
}
