import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useQRCodeFromURL from "../hooks/useQRCodeFromURL";
import useValidateQRcode from "../apiHooks/QRcode/qrcode";
import {
  setQRValidationData,
  setQRCodeStatus,
  setCartData,
  setIsCartLoading,
  setCartError,
} from "../global/qrCodeSlice";
import useRetriveCart from "../apiHooks/QRcode/retriveCart";

const QRCodeDetector = () => {
  const dispatch = useDispatch();
  const { qrCode, hasQRCode } = useQRCodeFromURL();

  const {
    data: validationData,
    isLoading: isValidating,
    isError: validationError,
    refetch: refetchValidation,
  } = useValidateQRcode(hasQRCode ? qrCode : null);

  const [qrVerified, setQrVerified] = useState(false);

  // Only call cart API when QR is verified and we have a QR code
  const cartQrCode = qrVerified && qrCode ? qrCode : null;

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: cartError,
  } = useRetriveCart(cartQrCode);

  // Debug logging
  useEffect(() => {
    console.log("Debug - cartQrCode:", cartQrCode);
    console.log("Debug - qrCode:", qrCode);
    console.log("Debug - qrVerified:", qrVerified);
    console.log("Debug - validationData:", validationData);
  }, [cartQrCode, qrCode, qrVerified, validationData]);

  useEffect(() => {
    if (isValidating) {
      console.log("Validating QR code...");
    } else if (validationData) {
      console.log("QR Code validation successful:", validationData);
      dispatch(setQRValidationData(validationData));
      dispatch(setQRCodeStatus("valid"));

      if (qrCode) {
        console.log(
          "QR Code verified successfully. Now triggering cart API call..."
        );
        setQrVerified(true);
      }
    } else if (validationError) {
      console.log("QR Code validation failed:", validationError);
      dispatch(setQRCodeStatus("invalid"));
    }
  }, [
    validationData,
    validationError,
    isValidating,
    dispatch,
    qrCode,
    setQrVerified,
  ]);

  useEffect(() => {
    setQrVerified(false);
  }, [qrCode]);

  useEffect(() => {
    if (qrVerified && validationData) {
      dispatch(setIsCartLoading(isCartLoading));

      if (cartData) {
        console.log("Cart data retrieved successfully:", cartData);
        dispatch(setCartData(cartData));
      } else if (cartError) {
        console.log("Cart API failed:", cartError);
        dispatch(setCartError(cartError));
      }
    }
  }, [
    cartData,
    cartError,
    isCartLoading,
    dispatch,
    validationData,
    qrVerified,
  ]);

  return null;
};

export default QRCodeDetector;
