import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../../assets/icons/back.svg";

function paymentHeader({ step, onBack }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="confirm-email__title">Guest details and payment</div>
      <button
        className="confirm-email__back-btn"
        onClick={onBack}
        type="button"
      >
        <img src={backIcon} alt="Back" style={{ width: 24, height: 24 }} />
      </button>
      <div className="confirm-email__steps">
        <div
          className={`confirm-email__step1${
            step === 1 ? " confirm-email__step--active" : ""
          }`}
        >
          Step 1<br />
          <span>Email verification</span>
        </div>
        <div
          className={`confirm-email__step2${
            step === 2 ? " confirm-email__step--active" : ""
          }`}
        >
          Step 2<br />
          <span>Checkout</span>
        </div>
      </div>
      <div className="confirm-email__steps-underline"></div>
    </>
  );
}

export default paymentHeader;
