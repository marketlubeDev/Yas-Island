import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../../global/cartSlice";
import { useSelector } from "react-redux";

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
  const [failureMessage, setFailureMessage] = useState("");
  const [retryCounter, setRetryCounter] = useState(0);
  const { theme, isDarkMode } = useSelector((state) => state.accessibility);

  console.log(theme, "theme");

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
    dispatch(clearCart());
    window.location.replace("/payment-success");
  };

  useEffect(() => {
    if (orderData?.tokenizationResponse) {
      // Remove any existing form before creating a new one
      const oldForm = document.getElementById("payfort-form");
      if (oldForm && document.body.contains(oldForm)) {
        document.body.removeChild(oldForm);
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = orderData.tokenizationResponse.actionUrl;
      form.target = "payfort-iframe";
      form.style.display = "none";
      form.id = "payfort-form";

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
        const data = event?.data;
        console.log("Received message from iframe:", data);

        if (!data) return;

        // Preferred explicit provider payload
        if (data.type === "payment_result") {
          if (data.success === true) {
            handlePaymentSuccess();
          } else {
            setFailureMessage(
              data.error || "Payment failed. Please try again."
            );
            setPaymentStatus("failed");
          }
          return;
        }

        // Fallback: derive from generic status strings
        const rawStatus = (
          data.status ||
          data.payment_status ||
          data.result ||
          ""
        ).toString();
        const status = rawStatus.toLowerCase();

        if (
          status === "success" ||
          status === "paid" ||
          status === "authorized" ||
          status === "captured"
        ) {
          handlePaymentSuccess();
          return;
        }

        if (
          status === "failed" ||
          status === "failure" ||
          status === "canceled" ||
          status === "cancelled" ||
          status === "declined"
        ) {
          setFailureMessage("Payment failed. Please try again.");
          setPaymentStatus("failed");
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);

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
  }, [orderData, paymentStatus, retryCounter]);

  const handleRetry = () => {
    setFailureMessage("");
    setPaymentStatus("loading");
    setIsIframeLoading(true);
    // Remove any lingering form before retry
    const existingForm = document.getElementById("payfort-form");
    if (existingForm && document.body.contains(existingForm)) {
      document.body.removeChild(existingForm);
    }
    setRetryCounter((prev) => prev + 1);
  };

  return (
    <div className="payment-container">
      <style>{spinnerStyle}</style>
      <h2 className="payment-title">{t("payment.cardPayment.title")}</h2>

      <div className="payfort-container">
        <div
          className={`iframe-container ${theme}`}
          style={{
            borderRadius: "1rem",
            minHeight: "450px",
            height: "350px",
            position: "relative",
          }}
        >
          {/* <Payfort /> */}
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
            key={retryCounter}
            onLoad={() => setTimeout(() => setIsIframeLoading(false), 1500)}
          />
        </div>

        {paymentStatus === "failed" && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              background: "#fff5f5",
              border: "1px solid #ffd6d6",
              color: "#c53030",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong style={{ display: "block", marginBottom: ".25rem" }}>
                {t("payment.cardPayment.errorTitle", {
                  defaultValue: "Payment was rejected",
                })}
              </strong>
              <span>
                {failureMessage ||
                  t("payment.cardPayment.errorMessage", {
                    defaultValue: "Please review your details and try again.",
                  })}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              style={{
                background: "#3182ce",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: ".6rem 1rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t("payment.cardPayment.retry", { defaultValue: "Retry" })}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
