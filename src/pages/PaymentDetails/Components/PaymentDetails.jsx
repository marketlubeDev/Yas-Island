import React, { useEffect, useState } from "react";
import PersonalDetailsForm from "../../PaymentCheckout/Components/PersonalDetailsForm";
import OrderSummary from "../../PaymentCheckout/Components/OrderSummary";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePersonalDetails,
  setCheckoutEmail,
} from "../../../global/checkoutSlice";
import { setOrderData } from "../../../global/orderSlice";
import usePayment from "../../../apiHooks/payment/payment";
import useGetProductList from "../../../apiHooks/product/product";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function PaymentDetails({ isCheckout }) {
  const checkout = useSelector((state) => state.checkout);
  const { email: otpEmail } = useSelector((state) => state.otp);
  const { verificationEmail } = useSelector((state) => state.cart);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: createOrder, isPending } = usePayment();

  // Ensure products are loaded for the current language
  useGetProductList();

  const [formData, setFormData] = useState({
    firstName: checkout?.firstName || "",
    lastName: checkout?.lastName || "",
    country: checkout?.country || "AE",
    nationality: checkout?.nationality || "",
    email: verificationEmail,
    phoneCode: "+971",
    phoneNumber: checkout?.phoneNumber || "971",
    promoCode: checkout?.promoCode || "",
  });

  useEffect(() => {
    dispatch(
      updatePersonalDetails({
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        nationality: formData.nationality,
        emailId: formData.email,
        phoneNumber: formData.phoneNumber,
      })
    );
  }, [formData, dispatch]);

  const validateData = (data) => {
    const errors = [];
    // Validate items array
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      errors.push("No items in cart");
    } else {
      // Validate each item
      data.items.forEach((item, index) => {
        if (!item.productId)
          errors.push(`Item ${index + 1}: Missing product ID`);
        if (!item.quantity || item.quantity < 1)
          errors.push(`Item ${index + 1}: Invalid quantity`);
        if (!item.validFrom)
          errors.push(`Item ${index + 1}: Missing valid from date`);
        if (!item.productMasterid)
          errors.push(`Item ${index + 1}: Missing product master ID`);
      });
    }

    // Validate personal details
    if (!data.emailId || !data.emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push(t("toastMessages.invalidEmail"));
    }
    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.push(
        t("toastMessages.invalidFirstName") ||
          t("toastMessages.somethingWentWrong")
      );
    }
    if (!data.lastName || data.lastName.trim().length < 1) {
      errors.push(
        t("toastMessages.invalidLastName") ||
          t("toastMessages.somethingWentWrong")
      );
    }
    const phoneDigits = String(data.phoneNumber || "").replace(/\D/g, "");
    if (phoneDigits.length <= 3) {
      errors.push(t("toastMessages.invalidPhoneNumber"));
    }
    if (!data.countryCode) {
      errors.push(t("toastMessages.invalidCountry"));
    }
    if (!data.amount || data.amount <= 0) {
      errors.push(t("toastMessages.checkoutFailed"));
    }
    if (!data.language) {
      errors.push(t("toastMessages.somethingWentWrong"));
    }

    if (!data.isTnCAgrred) {
      errors.push(t("toastMessages.acceptTermsAndConditions"));
    }
    if (!data.nationality) {
      errors.push(t("toastMessages.invalidNationality"));
    }

    return errors;
  };

  const sanitize = (val) =>
    String(val == null ? "" : val)
      .replace(/[<>]/g, "")
      .replace(/[\u0000-\u001F\u007F]/g, "")
      .trim();

  const handleProceedToPayment = () => {
    if (!checkout.isTnCAgrred) {
      toast.error(t("toastMessages.acceptTermsAndConditions"), {
        position: "top-center",
      });
      return;
    }

    const data = {
      coupons: [],
      items: checkout?.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        performance: item.performances,
        validFrom: item.validFrom,
        validTo: item.validTo,
        productMasterid: item.productMasterid,
      })),
      emailId: sanitize(checkout?.emailId),
      language: currentLanguage,
      amount: checkout?.netAmount,
      firstName: sanitize(checkout?.firstName),
      lastName: sanitize(checkout?.lastName),
      phoneNumber: sanitize(checkout?.phoneNumber),
      countryCode: sanitize(checkout?.country),
      isTnCAgrred: checkout.isTnCAgrred,
      isConsentAgreed: checkout.isConsentAgreed,
      nationality: sanitize(checkout?.nationality),
    };

    // Validate data before proceeding
    const validationErrors = validateData(data);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error || t("toastMessages.somethingWentWrong"));
      });
      // trigger red placeholders in the form via a custom event
      try {
        window.dispatchEvent(new CustomEvent("paymentForm:showFieldErrors"));
      } catch {}
      return;
    }

    createOrder(data, {
      onSuccess: (responseData) => {
        dispatch(setOrderData(responseData));
        navigate("/card-payment", { state: { isCheckout: true } });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            t("toastMessages.somethingWentWrong")
        );
      },
    });
  };

  return (
    <div className="payment-form">
      <PersonalDetailsForm
        formData={formData}
        setFormData={setFormData}
        handleProceedToPayment={handleProceedToPayment}
        isPending={isPending}
        checkout={checkout}
      />
      <div className="payment-form__right">
        <OrderSummary
          formData={formData}
          setFormData={setFormData}
          checkout={checkout}
          isCheckout={isCheckout}
        />
      </div>
    </div>
  );
}
