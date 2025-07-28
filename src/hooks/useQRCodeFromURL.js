import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQRCodeFromURL = () => {
  const location = useLocation();
  const [qrCode, setQrCode] = useState(null);
  const [hasQRCode, setHasQRCode] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const qrlocation = urlParams.get("qrlocation");

    if (qrlocation) {
      setQrCode(qrlocation);
      setHasQRCode(true);
      console.log("QR Code found in URL:", qrlocation);
    } else {
      setQrCode(null);
      setHasQRCode(false);
    }
  }, [location.search]);

  return {
    qrCode,
    hasQRCode,
    isQRCodeInURL: hasQRCode,
  };
};

export default useQRCodeFromURL;
