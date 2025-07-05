import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useVerification from "../../../apiHooks/email/verification";
import { setOtp } from "../../../global/otpSlice";
import Loading from "../../../components/Loading/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EmailMbl({ onEmailSubmit }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("");
  const { mutate: verification, isPending } = useVerification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
   try{
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Call the verification API
    verification(
      emailValue,
      {
        onSuccess: (res) => {
          dispatch(setOtp({ email: emailValue, OTP: res.hashedOTP }));
          navigate("/otp-confirmation");
        },
        onError: (error) => {
          console.log(error, "error>>");
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      }
    );
   }catch(error){
    console.log(error, "error>>");
    toast.error(error?.response?.data?.message || "Something went wrong");
   }
  };

  return (
    <>
      <form className="email-verification__form" onSubmit={handleSubmit}>
        <div className="email-verification-form-box">
          <label className="email-verification-label" id="email">
            {t("payment.emailConfirmation.emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            className="email-verification-input"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder={t("payment.emailConfirmation.emailPlaceholder")}
            required
            style={{ color: "var(--color-email-form-input-border)" }}
          />
          <button className="email-verification-confirm-btn" type="submit" disabled={isPending}>
            {isPending ? <Loading /> : t("payment.emailConfirmation.confirmButton")}
          </button>
        </div>
      </form>
    </>
  );
}

export default EmailMbl;
