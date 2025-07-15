import React, { useState, useEffect } from "react";
import cardIcon from "../../../../assets/icons/card.png";
import paypalIcon from "../../../../assets/icons/paypal.png";
import visaIcon from "../../../../assets/icons/payment.png";
import { payfortService } from "../../../../serivces/payfort/payfort";

// Keep your existing CSS variables and integrate with iframe styling
const enhancedStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  /* Enhanced iframe container that works with your existing styles */
  .payfort-iframe-container {
    width: 100%;
    min-height: 600px;
    background: var(--color-email-form-box, white);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--color-otp-input-border, #e0e0e0);
  }
  
  .payfort-header {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .payfort-header-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .security-indicators {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    opacity: 0.9;
  }
  
  .security-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.3rem 0.7rem;
    border-radius: 15px;
    font-size: 0.75rem;
  }
  
  .payment-icons-row {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 2rem;
    background: var(--color-base-accessibility-modal-btn-bg, #f8f9fa);
    border-bottom: 1px solid var(--color-otp-input-border, #e0e0e0);
  }
  
  .payment-icon-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border-radius: 6px;
    border: 1px solid var(--color-otp-input-border, #e0e0e0);
    font-size: 0.8rem;
    color: var(--color-base-text, #333);
  }
  
  .iframe-wrapper {
    position: relative;
    background: white;
    min-height: 450px;
  }
  
  .iframe-loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  
  .loading-content {
    text-align: center;
    color: var(--color-base-text, #333);
  }
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--color-otp-input-border, #f3f3f3);
    border-top: 4px solid #28a745;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }
  
  .loading-steps {
    margin-top: 1rem;
    font-size: 0.85rem;
    color: #877f91;
    max-width: 300px;
  }
  
  .loading-step {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
  
  .loading-step.active {
    opacity: 1;
    color: #28a745;
  }
  
  .step-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #28a745;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
  }
  
  /* Progress bar */
  .payment-progress {
    height: 3px;
    background: var(--color-otp-input-border, #e9ecef);
    position: relative;
    overflow: hidden;
  }
  
  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #20c997);
    width: 0%;
    transition: width 0.5s ease;
    position: relative;
  }
  
  .progress-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  /* Success modal using your existing color scheme */
  .success-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--color-email-form-box, white);
    padding: 3rem 2rem;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-otp-input-border, #e0e0e0);
    text-align: center;
    z-index: 1000;
    min-width: 320px;
    animation: fadeIn 0.5s ease-out;
  }
  
  .success-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #28a745, #20c997);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    animation: fadeIn 0.6s ease-out 0.2s both;
  }
  
  .success-title {
    margin: 0 0 1rem;
    color: #28a745;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .success-description {
    margin: 0 0 1.5rem;
    color: var(--color-base-text, #666);
    line-height: 1.5;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .payfort-iframe-container {
      margin-top: 1.5rem;
      border-radius: 6px;
    }
    
    .payfort-header {
      padding: 1rem 1.5rem;
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .payfort-header-title {
      font-size: 1rem;
    }
    
    .payment-icons-row {
      padding: 0.8rem 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .payment-icon-item {
      font-size: 0.75rem;
      padding: 0.4rem 0.8rem;
    }
    
    .iframe-wrapper {
      min-height: 400px;
    }
    
    .success-modal {
      margin: 1rem;
      padding: 2rem 1.5rem;
    }
  }
`;

export default function CardPaymentDetail({
  orderData,
  amount = 100,
  currency = "AED",
  customerEmail,
}) {
  const [paymentStatus, setPaymentStatus] = useState("initializing");
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [tokenizationData, setTokenizationData] = useState(null);
  const [error, setError] = useState(null);

  const loadingSteps = [
    "Connecting to secure payment gateway...",
    "Verifying SSL certificate...",
    "Loading payment form...",
    "Ready for payment",
  ];

  const handlePaymentSuccess = () => {
    console.log("Payment successful, starting redirect countdown...");
    setPaymentStatus("success");
    setLoadingProgress(100);

    // Start countdown
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

  useEffect(() => {
    // Simulate loading progress
    if (isIframeLoading) {
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 80) {
            clearInterval(progressInterval);
            return 80;
          }
          return prev + Math.random() * 10;
        });
      }, 300);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= loadingSteps.length - 1) {
            clearInterval(stepInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 800);

      return () => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
      };
    }
  }, [isIframeLoading]);

  // Initialize PayFort payment
  useEffect(() => {
    const initializePayment = async () => {
      try {
        setPaymentStatus("loading");
        setError(null);

        // Create payment token using PayFort service
        const paymentData = {
          amount,
          currency,
          ...(customerEmail && { customer_email: customerEmail }),
        };

        console.log("Initializing payment with temp-server:", paymentData);
        const tokenData = await payfortService.createPaymentToken(paymentData);

        setTokenizationData(tokenData);
        setPaymentStatus("ready");
      } catch (err) {
        console.error("Failed to initialize payment:", err);
        setError(err.message);
        setPaymentStatus("error");
      }
    };

    // FORCE using temp-server instead of orderData
    // Comment this line to always use temp-server: if (!orderData?.tokenizationResponse) {
    initializePayment();
    // }
  }, [amount, currency, customerEmail, orderData]);

  useEffect(() => {
    // Use ONLY temp-server tokenization data, ignore orderData
    const activeTokenData = tokenizationData; // || orderData?.tokenizationResponse;

    if (activeTokenData) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = activeTokenData.actionUrl;
      form.target = "payfort-iframe";
      form.style.display = "none";

      Object.entries(activeTokenData.formParameters || {}).forEach(
        ([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
      );

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
      };
    }
  }, [orderData, tokenizationData]);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
    setLoadingProgress(100);
    setCurrentStep(loadingSteps.length - 1);
  };

  return (
    <div className="payment-container">
      <style>{enhancedStyles}</style>

      <h2 className="payment-title">Complete Your Payment</h2>

      {error && (
        <div
          style={{
            background: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "6px",
            padding: "1rem",
            marginBottom: "1rem",
            color: "#856404",
          }}
        >
          <strong>Payment Error:</strong> {error}
          <button
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      <div className="payfort-iframe-container">
        {/* Enhanced Header */}
        <div className="payfort-header">
          <h3 className="payfort-header-title">🔒 Secure Payment</h3>
          <div className="security-indicators">
            <div className="security-badge">SSL Encrypted</div>
            <div className="security-badge">PCI Compliant</div>
          </div>
        </div>

        {/* Payment Icons Row */}
        <div className="payment-icons-row">
          <div className="payment-icon-item">
            <img
              src={visaIcon}
              alt="Visa"
              style={{ width: "20px", height: "20px" }}
            />
            <span>Visa</span>
          </div>
          <div className="payment-icon-item">
            <img
              src={cardIcon}
              alt="Mastercard"
              style={{ width: "20px", height: "20px" }}
            />
            <span>Mastercard</span>
          </div>
          <div className="payment-icon-item">
            <img
              src={paypalIcon}
              alt="PayPal"
              style={{ width: "20px", height: "20px" }}
            />
            <span>PayPal</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="payment-progress">
          <div
            className="progress-bar"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Iframe Wrapper */}
        <div className="iframe-wrapper">
          {/* Loading Overlay */}
          {isIframeLoading && (
            <div className="iframe-loading-overlay">
              <div className="loading-content">
                <div className="loading-spinner" />
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.2rem" }}>
                  Setting Up Secure Payment
                </h3>
                <p style={{ margin: "0 0 1rem", color: "#877f91" }}>
                  Please wait while we prepare your payment form
                </p>

                <div className="loading-steps">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`loading-step ${
                        index <= currentStep ? "active" : ""
                      }`}
                    >
                      <div className="step-icon">
                        {index <= currentStep ? "✓" : index + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PayFort Iframe - THIS is what you CANNOT style internally */}
          <iframe
            name="payfort-iframe"
            title="PayFort Payment"
            width="100%"
            height="450"
            frameBorder="0"
            style={{
              border: "none",
              background: "white",
              opacity: isIframeLoading ? 0 : 1,
              transition: "opacity 0.5s ease",
              display: "block",
            }}
            onLoad={handleIframeLoad}
            sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation"
          />
        </div>
      </div>

      {/* Success Modal */}
      {paymentStatus === "success" && (
        <div className="success-modal">
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M15 20L18 23L25 16"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="success-title">Payment Successful!</h3>
          <p className="success-description">
            Your payment has been processed successfully.
            <br />
            Redirecting to order details in {countdown} seconds...
          </p>
          <div
            className="loading-spinner"
            style={{
              width: "30px",
              height: "30px",
              border: "3px solid var(--color-otp-input-border, #f3f3f3)",
              borderTop: "3px solid #28a745",
            }}
          />
        </div>
      )}
    </div>
  );
}
