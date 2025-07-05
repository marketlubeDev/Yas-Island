import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import VerificationBox from "../../OtpConfirmation/Components/VerificationBox";
import { useDispatch } from "react-redux";
import useVerification from "../../../apiHooks/email/verification";
import { setOtp } from "../../../global/otpSlice";
import Loading from "../../../components/Loading/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EmailConfirmation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("");
  const { mutate: verification, isPending } = useVerification();
  const navigate = useNavigate();
  const handleConfirmEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        toast.error("Please enter a valid email address");
        return;
      }
      verification(
        emailValue,
        {
          onSuccess: (res) => {
            dispatch(setOtp({ email: emailValue, OTP: res.hashedOTP }));
            navigate("/otp-confirmation");
          },
          onError: (error) => {
            console.log(error , "error>>");
            toast.error(error?.response?.data?.message || "Something went wrong");
          }
        }
      );
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
          {isPending ? <Loading /> : t("payment.emailConfirmation.confirmButton")}
      </button>
    </div>
  );
}


