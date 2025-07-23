import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import visaIcon from "../../../assets/images/visa3.png";
import { useTranslation } from "react-i18next";
import CheckOutSummaryMbl from "../../PaymentDetails/MobileComponents/CheckOutSummaryMbl";
import PaymentMethodMbl from "./Components/PaymentMethodMbl";
import MobileHeader from "../../Home/MobileComponents/MobileHeader";
import { clearCart } from "../../../global/cartSlice";

function CardPaymentMobile() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({});
  const orderData = useSelector((state) => state.order.orderData);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();
  // Get checkout data from Redux
  const checkout = useSelector((state) => state.checkout);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePaymentSuccess = () => {
    console.log("Payment successful, starting redirect countdown...");
    dispatch(clearCart());
    setPaymentStatus("success");
    window.location.href = "/payment-success";
  };

  console.log(orderData, "sdglasglatskgasqg");

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
          } catch (e) {
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
  }, [orderData]);

  return (
    <>
      {/* <PaymentHeader /> */}
      <MobileHeader />
      <div className="outer-modal-bg">
        <div className="make-payment-modal-container">
          <div className="make-payment-modal">
            <div className="make-payment__content">
              {/* Order Summary */}
              {/* <CheckOutSummaryMbl /> */}
              <CheckOutSummaryMbl
                promoApplied={false}
                formData={formData}
                setFormData={setFormData}
                checkout={checkout}
                showPromoCode={false}
              />
              <br />
              <br />

              {/* Payment Method */}
              {/* <PaymentMethodMbl /> */}

              <div>
                <div
                  className="iframe-container"
                  style={{
                    borderRadius: "1rem",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    minHeight: "450px",
                    height: "350px",
                  }}
                >
                  {/* {isIframeLoading && ( */}
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
              </div>

              {/* Card Logos */}
              <div className="make-payment__card-logos">
                <img
                  src={visaIcon}
                  alt="Visa"
                  style={{ width: 110, height: 35 }}
                />
              </div>

              {paymentStatus === "success" && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "white",
                    padding: "2rem",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    textAlign: "center",
                    zIndex: 1000,
                    width: "80%",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "1rem",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPaymentMobile;
