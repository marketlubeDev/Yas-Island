import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQRCodeFromURL = () => {
  const location = useLocation();
  const [qrCode, setQrCode] = useState(null);
  const [hasQRCode, setHasQRCode] = useState(false);
  const [loglocation, setLoglocation] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const qrlocation = urlParams.get("qrlocation");

    const safePathname =
      location?.pathname ||
      (typeof window !== "undefined" ? window.location.pathname : "");

    // Support QR code in path: /product/{id}
    const productPathMatch = (safePathname || "").match(
      /^\/product\/([^/?#]+)/i
    );
    const productIdFromPath = productPathMatch
      ? decodeURIComponent(productPathMatch[1])
      : null;

    // Also accept plain root path: /{id} (but ignore known app routes)
    const reserved = new Set([
      "all",
      "email-verification",
      "otp-confirmation",
      "payment-details",
      "card-payment",
      "payment-success",
      "payment-response",
      "upcoming",
      "packages",
      "hotels",
      "dining",
      "live",
      "shopping",
      "order-details",
    ]);
    const rootPathMatch = (safePathname || "").match(/^\/([^/?#]+)/);
    const rootSegment = rootPathMatch
      ? decodeURIComponent(rootPathMatch[1])
      : null;
    const isRootIdCandidate =
      rootSegment && !reserved.has(rootSegment.toLowerCase());
    const idFromRoot = isRootIdCandidate ? rootSegment : null;

    if (qrlocation) {
      setQrCode(qrlocation);
      setLoglocation(true);
      // setHasQRCode(true);
    } else if (productIdFromPath) {
      setQrCode(productIdFromPath);
      setHasQRCode(true);
    } else if (idFromRoot) {
      setQrCode(idFromRoot);
      setHasQRCode(true);
    } else {
      setQrCode(null);
      setHasQRCode(false);
    }
  }, [location.search, location.pathname]);

  return {
    qrCode,
    hasQRCode,
    isQRCodeInURL: hasQRCode,
    loglocation,
  };
};

export default useQRCodeFromURL;
