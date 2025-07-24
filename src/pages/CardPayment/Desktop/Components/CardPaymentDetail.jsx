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
  
  @keyframes pulse {
    0% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.7;
    }
  }
`;

export default function CardPaymentDetail({ orderData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentSuccess = () => {
    console.log("Payment successful, starting redirect countdown...");
    setPaymentStatus("success");
    setIsProcessing(false);
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
    }, 1000);
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

      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);

      // Listen for messages from the iframe
      const handleMessage = (event) => {
        console.log("Received message from iframe:", event.data);
        if (event.data && event.data.action === "redirect") {
          handlePaymentSuccess();
        }
        // Check if payment processing has started
        if (event.data && event.data.action === "processing") {
          setIsProcessing(true);
        }
      };

      // Monitor iframe for navigation changes
      let lastUrl = null;
      const checkIframeNavigation = () => {
        const iframe = document.querySelector('iframe[name="payfort-iframe"]');
        if (iframe) {
          try {
            const currentUrl = iframe.contentWindow.location.href;
            if (lastUrl && currentUrl !== lastUrl) {
              // URL changed, payment might be processing
              console.log("Iframe navigation detected");
              setIsProcessing(true);
            }
            lastUrl = currentUrl;
          } catch {
            // Cross-origin, but we can still detect some changes
            if (lastUrl !== null) {
              // If we previously had access and now we don't, navigation occurred
              console.log("Cross-origin navigation detected");
              setIsProcessing(true);
            }
          }
        }
      };

      // Start monitoring after iframe loads
      const monitorInterval = setInterval(checkIframeNavigation, 500);

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

            // Check if the iframe is empty or blank (processing state)
            if (iframeContent.trim() === "" && !isIframeLoading) {
              setIsProcessing(true);
            }

            if (
              iframeContent.includes("Payment Successful") ||
              iframeContent.includes("Redirecting")
            ) {
              handlePaymentSuccess();
            }

            // Check for failure messages
            if (
              iframeContent.includes("Payment Failed") ||
              iframeContent.includes("Transaction Declined") ||
              iframeContent.includes("Error")
            ) {
              setIsProcessing(false);
              setPaymentStatus("failed");
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
        clearInterval(monitorInterval);
      };
    }
  }, [orderData, isIframeLoading]);

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
          {/* Success overlay */}
          {paymentStatus === "success" && (
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

          {/* Processing overlay - shows when payment is being processed */}
          {isProcessing && paymentStatus !== "success" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255, 255, 255, 0.98)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                borderRadius: "8px",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto 1.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      border: "3px solid #e0e0e0",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    className="loading-spinner"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      border: "3px solid transparent",
                      borderTop: "3px solid #3498db",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </div>
                <h3
                  style={{
                    margin: "0 0 0.5rem",
                    color: "#333",
                    fontWeight: "500",
                  }}
                >
                  Processing Payment
                </h3>
                <p
                  style={{
                    margin: "0 0 1rem",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  Please wait while we process your payment...
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3498db",
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3498db",
                      animation: "pulse 1.5s ease-in-out 0.3s infinite",
                    }}
                  />
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#3498db",
                      animation: "pulse 1.5s ease-in-out 0.6s infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Initial loading */}
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
            onLoad={() => setIsIframeLoading(false)}
          />
        </div>

        <div className="card-ad">
          <img src={visaIcon} alt="visa" className="card-logo" />
        </div>
      </div>
    </div>
  );
}
