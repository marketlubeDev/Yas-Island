import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addToCart, clearCart } from "../global/cartSlice";

const QRCodeDetector = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.allProducts);
  const { qrCode, hasQRCode } = useQRCodeFromURL();

  const {
    data: validationData,
    isLoading: isValidating,
    isError: validationError,
  } = useValidateQRcode(hasQRCode ? qrCode : null);

  const [qrVerified, setQrVerified] = useState(false);

  // Only call cart API when QR is verified and we have a QR code
  const cartQrCode = qrVerified && qrCode ? qrCode : null;

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: cartError,
  } = useRetriveCart(cartQrCode);

  useEffect(() => {
    if (isValidating) {
      // console.log("Validating QR code...");
    } else if (validationData) {
      // Only store the data portion, not the entire response with headers
      dispatch(setQRValidationData(validationData?.data || validationData));
      dispatch(setQRCodeStatus("valid"));

      if (qrCode) {

        setQrVerified(true);
      }
    } else if (validationError) {
      // console.log("QR Code validation failed:", validationError);
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
        try {
          const parsedCartData = JSON.parse(cartData?.data?.cartData);

          if (parsedCartData?.length > 0) {
            dispatch(clearCart());
            parsedCartData.forEach((item) => {
              const data = {
                ...item,
                performance: item?.performanceDetails?.performance,
                productId: item?.VariantProductId,
                quantity: item?.Quantity,
                validFrom: item?.SelectedDate,
                minQuantity: productList
                  ?.find((product) =>
                    product?.product_variants?.some(
                      (variant) => variant?.productid === item?.VariantProductId
                    )
                  )
                  ?.product_variants?.find(
                    (variant) => variant?.productid === item?.VariantProductId
                  )?.min_quantity,
                maxQuantity: productList
                  ?.find((product) =>
                    product?.product_variants?.some(
                      (variant) => variant?.productid === item?.VariantProductId
                    )
                  )
                  ?.product_variants?.find(
                    (variant) => variant?.productid === item?.VariantProductId
                  )?.max_quantity,
                incrementNumber: productList
                  ?.find((product) =>
                    product?.product_variants?.some(
                      (variant) => variant?.productid === item?.VariantProductId
                    )
                  )
                  ?.product_variants?.find(
                    (variant) => variant?.productid === item?.VariantProductId
                  )?.increment_number,
              };
              dispatch(addToCart(data));
            });
          }

          // Store only the parsed cart data, not the entire response
          dispatch(setCartData(parsedCartData));
        } catch (error) {
          console.error("Error parsing cart data:", error);
          dispatch(setCartError("Invalid cart data format"));
        }
      } else if (cartError) {
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
