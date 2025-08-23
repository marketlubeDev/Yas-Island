import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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

export default function CardPaymentDetail({ orderData, onBack }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [failureMessage, setFailureMessage] = useState("");
  const [retryCounter, setRetryCounter] = useState(0);
  const { theme, isDarkMode } = useSelector((state) => state.accessibility);
  const { currentLanguage } = useSelector((state) => state.language);

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
    dispatch(clearCart());
    navigate("/payment-success", { replace: true });
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

      const parameters = {
        ...orderData.tokenizationResponse.formParameters,
        language: currentLanguage,
      };

      Object.entries(parameters || {}).forEach(([key, value]) => {
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

  // Note: We intentionally do not show fallback controls by default
  // to avoid confusing users before any payment action occurs.

  const handleRetry = () => {
    toast.error(
      t("payment.cardPayment.errorToast", {
        defaultValue: "Payment processing failed. Please try again.",
      }),
      { position: "top-center" }
    );
    navigate("/");
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
            minHeight: "34rem",
            height: "34rem",
            position: "relative",
            overflow: "hidden",
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
            height="100%"
            frameBorder="0"
            style={{
              border: "none",
              borderRadius: "8px",
              boxShadow: "none",
              background: "transparent",
              opacity:
                paymentStatus === "failed" ? 0.15 : isIframeLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
            key={retryCounter}
            onLoad={() => setTimeout(() => setIsIframeLoading(false), 1500)}
          />

          {paymentStatus === "failed" && (
            <div
              role="alert"
              aria-live="assertive"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                background:
                  "linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.96))",
                zIndex: 2,
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 560,
                  borderRadius: 12,
                  background: "#fff",
                  border: "1px solid #ffd6d6",
                  boxShadow: "0 10px 24px rgba(0,0,0,.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: "#fff5f5",
                    borderBottom: "1px solid #ffd6d6",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      background: "#ffe3e3",
                      display: "grid",
                      placeItems: "center",
                      color: "#c53030",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    !
                  </div>
                  <div style={{ fontWeight: 700, color: "#1a1a1a" }}>
                    {t("payment.cardPayment.errorTitle", {
                      defaultValue: "Payment was rejected",
                    })}
                  </div>
                </div>
                <div style={{ padding: "14px 16px", color: "#4a5568" }}>
                  {failureMessage ||
                    t("payment.cardPayment.errorMessage", {
                      defaultValue:
                        "We couldn’t complete your payment. Please review your details and try again.",
                    })}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    justifyContent: "flex-end",
                    padding: "12px 16px",
                    background: "#fafafa",
                    borderTop: "1px solid #eee",
                  }}
                >
                  {typeof onBack === "function" && (
                    <button
                      type="button"
                      onClick={onBack}
                      style={{
                        background: "#fff",
                        color: "#1a1a1a",
                        border: "1px solid #ddd",
                        borderRadius: 8,
                        padding: ".55rem 1rem",
                        cursor: "pointer",
                      }}
                    >
                      {t("payment.cardPayment.backToDetails", {
                        defaultValue: "Back to details",
                      })}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleRetry}
                    style={{
                      background: "#3182ce",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: ".55rem 1rem",
                      cursor: "pointer",
                    }}
                  >
                    {t("payment.cardPayment.retry", { defaultValue: "Retry" })}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fallback controls removed to prevent showing by default. */}
      </div>
    </div>
  );
}
