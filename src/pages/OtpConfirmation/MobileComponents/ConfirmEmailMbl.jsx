import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PaymentHeaderMbl from "../../Home/MobileComponents/PaymentHeaderMbl";
import OtpSectionMbl from "./OtpSectionMbl";
import TimerMbl from "./TimerMbl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { validateOTP } from "../../../utils/OTPvalidate";
import { setCheckoutEmail } from "../../../global/checkoutSlice";
import { useNavigate } from "react-router-dom";
import useVerification from "../../../apiHooks/email/verification";
import { setOtp } from "../../../global/otpSlice";
import {
  setIsEmailVerification,
  setVerificationEmail,
} from "../../../global/cartSlice";

function ConfirmEmailMbl({ onBack }) {
  const { mutate: verification, isPending } = useVerification();
  const { t } = useTranslation();
  const { email } = useSelector((state) => state.otp);
  const { OTP } = useSelector((state) => state.otp);
  const [otp, setOtpInput] = useState(new Array(6).fill(""));
  const [isExpired, setIsExpired] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(120);

  const handleConfirmEmail = async () => {
    if (email === "") {
      toast.error(t("toastMessages.invalidEmail"), {
        position: "top-center",
      });
      navigate("/email-verification");
      return;
    }
    if (isExpired) {
      toast.error(t("toastMessages.otpExpired"), {
        position: "top-center",
      });
      return;
    }
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error(t("toastMessages.invalidOTP"), {
        position: "top-center",
      });
      return;
    }

    const isValid = await validateOTP(otpString, OTP);
    if (isValid) {
      dispatch(setCheckoutEmail(email));
      dispatch(setIsEmailVerification(true));
      dispatch(setVerificationEmail(email));

      navigate("/payment-details", { state: { isCheckout: true } });
    } else {
      toast.error(t("toastMessages.otpIncorrect"), {
        position: "top-center",
      });
    }
  };

  const handleResendOTP = () => {
    verification(email, {
      onSuccess: (res) => {
        dispatch(setOtp({ email: email, OTP: res.hashedOTP }));
        setTimer(120);
        setIsExpired(false);
        setOtpInput(new Array(6).fill(""));
        toast.success(t("toastMessages.otpResent"), {
          position: "top-center",
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            t("toastMessages.somethingWentWrong"),
          {
            position: "top-center",
          }
        );
      },
    });
  };

  return (
    <div className="confirm-email__overlay">
      <div className="confirm-email__modal">
        <PaymentHeaderMbl
          step={1}
          onBack={() => navigate("/email-verification")}
        />
        <div className="confirm-email__content">
          <div className="confirm-email__form-container">
            {/* <div className="confirm-email__label">
              {t("payment.emailConfirmation.emailLabel")}
            </div> */}
            {/* <div className="confirm-email__input-underline">{email}</div> */}
            <OtpSectionMbl
              otp={otp}
              setOtp={setOtpInput}
              isExpired={isExpired}
            />
            <div className="confirm-email__otp-info">
              {t("payment.verification.codeSent")}
              <span style={{ color: "var(--color-base-text)" }}> {email}</span>
              <br />
              <button
                onClick={() => navigate("/email-verification")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 0 0 0",
                  color: "#0066cc",
                  fontSize: "12px",
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                {t("payment.verification.editEmail")}
              </button>
              {/* <div className="confirm-email__otp-warning">
                {t("payment.verification.checkSpam")}
              </div> */}
            </div>
            <TimerMbl
              setIsExpired={setIsExpired}
              handleResendOTP={handleResendOTP}
              timer={timer}
              setTimer={setTimer}
            />
            <div style={{ textAlign: "center" }}>
              <button
                className={`confirm-email__confirm-btn ${
                  isExpired ? "disabled" : ""
                }`}
                type="submit"
                style={{ marginTop: 24 }}
                onClick={handleConfirmEmail}
                disabled={isExpired}
              >
                {t("payment.verification.confirmOtp")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmEmailMbl;
