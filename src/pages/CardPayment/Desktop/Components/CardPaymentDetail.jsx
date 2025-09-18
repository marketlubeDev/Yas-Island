import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearCart, setIsCartOpen } from "../../../../global/cartSlice";
import { useSelector } from "react-redux";
import { getConfig } from "../../../../../config/environment";

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
    dispatch(setIsCartOpen(false));
  }, [orderData]);

  // useEffect to handle theme changes on existing iframe
  useEffect(() => {
    const iframe = document.querySelector('iframe[name="payfort-iframe"]');

    if (!iframe) return;

    // Function to safely apply theme
    const applyTheme = () => {
      try {
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;

        if (!iframeDoc) {
          console.log(
            "Cannot access iframe document - likely cross-origin restriction"
          );
          return;
        }

        const html = iframeDoc.documentElement;
        const body = iframeDoc.body;

        if (html) {
          // Remove existing theme classes and attributes
          html.classList.remove("dark-theme", "light-theme");
          html.removeAttribute("data-theme");

          // Apply new theme
          if (isDarkMode) {
            html.classList.add("dark-theme");
            html.setAttribute("data-theme", "dark");
          } else {
            html.classList.add("light-theme");
            html.setAttribute("data-theme", "light");
          }
        }

        if (body) {
          // Also apply to body for extra compatibility
          body.classList.remove("dark-theme", "light-theme");
          body.removeAttribute("data-theme");

          if (isDarkMode) {
            body.classList.add("dark-theme");
            body.setAttribute("data-theme", "dark");
          } else {
            body.classList.add("light-theme");
            body.setAttribute("data-theme", "light");
          }
        }

        // Force a repaint
        if (body) {
          body.style.display = "none";
          body.offsetHeight; // Trigger reflow
          body.style.display = "";
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Try to apply theme immediately
    applyTheme();

    // Also try after delays in case iframe is still loading
    const timeoutId1 = setTimeout(applyTheme, 100);
    const timeoutId2 = setTimeout(applyTheme, 500);

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [isDarkMode]);

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

      console.log(orderData.tokenizationResponse, "formParameters");

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
      const handleMessage = async (event) => {
        const data = event?.data;

        // Strictly trust only messages from known, allowed origins
        const getBackendOrigin = async () => {
          try {
            const config = await getConfig();
            const origin = new URL(config?.baseURL).origin;
            return origin;
          } catch (_) {
            console.log("Error getting backend origin");
            return "";
          }
        };
        const backendOrigin = await getBackendOrigin();
        const allowedOrigins = new Set([backendOrigin].filter(Boolean));

        const eventOrigin = event?.origin || "";
        if (!allowedOrigins.has(eventOrigin)) {
          return;
        }

        if (!data) return;

        // Preferred explicit provider payload
        if (data.type === "payment_result") {
          if (data.success === true) {
            handlePaymentSuccess();
          } else {
            setFailureMessage(
              t("payment.cardPayment.errorMessage", {
                defaultValue:
                  "We couldn't complete your payment. Please review your details and try again.",
              })
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
          setFailureMessage(
            t("payment.cardPayment.errorMessage", {
              defaultValue:
                "We couldn't complete your payment. Please review your details and try again.",
            })
          );
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
      {/* <h2 className="payment-title">{t("payment.cardPayment.title")}</h2> */}

      <div className="payfort-container">
        <div
          className={`iframe-container ${theme}`}
          style={{
            borderRadius: "0rem",
            minHeight: "34rem",
            height: "34rem",
            position: "relative",
            overflow: "hidden",
            backgroundColor: isDarkMode
              ? "#1f1f1f !important"
              : "#ffffff !important",
            background: isDarkMode
              ? "#1f1f1f !important"
              : "#ffffff !important",
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
                  border: isDarkMode
                    ? "3px solid #404040"
                    : "3px solid #f3f3f3",
                  borderTop: "3px solid #3498db",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "0 auto 1rem",
                }}
              />
              <p style={{ color: isDarkMode ? "#b3b3b3" : "#666", margin: 0 }}>
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
            height="100%"
            data-theme="dark"
            frameBorder="0"
            key={retryCounter}
            onLoad={() => setIsIframeLoading(false)}
            style={{
              backgroundColor: isDarkMode
                ? "#1f1f1f !important"
                : "#ffffff !important",
              background: isDarkMode
                ? "#1f1f1f !important"
                : "#ffffff !important",
              opacity: isIframeLoading ? "0" : "1",
              transition: "opacity 0.2s ease-in-out",
            }}
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
                background: isDarkMode ? "black" : "white",
                zIndex: 2,
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 560,
                  borderRadius: 12,
                  background: isDarkMode ? "#1f1f1f" : "#fff",
                  border: isDarkMode
                    ? "1px solid #4a2c2c"
                    : "1px solid #ffd6d6",
                  boxShadow: isDarkMode
                    ? "0 10px 24px rgba(0,0,0,.3)"
                    : "0 10px 24px rgba(0,0,0,.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: isDarkMode ? "#2d1b1b" : "#fff5f5",
                    borderBottom: isDarkMode
                      ? "1px solid #4a2c2c"
                      : "1px solid #ffd6d6",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9999,
                      background: isDarkMode ? "#4a2c2c" : "#ffe3e3",
                      display: "grid",
                      placeItems: "center",
                      color: "#c53030",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    !
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: isDarkMode ? "#ffffff" : "#1a1a1a",
                    }}
                  >
                    {t("payment.cardPayment.errorTitle", {
                      defaultValue: "Payment was rejected",
                    })}
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 16px",
                    color: isDarkMode ? "#b3b3b3" : "#4a5568",
                  }}
                >
                  {failureMessage ||
                    t("payment.cardPayment.errorMessage", {
                      defaultValue:
                        "The order could not be completed. Please contact our support.",
                    })}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    justifyContent: "flex-end",
                    padding: "12px 16px",
                    background: isDarkMode ? "#262626" : "#fafafa",
                    borderTop: isDarkMode
                      ? "1px solid #404040"
                      : "1px solid #eee",
                  }}
                >
                  {typeof onBack === "function" && (
                    <button
                      type="button"
                      onClick={onBack}
                      style={{
                        background: isDarkMode ? "#404040" : "#fff",
                        color: isDarkMode ? "#ffffff" : "#1a1a1a",
                        border: isDarkMode
                          ? "1px solid #525252"
                          : "1px solid #ddd",
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
