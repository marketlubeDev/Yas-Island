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
    console.log(location?.state?.fromEmailVerification, "location>>");
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

  return (
    <div className="payment-checkout-page">
      <Header />
      <OtpConfirmationBody />
    </div>
  );
}
