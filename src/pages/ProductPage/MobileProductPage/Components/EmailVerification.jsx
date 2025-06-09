import React, { useState } from "react";
import MobileHeader from "./MobileHeader"; // Adjust the import path as needed
import ConfirmEmail from "./ConfirmEmail";
import backIcon from "../../../../assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import PaymentHeader from "./paymentHeader";

function EmailVerification({ onClose, onConfirmEmail, onBack }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("vivek@dev.panashi.ae");
  const [step, setStep] = useState(1); // 1 = email, 2 = confirm email
  const [showEmailVerification, setShowEmailVerification] = useState(true);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEmailVerification(true);
    setShowConfirmEmail(true);
 
  };

  return (
    <>
      {/* <div className="page-bg">
        <div className="modal-bg">
          <div className="modal-content"> */}
            {/* {showEmailVerification && ( */}
              <div className="outer-modal-bg">
                <form
                  className="email-verification__form"
                  onSubmit={handleSubmit}
                >
                 <PaymentHeader />
                  <div className="email-verification-form-box">
                    <label className="email-verification-label">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      className="email-verification-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="email-verification-confirm-btn"
                      type="submit"
                    >
                      Confirm Email
                    </button>
                  </div>
                </form>
              </div>
            {/* )} */}
           
          {/* </div>
        </div>
      </div> */}
    </>
  );
}

export default EmailVerification;
