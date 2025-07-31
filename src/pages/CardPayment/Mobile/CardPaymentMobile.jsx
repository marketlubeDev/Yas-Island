import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import visaIcon from "../../../assets/images/visa3.png";
import { useTranslation } from "react-i18next";
import CheckOutSummaryMbl from "../../PaymentDetails/MobileComponents/CheckOutSummaryMbl";
import PaymentMethodMbl from "./Components/PaymentMethodMbl";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";
import { clearCart } from "../../../global/cartSlice";
import { setCheckoutEmail } from "../../../global/checkoutSlice";
import { setOtp } from "../../../global/otpSlice";
import useMobileEmailPersistence from "../../../hooks/useMobileEmailPersistence";
import PromoCodeMbl from "../../PaymentDetails/MobileComponents/PromoCodeMbl";

function CardPaymentMobile() {
  useTranslation();
  const [formData, setFormData] = useState({});
  const orderData = useSelector((state) => state.order.orderData);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [countdown] = useState(5);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const dispatch = useDispatch();
  // Get checkout data from Redux
  const checkout = useSelector((state) => state.checkout);
  // Get email from OTP slice as well
  const { email } = useSelector((state) => state.otp);

  // Use mobile email persistence hook
  const { email: persistedEmail } = useMobileEmailPersistence();

  const handlePaymentSuccess = useCallback(() => {
    console.log("Payment successful, starting redirect countdown...");
    dispatch(clearCart());
    setPaymentStatus("success");
    window.location.href = "/payment-success";
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Add debugging for Redux persistence rehydration
    console.log("Mobile Card Payment Component Mounted");
    console.log("Initial Redux State - OTP:", { email });
    console.log("Initial Redux State - Checkout:", {
      emailId: checkout.emailId,
    });

    // Add a small delay to check if data loads after rehydration
    setTimeout(() => {
      console.log("After 1s - OTP state:", { email });
      console.log("After 1s - Checkout state:", { emailId: checkout.emailId });

      // If still no email after 1 second, try manual restoration
      const currentEmail = email;
      const currentCheckoutEmail = checkout.emailId;

      if (!currentEmail && !currentCheckoutEmail) {
        // Try multiple storage sources for email recovery
        let foundEmail = null;

        try {
          // First try sessionStorage backup
          const sessionBackup = sessionStorage.getItem(
            "yasIsland_backup_email"
          );
          if (sessionBackup) {
            console.log("Found email in sessionStorage backup:", sessionBackup);
            foundEmail = sessionBackup;
          }
        } catch (e) {
          console.log("Cannot access sessionStorage:", e);
        }

        if (!foundEmail) {
          try {
            const persistedOtp = localStorage.getItem("persist:yasIslandOTP");
            const persistedCheckout = localStorage.getItem(
              "persist:yasIslandCheckout"
            );

            if (persistedOtp) {
              const otpData = JSON.parse(persistedOtp);
              if (otpData.email) {
                console.log(
                  "Manual restoration: Found email in OTP localStorage:",
                  otpData.email
                );
                dispatch(
                  setOtp({ email: otpData.email, OTP: otpData.OTP || "" })
                );
                dispatch(setCheckoutEmail(otpData.email));

                // Also store in sessionStorage as backup for mobile
                try {
                  sessionStorage.setItem(
                    "yasIsland_backup_email",
                    otpData.email
                  );
                  console.log("Stored email backup in sessionStorage");
                } catch (e) {
                  console.log(
                    "Failed to store email backup in sessionStorage:",
                    e
                  );
                }
              }
            } else if (persistedCheckout) {
              const checkoutData = JSON.parse(persistedCheckout);
              if (checkoutData.emailId) {
                console.log(
                  "Manual restoration: Found email in checkout localStorage:",
                  checkoutData.emailId
                );
                dispatch(setCheckoutEmail(checkoutData.emailId));
              }
            }
          } catch (e) {
            console.log("Error in manual restoration:", e);
          }
        } else {
          // If we found an email in sessionStorage, use it
          console.log("Using email from sessionStorage backup:", foundEmail);
          dispatch(setOtp({ email: foundEmail, OTP: "" }));
          dispatch(setCheckoutEmail(foundEmail));
        }
      }
    }, 1000);
  }, [email, checkout.emailId, dispatch]);

  // Ensure email is synchronized between OTP and checkout slices
  useEffect(() => {
    console.log("Email sync effect - email from OTP:", email);
    console.log("Email sync effect - email from checkout:", checkout.emailId);

    if (email && email !== checkout.emailId) {
      console.log("Syncing email from OTP to checkout:", email);
      dispatch(setCheckoutEmail(email));
    } else if (!email && !checkout.emailId) {
      console.log("No email found in either OTP or checkout slices");

      // First try sessionStorage backup
      try {
        const sessionBackup = sessionStorage.getItem("yasIsland_backup_email");
        if (sessionBackup) {
          console.log("Found email in sessionStorage backup:", sessionBackup);
          dispatch(setOtp({ email: sessionBackup, OTP: "" }));
          dispatch(setCheckoutEmail(sessionBackup));
          return;
        }
      } catch (e) {
        console.log("Cannot access sessionStorage:", e);
      }

      // Check localStorage directly for debugging and try manual restoration
      try {
        const persistedOtp = localStorage.getItem("persist:yasIslandOTP");
        const persistedCheckout = localStorage.getItem(
          "persist:yasIslandCheckout"
        );
        console.log("Direct localStorage check - OTP:", persistedOtp);
        console.log("Direct localStorage check - Checkout:", persistedCheckout);

        // Try to manually restore email from localStorage if Redux persistence failed
        if (persistedOtp) {
          const otpData = JSON.parse(persistedOtp);
          console.log("Parsed OTP data from localStorage:", otpData);
          if (otpData.email) {
            console.log(
              "Manually restoring email from localStorage:",
              otpData.email
            );
            dispatch(setOtp({ email: otpData.email, OTP: otpData.OTP || "" }));
            dispatch(setCheckoutEmail(otpData.email));
          }
        } else if (persistedCheckout) {
          const checkoutData = JSON.parse(persistedCheckout);
          console.log("Parsed Checkout data from localStorage:", checkoutData);
          if (checkoutData.emailId) {
            console.log(
              "Manually restoring email from checkout localStorage:",
              checkoutData.emailId
            );
            dispatch(setCheckoutEmail(checkoutData.emailId));
          }
        }
      } catch (e) {
        console.log("Error checking/restoring from localStorage:", e);
      }
    }
  }, [email, checkout.emailId, dispatch]);

  useEffect(() => {
    if (orderData?.tokenizationResponse) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = orderData.tokenizationResponse.actionUrl;
      form.target = "payfort-iframe";
      form.style.display = "none";

      Object.entries(
        orderData.tokenizationResponse.formParameters || {}
      ).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      // Keep the form in DOM to maintain iframe functionality
      // Form will only be removed on component unmount or payment completion

      // Listen for messages from the iframe
      const handleMessage = (event) => {
        console.log("Received message from iframe:", event.data);

        // Handle different payment statuses
        if (event.data) {
          if (
            event.data.action === "redirect" ||
            event.data.status === "success"
          ) {
            handlePaymentSuccess();
          } else if (
            event.data.status === "failed" ||
            event.data.status === "cancelled"
          ) {
            setPaymentStatus("failed");
            console.log("Payment failed or cancelled");
          }
        }
      };

      // Poll iframe content to detect success page
      const pollIframeContent = () => {
        const iframe = document.querySelector('iframe[name="payfort-iframe"]');
        if (iframe) {
          try {
            const iframeDoc =
              iframe.contentDocument || iframe.contentWindow.document;
            const iframeContent = iframeDoc.body
              ? iframeDoc.body.innerText
              : "";

            if (
              iframeContent.includes("Payment Successful") ||
              iframeContent.includes("Redirecting")
            ) {
              handlePaymentSuccess();
            }
          } catch {
            console.log(
              "Cannot access iframe content due to cross-origin restrictions"
            );
          }
        }
      };

      const pollInterval = setInterval(pollIframeContent, 1000);

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
        clearInterval(pollInterval);

        // Clean up form only on unmount or when payment is complete
        if (paymentStatus === "success" || paymentStatus === "failed") {
          const existingForm = document.querySelector(
            'form[target="payfort-iframe"]'
          );
          if (existingForm && document.body.contains(existingForm)) {
            document.body.removeChild(existingForm);
          }
        }
      };
    }
  }, [orderData, paymentStatus, handlePaymentSuccess]);

  return (
    <>
      {/* <PaymentHeader /> */}
      <MobileHeader />
      {/* Promo Code Popup */}
      {showPromoPopup && (
        <PromoCodeMbl onClose={() => setShowPromoPopup(false)} />
      )}
    </>
  );
}

export default CardPaymentMobile;
