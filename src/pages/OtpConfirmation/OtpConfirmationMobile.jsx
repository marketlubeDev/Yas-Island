import React, { useEffect } from "react";
import ConfirmEmailMbl from "./MobileComponents/ConfirmEmailMbl";
import MobileHeader from "../Home/MobileComponents/MobileHeader";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";

function OtpConfirmationMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  // Guard: if accessed directly or via browser back without proper state, redirect
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
  return (
    <>
      {/* <MobileHeader /> */}
      <ConfirmEmailMbl
      // onConfirm={handleConfirmOTP}
      />
    </>
  );
}

export default OtpConfirmationMobile;
