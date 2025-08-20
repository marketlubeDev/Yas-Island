import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQRCodeFromURL = () => {
  const location = useLocation();
  const [qrCode, setQrCode] = useState(null);
  const [hasQRCode, setHasQRCode] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const qrlocation = urlParams.get("qrlocation");

    // Support QR code in path: /product/{id}
    const productPathMatch = (location.pathname || "").match(
      /^\/product\/([^/?#]+)/i
    );
    const productIdFromPath = productPathMatch
      ? decodeURIComponent(productPathMatch[1])
      : null;

    if (qrlocation) {
      setQrCode(qrlocation);
      setHasQRCode(true);
      console.log("QR Code found in URL (query):", qrlocation);
    } else if (productIdFromPath) {
      setQrCode(productIdFromPath);
      setHasQRCode(true);
      console.log("QR Code found in URL (path):", productIdFromPath);
    } else {
      setQrCode(null);
      setHasQRCode(false);
    }
  }, [location.search, location.pathname]);

  return {
    qrCode,
    hasQRCode,
    isQRCodeInURL: hasQRCode,
  };
};

export default useQRCodeFromURL;
