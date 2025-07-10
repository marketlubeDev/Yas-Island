import React from "react";
import CheckoutSteps from "../../PaymentCheckout/Components/CheckoutSteps";
import PaymentCheckHeading from "../../PaymentCheckout/Components/PaymentCheckHeading";
import VerificationBox from "./VerificationBox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
     
export default function OtpConfirmationBody() {
  const { email } = useSelector((state) => state.otp);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/email-verification");
  };

  return (
    <div className="payment-checkout">
      <CheckoutSteps currentStep="email" />
      <PaymentCheckHeading onBackClick={handleBackClick} />

      <div className="payment-checkout__content payment-checkout__content--with-header">
        <div className="form-container">
          <div className="form-group">
            <label>Enter OTP</label>
            <div className="email-input-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
              />
              <button 
                onClick={() => navigate('/email-verification')}
                className="edit-email-btn"
                style={{ 
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px'
                }}
              >
                <FaEdit size={18} />
              </button>
            </div>
            <div className="input-underline"></div>
          </div>
          <VerificationBox email={email} />
        </div>
      </div>
    </div>
  );
}
