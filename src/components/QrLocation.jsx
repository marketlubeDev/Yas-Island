import useQRCodeFromURL from "../hooks/useQRCodeFromURL";
import { useEffect } from "react";
import apiClient from "../../config/axiosInstance";
import { validateQRcodeEndpoint } from "../../config/endpoints";

const QrLocation = () => {
  const { qrCode, loglocation } = useQRCodeFromURL();

  useEffect(() => {
    if (!qrCode || !loglocation) return;

    const fetchValidation = async () => {
      try {
        const sessionQr = sessionStorage.getItem("yasIsland_qrCode");
        if (sessionQr === qrCode) return;

        const res = await apiClient.get(
          `${validateQRcodeEndpoint}?qrlocation=${qrCode}`
        );
        if (res.status === 200) {
          try {
            sessionStorage.setItem("yasIsland_qrValidated", "true");
            sessionStorage.setItem("yasIsland_qrCode", qrCode);
            sessionStorage.setItem(
              "yasIsland_qrValidation",
              JSON.stringify(res.data)
            );
          } catch (e) {
            console.error("Failed to persist QR session:", e);
          }
        }
      } catch (err) {
        console.error("QR validation failed", err);
      }
    };

    fetchValidation();
  }, [qrCode, loglocation]);

  return null;
};

export default QrLocation;
