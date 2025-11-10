import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import InputFieldsMbl from "./MobileComponents/InputFieldsMbl";
import CheckOutSummaryMbl from "./MobileComponents/CheckOutSummaryMbl";

import CheckBoxMbl from "./MobileComponents/CheckBoxMbl";
import PromoCodeMbl from "./MobileComponents/PromoCodeMbl";
import PaymentHeaderMbl from "../Home/MobileComponents/PaymentHeaderMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import usePayment from "../../apiHooks/payment/payment";
import useCheckBasket from "../../apiHooks/Basket/checkbasket";
import { setOrderData } from "../../global/orderSlice";
import { updateTermsAcceptance, setCheckout } from "../../global/checkoutSlice";
import ButtonLoading from "../../components/Loading/ButtonLoading";
import getTermsAndCondition from "../../serivces/termsandconditon/termsandconditionon";
import TermsAndConditionsModal from "../PaymentCheckout/Components/TermsAndConditionsModal";
import { parsePhoneNumber } from "libphonenumber-js";

function PaymentDetailsMobile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const dispatch = useDispatch();
  const { isCheckout } = useLocation().state || {};
  const { mutate: createOrder, isPending } = usePayment();
  const { mutate: checkBasket, isPending: isCheckingBasket } = useCheckBasket();
  const productList = useSelector((state) => state.product.allProducts);

  // Get checkout data from Redux
  const checkout = useSelector((state) => state.checkout);

  useEffect(() => {
    // Check if we have a valid navigation timestamp (set when navigating TO payment-details)
    const navigationTimestamp = sessionStorage.getItem(
      "paymentDetailsNavigationTime"
    );
    const currentTime = Date.now();

    // Check if navigation happened within the last 5 seconds (normal navigation)
    const isValidNavigation =
      navigationTimestamp && currentTime - parseInt(navigationTimestamp) < 5000;

    if (!isCheckout || !isValidNavigation) {
      sessionStorage.removeItem("paymentDetailsNavigationTime");
      navigate("/", { replace: true });
      return;
    }

    sessionStorage.removeItem("paymentDetailsNavigationTime");
  }, [isCheckout, navigate]);

  // Initialize local state with Redux values
  const [acceptTerms, setAcceptTerms] = useState(checkout.isTnCAgrred || false);
  const [receiveComms, setReceiveComms] = useState(
    checkout.isConsentAgreed || false
  );
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [formData, setFormData] = useState({});
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide Yas Chat on payment details (mobile) to avoid intercepting taps
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("page-payment-details");
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("page-payment-details");
      }
    };
  }, []);

  // Sync local state with Redux state when it changes
  useEffect(() => {
    setAcceptTerms(checkout.isTnCAgrred || false);
    setReceiveComms(checkout.isConsentAgreed || false);
  }, [checkout.isTnCAgrred, checkout.isConsentAgreed]);

  const validateData = (data) => {
    const errors = [];
    const nameOk = (s) => /^([\p{L}\s'-]+)$/u.test(String(s || "").trim());
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
    if (
      !data.firstName ||
      data.firstName.trim().length < 2 ||
      !nameOk(data.firstName)
    ) {
      errors.push(
        t("toastMessages.invalidFirstName") ||
          t("toastMessages.somethingWentWrong")
      );
    }
    if (
      !data.lastName ||
      data.lastName.trim().length < 1 ||
      !nameOk(data.lastName)
    ) {
      errors.push(
        t("toastMessages.invalidLastName") ||
          t("toastMessages.somethingWentWrong")
      );
    }
    const phoneDigits = String(data.phoneNumber || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) {
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

  const handleBasketCheck = (onSuccess = () => {}) => {
    const sanitize = (val) =>
      String(val == null ? "" : val)
        .replace(/[<>]/g, "")
        .replace(/[\u0000-\u001F\u007F]/g, "")
        .trim();

    const formatPhoneForApi = (val) => {
      const raw = String(val == null ? "" : val).trim();
      if (!raw) return "";
      if (raw.startsWith("+") || raw.startsWith("00")) {
        return raw.replace(/\s+/g, "");
      }
      const digits = raw.replace(/\D/g, "");
      return digits ? `+${digits}` : "";
    };

    // Create validation data structure similar to createOrderData
    const validationData = {
      coupons: [],
      items: checkout?.items?.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        performance: item.performances,
        validFrom: item.validFrom,
        validTo: item.validTo,
        productMasterid:
          productList.find((product) =>
            product.product_variants.some(
              (variant) => variant.productid === item?.productId
            )
          )?.product_masterid || "",
      })),
      emailId: sanitize(checkout?.emailId),
      language: currentLanguage,
      amount: checkout?.grossAmount,
      firstName: sanitize(checkout?.firstName),
      lastName: sanitize(checkout?.lastName),
      phoneNumber: formatPhoneForApi(checkout?.phoneNumber),
      countryCode: sanitize(checkout?.country),
      isTnCAgrred: checkout.isTnCAgrred,
      isConsentAgreed: checkout.isConsentAgreed,
      nationality: sanitize(checkout?.nationality),
    };

    // Validate data before proceeding with basket check
    const validationErrors = validateData(validationData);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error || t("toastMessages.somethingWentWrong"), {
          position: "top-center",
        });
      });
      // trigger red placeholders in the mobile inputs
      try {
        window.dispatchEvent(new CustomEvent("paymentForm:showFieldErrors"));
      } catch {}
      return;
    }

    const items = checkout?.items?.map((item) => ({
      productId: item?.productId,
      quantity: item?.quantity,
      performance:
        item?.performances && item?.performances.length > 0
          ? [{ performanceId: item?.performances[0].performanceId }]
          : [],
      validFrom: item?.validFrom,
      validTo: item?.validTo,
    }));

    const data = {
      coupons:
        checkout?.coupons && checkout?.coupons.length > 0
          ? [{ couponCode: checkout?.coupons[0].code }]
          : [],
      items: items,
      capacityManagement: true,
    };

    checkBasket(data, {
      onSuccess: (res) => {
        if (res?.orderDetails?.error?.code) {
          toast.error(t("toastMessages.somethingWentWrong"), {
            position: "top-center",
          });
        } else {
          const orderDetails = res?.orderdetails?.order;
          const updatedItems = orderDetails?.items?.map((item) => ({
            productId: item?.productId,
            quantity: item?.quantity,
            performances: item?.performances ? item?.performances : [],
            validFrom: item?.validFrom,
            validTo: item?.validTo,
            productMasterid:
              productList.find((product) =>
                product.product_variants.some(
                  (variant) => variant.productid === item?.productId
                )
              )?.product_masterid || "",
          }));

          const originalAmount =
            orderDetails?.items?.reduce((total, item) => {
              return total + (item?.original || 0);
            }, 0) || orderDetails?.total?.net;

          dispatch(
            setCheckout({
              coupons: orderDetails?.coupons,
              items: updatedItems,
              emailId: checkout?.emailId,
              language: currentLanguage,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
              // Store original netAmount: use calculated original amount if coupons are applied
              originalNetAmount:
                orderDetails?.coupons?.length > 0
                  ? originalAmount
                  : orderDetails?.total?.gross,
              firstName: checkout?.firstName,
              lastName: checkout?.lastName,
              phoneNumber: checkout?.phoneNumber,
              countryCode: checkout?.countryCode,
              isTnCAgrred: checkout?.isTnCAgrred,
              isConsentAgreed: checkout?.isConsentAgreed,
              promotions: orderDetails?.promotions,
            })
          );
          onSuccess();
        }
      },
      onError: (err) => {
        toast.error(t("toastMessages.checkoutFailed"), {
          position: "top-center",
        });
      },
    });
  };

  // Normalize ISO for react-phone-input-2 to avoid missing dial code mappings
  const normalizeIsoForDialCode = (iso) => {
    const m = {
      ax: "fi",
      gg: "gb",
      je: "gb",
      im: "gb",
      sj: "no",
      bq: "nl",
      gf: "fr",
      gp: "fr",
      mq: "fr",
      yt: "fr",
      re: "fr",
      pm: "fr",
      bl: "fr",
      mf: "fr",
      fo: "dk",
      gi: "gb",
    };
    return m[iso] || iso || "ae";
  };

  // Validate phone number based on country using libphonenumber-js
  const validatePhoneNumberByCountry = (phoneNumber, countryIso) => {
    if (!phoneNumber || !countryIso) return false;

    try {
      // Normalize country ISO code for libphonenumber-js (needs uppercase)
      const normalizedIso = normalizeIsoForDialCode(
        (countryIso || "ae").toLowerCase()
      ).toUpperCase();

      // react-phone-input-2 provides the phone number with country code as digits
      // e.g., "971501234567" for UAE number +971 50 123 4567
      // libphonenumber-js needs "+" prefix for proper parsing
      const phoneNumberStr = String(phoneNumber).trim();

      // Add "+" prefix if not present (react-phone-input-2 provides digits only)
      const formattedNumber = phoneNumberStr.startsWith("+")
        ? phoneNumberStr
        : `+${phoneNumberStr}`;

      // Try to parse and validate the phone number
      const parsedNumber = parsePhoneNumber(formattedNumber, normalizedIso);

      if (!parsedNumber) return false;

      // Validate the parsed number
      const isValid = parsedNumber.isValid();

      return isValid;
    } catch (error) {
      // If parsing fails, the number is invalid
      return false;
    }
  };

  // Validate fields for placeholders (matching desktop validation)
  const validateFieldsForPlaceholders = () => {
    const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
    return {
      firstName:
        !checkout.firstName ||
        checkout.firstName.trim().length < 2 ||
        !nameRegex.test(checkout.firstName),
      lastName:
        !checkout.lastName ||
        checkout.lastName.trim().length < 1 ||
        !nameRegex.test(checkout.lastName),
      email:
        !checkout.emailId ||
        !String(checkout.emailId).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      phoneNumber: !validatePhoneNumberByCountry(
        checkout.phoneNumber,
        checkout.country
      ),
      country: !checkout.country,
      nationality: !checkout.nationality,
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!checkout.isTnCAgrred) {
      toast.error(t("toastMessages.acceptTermsAndConditions"), {
        position: "top-center",
      });
      return;
    }

    // Validate fields and show toast messages (matching desktop behavior)
    const errs = validateFieldsForPlaceholders();
    if (
      errs.firstName ||
      errs.lastName ||
      errs.email ||
      errs.phoneNumber ||
      errs.country ||
      errs.nationality
    ) {
      // Show toast messages for validation errors
      if (errs.firstName) {
        toast.error(
          t("toastMessages.invalidFirstName") ||
            t("toastMessages.somethingWentWrong"),
          {
            position: "top-center",
          }
        );
      }
      if (errs.lastName) {
        toast.error(
          t("toastMessages.invalidLastName") ||
            t("toastMessages.somethingWentWrong"),
          {
            position: "top-center",
          }
        );
      }
      if (errs.email) {
        toast.error(t("toastMessages.invalidEmail"), {
          position: "top-center",
        });
      }
      if (errs.phoneNumber) {
        toast.error(t("toastMessages.invalidPhoneNumber"), {
          position: "top-center",
        });
      }
      if (errs.country) {
        toast.error(t("toastMessages.invalidCountry"), {
          position: "top-center",
        });
      }
      if (errs.nationality) {
        toast.error(t("toastMessages.invalidNationality"), {
          position: "top-center",
        });
      }
      // Trigger red placeholders in the mobile inputs
      try {
        window.dispatchEvent(new CustomEvent("paymentForm:showFieldErrors"));
      } catch {}
      // Prevent navigation if there are validation errors
      return;
    }

    const createOrderData = () => {
      const sanitize = (val) =>
        String(val == null ? "" : val)
          .replace(/[<>]/g, "")
          .replace(/[\u0000-\u001F\u007F]/g, "")
          .trim();

      const formatPhoneForApi = (val) => {
        const raw = String(val == null ? "" : val).trim();
        if (!raw) return "";
        if (raw.startsWith("+") || raw.startsWith("00")) {
          return raw.replace(/\s+/g, "");
        }
        const digits = raw.replace(/\D/g, "");
        return digits ? `+${digits}` : "";
      };

      const data = {
        coupons:
          checkout?.coupons && checkout?.coupons.length > 0
            ? checkout.coupons
                .map((c) => c?.couponCode || c?.code)
                .filter(Boolean)
                .map((code) => ({ couponCode: code }))
            : checkout?.promoCode
            ? [{ couponCode: checkout.promoCode }]
            : [],
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
        amount: checkout?.grossAmount,
        firstName: sanitize(checkout?.firstName),
        lastName: sanitize(checkout?.lastName),
        phoneNumber: formatPhoneForApi(checkout?.phoneNumber),
        countryCode: sanitize(checkout?.country),
        isTnCAgrred: checkout.isTnCAgrred,
        isConsentAgreed: checkout.isConsentAgreed,
        nationality: sanitize(checkout?.nationality),
      };

      createOrder(data, {
        onSuccess: (responseData) => {
          dispatch(setOrderData(responseData));
          // Set session flag and timestamp before navigation
          sessionStorage.setItem("paymentPageValid", "true");
          sessionStorage.setItem(
            "paymentNavigationTime",
            Date.now().toString()
          );
          navigate("/card-payment", { state: { isCheckout: true } });
        },
        onError: (error) => {
          toast.error(
            // error?.response?.data?.message ||
            t("toastMessages.somethingWentWrong"),
            {
              position: "top-center",
            }
          );
        },
      });
    };

    // First check basket, then create order
    handleBasketCheck(createOrderData);
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

  const handleTermsClick = async (e) => {
    e.preventDefault();

    try {
      // Get the first productId from checkout items, or use a default value
      const productId = checkout?.items?.[0]?.productMasterid || "69";
      const source = "web";

      const response = await getTermsAndCondition(
        `${currentLanguage}-AE`,
        productId,
        source
      );

      setTermsAndConditions(response);
      setIsTermsModalOpen(true);
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      toast.error(t("toastMessages.failedToLoadTermsAndConditions"), {
        position: "top-center",
      });
    }
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  return (
    <>
      {/* <MobileHeader /> */}
      <div className="email-checkout__overlay">
        <PaymentHeaderMbl step={2} />
        <div className="email-checkout__container">
          <div className="email-checkout__form-container">
            <form
              className="email-checkout__form"
              onSubmit={handleSubmit}
              noValidate
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <div className="email-checkout__steps-underline"></div>

              <InputFieldsMbl />
              <CheckOutSummaryMbl
                promoApplied={true}
                formData={formData}
                setFormData={setFormData}
                checkout={checkout}
                showPromoCode={true}
                setShowPromoPopup={setShowPromoPopup}
                isCheckout={isCheckout}
              />
              <CheckBoxMbl
                acceptTerms={acceptTerms}
                setAcceptTerms={setAcceptTerms}
                receiveComms={receiveComms}
                setReceiveComms={setReceiveComms}
                handleTermsChange={handleTermsChange}
                handleTermsClick={handleTermsClick}
              />

              <button
                className="email-checkout__btn"
                type="submit"
                style={{
                  backgroundColor: "var(--color-email-form-confirm-btn)",
                  color: "var(--color-email-form-confirm-btn-clr)",
                  opacity:
                    isPending || isCheckingBasket || !checkout.isTnCAgrred
                      ? 0.5
                      : 1,
                  cursor:
                    isPending || isCheckingBasket || !checkout.isTnCAgrred
                      ? "not-allowed"
                      : "pointer",
                }}
                disabled={
                  isPending || isCheckingBasket || !checkout.isTnCAgrred
                }
              >
                {isPending || isCheckingBasket ? (
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

        <TermsAndConditionsModal
          isOpen={isTermsModalOpen}
          onClose={handleCloseTermsModal}
          termsAndConditions={termsAndConditions}
        />
      </div>
    </>
  );
}

export default PaymentDetailsMobile;
