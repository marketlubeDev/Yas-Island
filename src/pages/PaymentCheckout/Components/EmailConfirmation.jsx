import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import VerificationBox from "./VerificationBox";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../../../global/checkoutSlice";
import useVerification from "../../../apiHooks/email/verificatoin";
import { setOtp } from "../../../global/OtpSlice";
import Loading from "../../../components/Loading/Loading";
import { validateOTP } from "../../../utils/OTPvalidate";

export default function EmailConfirmation({
  onVerificationComplete,
  showVerification,
  setShowVerification,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("");
  const { mutate: verification, isPending } = useVerification();
  const { email, OTP } = useSelector((state) => state.otp);



  
  const handleConfirmEmail = async () => {

    if(!showVerification){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email address");
        return;
      }
      verification(
        emailValue,
        {
          onSuccess: (res) => {
            console.log(res , "res>>");
            dispatch(setOtp({ email: emailValue, OTP: res.hashedOTP }));
            console.log(res);
            setShowVerification(true);
          },
          onError: (error) => {
            console.log(error , "error>>");
          }
        }
      );
    }else{
      const isValid = await validateOTP(502873, OTP); 
      if (isValid) {
        console.log("OTP is correct ✅");
      } else {
        console.log("OTP is incorrect ❌");
      }
      // onVerificationComplete();
    }
    // if (!showVerification) {
    //   // First click - show verification box
    //   // setShowVerification(true);
    // } else {
    //   // Second click - complete verification and show payment details
    //   onVerificationComplete();
    // }
    
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label>{t("payment.emailConfirmation.emailLabel")}</label>
        <input
          type="email"
          placeholder={t("payment.emailConfirmation.emailPlaceholder")}
          className="form-control"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <div className="input-underline"></div>
      </div>

      <button className="confirm-button" onClick={handleConfirmEmail}>  
        {isPending ? <Loading /> : showVerification               
          ? t("payment.emailConfirmation.completeVerification")
          : t("payment.emailConfirmation.confirmButton")}
      </button>
    </div>
  );
}


