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
import ButtonLoading from "../../../components/Loading/ButtonLoading";

export default function PaymentDetails({ isCheckout }) {
  const checkout = useSelector((state) => state.checkout);
  const { email: otpEmail } = useSelector((state) => state.otp);
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
    email: otpEmail || checkout?.emailId || "",
    phoneCode: "+971",
    phoneNumber: checkout?.phoneNumber || "971",
    promoCode: checkout?.promoCode || "",
  });

  // Sync email from OTP slice to checkout slice
  useEffect(() => {
    if (otpEmail && otpEmail !== checkout?.emailId) {
      dispatch(setCheckoutEmail(otpEmail));
      setFormData((prev) => ({ ...prev, email: otpEmail }));
    }
  }, [otpEmail, checkout?.emailId, dispatch]);

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
      errors.push("Invalid email address");
    }
    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.push("First name is required ");
    }
    if (!data.lastName || data.lastName.trim().length < 1) {
      errors.push("Last name is required ");
    }
    if (!data.phoneNumber || data.phoneNumber.length < 8) {
      errors.push("Valid phone number is required");
    }
    if (!data.countryCode) {
      errors.push("Country is required");
    }
    if (!data.amount || data.amount <= 0) {
      errors.push("Invalid order amount");
    }
    if (!data.language) {
      errors.push("Language preference is required");
    }

    if (!data.isTnCAgrred) {
      errors.push("Please accept the terms and conditions to proceed");
    }
    if (!data.nationality) {
      errors.push("Nationality is required");
    }

    return errors;
  };

  const handleProceedToPayment = () => {
    if (!checkout.isTnCAgrred) {
      toast.error("Please accept the terms and conditions to proceed");
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
      emailId: checkout?.emailId,
      language: currentLanguage,
      amount: checkout?.netAmount,
      firstName: checkout?.firstName,
      lastName: checkout?.lastName,
      phoneNumber: checkout?.phoneNumber,
      countryCode: checkout?.country,
      isTnCAgrred: checkout.isTnCAgrred,
      isConsentAgreed: checkout.isConsentAgreed,
      nationality: checkout?.nationality,
    };

    // Validate data before proceeding
    const validationErrors = validateData(data);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error);
      });
      return;
    }

    createOrder(data, {
      onSuccess: (responseData) => {
        dispatch(setOrderData(responseData));
        navigate("/card-payment");
      },
      onError: (error) => {
        console.log(error, "error>>");
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong with the payment"
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
