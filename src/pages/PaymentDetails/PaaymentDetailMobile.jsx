import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import InputFieldsMbl from "./MobileComponents/InputFieldsMbl";
import CheckOutSummaryMbl from "./MobileComponents/CheckOutSummaryMbl";
// import PromoBoxMbl from "./MobileComponents/PromoBoxMbl";
import CheckBoxMbl from "./MobileComponents/CheckBoxMbl";
import PromoCodeMbl from "./MobileComponents/PromoCodeMbl";
import PaymentHeaderMbl from "../Home/MobileComponents/PaymentHeaderMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import usePayment from "../../apiHooks/payment/payment";
import { setOrderData } from "../../global/orderSlice";
import { updateTermsAcceptance } from "../../global/checkoutSlice";
import ButtonLoading from "../../components/Loading/ButtonLoading";

function PaymentDetailsMobile() {
  const { t } = useTranslation();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);
  const [promo, setPromo] = useState("");
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const dispatch = useDispatch();

  const { mutate: createOrder, isPending } = usePayment();

  // Get checkout data from Redux
  const checkout = useSelector((state) => state.checkout);

  const handleApplyPromo = () => {
    setShowPromoPopup(true);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
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
          // error?.response?.data?.message ||
          "Something went wrong with the payment"
        );
      },
    });
    // navigate("/card-payment");
  };

  const handleTermsChange = (type, checked) => {
    if (type === "terms") {
      setAcceptTerms(checked);
      dispatch(
        updateTermsAcceptance({
          isTnCAgrred: checked,
          isConsentAgreed: checkout.isConsentAgreed,
        })
      );
    } else if (type === "consent") {
      setReceiveComms(checked);
      dispatch(
        updateTermsAcceptance({
          isTnCAgrred: checkout.isTnCAgrred,
          isConsentAgreed: checked,
        })
      );
    }
  };

  return (
    <>
      <MobileHeader />
      <div className="email-checkout__overlay">
        <PaymentHeaderMbl
          step={2}
          onBack={() => navigate("/otp-confirmation")}
        />
        <div className="email-checkout__container">
          <div className="email-checkout__form-container">
            <form className="email-checkout__form" onSubmit={handleSubmit}>
              <div className="email-checkout__steps-underline"></div>

              <InputFieldsMbl />
              <CheckOutSummaryMbl
                promoApplied={true}
                formData={formData}
                setFormData={setFormData}
                checkout={checkout}
                showPromoCode={true}
              />
              <CheckBoxMbl
                acceptTerms={acceptTerms}
                setAcceptTerms={setAcceptTerms}
                receiveComms={receiveComms}
                setReceiveComms={setReceiveComms}
                handleTermsChange={handleTermsChange}
              />

              <button
                className="email-checkout__btn"
                type="submit"
                style={{
                  backgroundColor: "var(--color-email-form-confirm-btn)",
                  color: "var(--color-email-form-confirm-btn-clr)",
                }}
                disabled={!acceptTerms}
              >
                {isPending ? (
                  <ButtonLoading />
                ) : (
                  t("payment.paymentDetails.proceedToPayment")
                )}
              </button>
            </form>
          </div>
        </div>

        {showPromoPopup && (
          <PromoCodeMbl onClose={() => setShowPromoPopup(false)} />
        )}
      </div>
    </>
  );
}

export default PaymentDetailsMobile;
