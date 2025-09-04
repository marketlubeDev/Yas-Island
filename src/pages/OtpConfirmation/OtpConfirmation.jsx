import React, { useEffect } from "react";
import OtpConfirmationBody from "./Components/OtpConfirmationBody";
import Header from "../../layouts/Header/Header";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

export default function OtpConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  // Guard: if user lands here via direct URL or browser back without proper state, redirect
  useEffect(() => {
    const cameFromEmail = location?.state?.fromEmailVerification === true;
    if (!cameFromEmail) {
      navigate("/email-verification", { replace: true });
    }
  }, [location, navigate]);

  // Redirect when arriving via browser back/forward (POP) or direct load
  useEffect(() => {
    if (navigationType === "POP") {
      navigate("/email-verification", { replace: true });
    }
  }, [navigationType, navigate]);

  // Hide Yas Chat on OTP confirmation to prevent accidental launches
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("page-payment-checkout");
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.classList.remove("page-payment-checkout");
      }
    };
  }, []);

  return (
    <div className="payment-checkout-page">
      <Header />
      <OtpConfirmationBody />
    </div>
  );
}
