import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import useVerification from "../../../apiHooks/email/verification";
import { setOtp } from "../../../global/otpSlice";
import Loading from "../../../components/Loading/ButtonLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function EmailMbl() {
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
    verification(emailValue, {
      onSuccess: (res) => {
        dispatch(setOtp({ email: emailValue, OTP: res.hashedOTP }));

        // Store email in sessionStorage as backup for mobile
        try {
          sessionStorage.setItem("yasIsland_backup_email", emailValue);
        } catch (e) {
          console.log("Failed to store email backup in sessionStorage:", e);
        }

        navigate("/otp-confirmation");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <>
      <div className="email-verification__form">
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
          <button
            className="email-verification-confirm-btn"
            onClick={handleConfirmEmail}
            disabled={isPending}
          >
            {isPending ? (
              <Loading />
            ) : (
              t("payment.emailConfirmation.confirmButton")
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default EmailMbl;
