import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtp } from "../global/otpSlice";
import { setCheckoutEmail } from "../global/checkoutSlice";

/**
 * Custom hook for mobile email persistence
 * Uses multiple storage strategies to ensure email persists on mobile devices
 */
export const useMobileEmailPersistence = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.otp);
  const checkout = useSelector((state) => state.checkout);

  // Store email whenever it changes
  useEffect(() => {
    if (email) {
      console.log("useMobileEmailPersistence: Storing email:", email);

      // Store in multiple places for mobile reliability
      try {
        sessionStorage.setItem("yasIsland_backup_email", email);
        localStorage.setItem("yasIsland_mobile_email", email);
        console.log(
          "Stored email in both sessionStorage and localStorage backup"
        );
      } catch (e) {
        console.log("Failed to store email backup:", e);
      }
    }
  }, [email]);

  // Restore email on component mount
  useEffect(() => {
    if (!email && !checkout.emailId) {
      console.log("useMobileEmailPersistence: Attempting to restore email");

      // Try multiple storage sources in order of preference
      const sources = [
        () => sessionStorage.getItem("yasIsland_backup_email"),
        () => localStorage.getItem("yasIsland_mobile_email"),
        () => {
          const persistedOtp = localStorage.getItem("persist:yasIslandOTP");
          if (persistedOtp) {
            const data = JSON.parse(persistedOtp);
            return data.email;
          }
          return null;
        },
        () => {
          const persistedCheckout = localStorage.getItem(
            "persist:yasIslandCheckout"
          );
          if (persistedCheckout) {
            const data = JSON.parse(persistedCheckout);
            return data.emailId;
          }
          return null;
        },
      ];

      for (let i = 0; i < sources.length; i++) {
        try {
          const foundEmail = sources[i]();
          if (foundEmail) {
            console.log(
              `useMobileEmailPersistence: Found email from source ${i}:`,
              foundEmail
            );
            dispatch(setOtp({ email: foundEmail, OTP: "" }));
            dispatch(setCheckoutEmail(foundEmail));

            // Also store in all backup locations
            try {
              sessionStorage.setItem("yasIsland_backup_email", foundEmail);
              localStorage.setItem("yasIsland_mobile_email", foundEmail);
            } catch (e) {
              console.log("Failed to store restored email:", e);
            }

            break;
          }
        } catch (e) {
          console.log(`Error checking source ${i}:`, e);
          continue;
        }
      }
    }
  }, []); // Only run on mount

  return { email: email || checkout.emailId };
};

export default useMobileEmailPersistence;
