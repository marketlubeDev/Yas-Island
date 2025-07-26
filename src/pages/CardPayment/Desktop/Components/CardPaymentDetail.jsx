import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../global/cartSlice";
import visaIcon from "../../../../assets/icons/payment.png";

// Add keyframe animation
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default function CardPaymentDetail({ orderData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  const handlePaymentSuccess = () => {
    console.log("Payment successful, starting redirect countdown...");
    setPaymentStatus("success");
    dispatch(clearCart()); // Clear the cart when payment is successful

    // Start countdown before redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          window.location.href = "/payment-success";
          return 0;
        }
        return prev - 1;
      });
    }, 500);
  };

  console.log(orderData?.tokenizationResponse, "askgdkjasgkdgsa");

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
  }, [orderData, paymentStatus]);

  return (
    <div className="payment-container">
      <style>{spinnerStyle}</style>
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
          {/* {paymentStatus === "success" && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                textAlign: "center",
                zIndex: 1000,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="25" fill="#28a745" />
                  <path
                    d="M20 25L23 28L30 21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 style={{ margin: "0 0 1rem", color: "#28a745" }}>
                Payment Successful!
              </h3>
              <p style={{ margin: "0 0 1rem", color: "#666" }}>
                Redirecting to order details in {countdown} seconds...
              </p>
              <div
                className="loading-spinner"
                style={{
                  width: "30px",
                  height: "30px",
                  border: "3px solid #f3f3f3",
                  borderTop: "3px solid #28a745",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto",
                }}
              />
            </div>
          )}
          {paymentStatus === "failed" && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                textAlign: "center",
                zIndex: 1000,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="25" fill="#dc3545" />
                  <path
                    d="M18 18L32 32M32 18L18 32"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h3 style={{ margin: "0 0 1rem", color: "#dc3545" }}>
                Payment Failed
              </h3>
              <p style={{ margin: "0 0 1rem", color: "#666" }}>
                Your payment could not be processed. Please try again.
              </p>
              <button
                onClick={() => {
                  setPaymentStatus("loading");
                  window.location.reload();
                }}
                style={{
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Try Again
              </button>
            </div>
          )} */}
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
                Loading secure payment form...
              </p>
            </div>
          )}
          <iframe
            name="payfort-iframe"
            title="PayFort Payment"
            width="100%"
            height="600"
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

        <div className="card-ad">
          <img src={visaIcon} alt="visa" className="card-logo" />
        </div>
      </div>
    </div>
  );
}
