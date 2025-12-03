import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import visaIcon from "../../../assets/icons/payment.png";
import { useTranslation } from "react-i18next";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";
import { clearCart } from "../../../global/cartSlice";
import { useNavigate } from "react-router-dom";

// Add keyframe animation
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

function CardPaymentMobile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = useSelector((state) => state.order.orderData);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [countdown, setCountdown] = useState(5);

  const handlePaymentSuccess = useCallback(() => {
    setPaymentStatus("success");
    dispatch(clearCart()); // Clear the cart when payment is successful

    // Start countdown before redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.replace("/payment-success");
          return 0;
        }
        return prev - 1;
      });
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide Yas Chat fully on the card payment screen
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
        // Handle different payment statuses
        if (event.data) {
          // Handle payment redirect request
          if (event.data.type === "payment_redirect" && event.data.redirectUrl) {
            try {
              const redirectUrl = event.data.redirectUrl;

              // Check if it's an external URL (different origin)
              try {
                const parsed = new URL(redirectUrl);
                const currentOrigin = window.location.origin;

                if (parsed.origin !== currentOrigin) {
                  // External URL - do a full page redirect
                  window.location.href = redirectUrl;
                } else {
                  // Same origin - use React Router navigation with pathname only
                  navigate(parsed.pathname + parsed.search + parsed.hash);
                }
              } catch {
                // Not a valid absolute URL, treat as relative path
                const targetPath = redirectUrl.startsWith("/")
                  ? redirectUrl
                  : `/${redirectUrl}`;
                navigate(targetPath);
              }
            } catch (error) {
              console.error("Error handling payment redirect:", error);
            }
            return;
          }

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
    } else {
      navigate("/");
    }
  }, [orderData, paymentStatus, handlePaymentSuccess, navigate]);

  return (
    <>
      <style>{spinnerStyle}</style>
      <MobileHeader />
      <div className="payment-container" style={{ padding: "1.2rem" }}>
        <h2 className="payment-title">{t("payment.cardPayment.title")}</h2>

        <div className="payfort-container">
          <div
            className="iframe-container"
            style={{
              borderRadius: "1rem",
              minHeight: "450px",
              height: "350px",
              position: "relative",
            }}
          >
            {isIframeLoading && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <div
                  className="loading-spinner"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "3px solid #f3f3f3",
                    borderTop: "3px solid #3498db",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto 1rem",
                  }}
                />
                <p style={{ color: "#666", margin: 0 }}>
                  {t("payment.cardPayment.loadingSecurePaymentForm", {
                    defaultValue: "Loading secure payment form...",
                  })}
                </p>
              </div>
            )}
            <iframe
              name="payfort-iframe"
              title="PayFort Payment"
              width="100%"
              height="470"
              frameBorder="0"
              style={{
                border: "none",
                borderRadius: "8px",
                boxShadow: "none",
                background: "transparent",
                opacity: isIframeLoading ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
              onLoad={() => setTimeout(() => setIsIframeLoading(false), 1500)}
            />
          </div>

          <div
            className="card-ad"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <img
              src={visaIcon}
              alt="visa"
              className="card-logo"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPaymentMobile;
