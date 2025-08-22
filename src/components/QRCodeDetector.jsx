import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useQRCodeFromURL from "../hooks/useQRCodeFromURL";
import {
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

  // Only call cart API when QR is verified and we have a QR code
  const cartQrCode = hasQRCode && qrCode ? qrCode : null;

  const {
    data: cartData,
    isLoading: isCartLoading,
    isError: cartError,
  } = useRetriveCart(cartQrCode);

  // Hide QR-related query params and clean product path from URL once detected
  useEffect(() => {
    if (!hasQRCode) return;
    try {
      const currentUrl = new URL(window.location.href);
      let didChange = false;

      // Remove only the 'qrlocation' param to avoid affecting other flows
      if (currentUrl.searchParams.has("qrlocation")) {
        currentUrl.searchParams.delete("qrlocation");
        didChange = true;
      }

      // If the path is /product/{id}, strip the 'product' segment and keep only '/{id}'
      const productMatch = currentUrl.pathname.match(/^\/product\/([^/?#]+)/i);
      if (productMatch) {
        const onlyIdPath = `/${productMatch[1]}`;
        const remainingSearch = currentUrl.searchParams.toString();
        const cleanedPath = `${onlyIdPath}${
          remainingSearch ? `?${remainingSearch}` : ""
        }${currentUrl.hash}`;
        window.history.replaceState({}, "", cleanedPath);
        didChange = false; // already replaced above with full path
      } else if (didChange) {
        const remainingSearch = currentUrl.searchParams.toString();
        const cleanedPath = `${currentUrl.pathname}${
          remainingSearch ? `?${remainingSearch}` : ""
        }${currentUrl.hash}`;
        window.history.replaceState({}, "", cleanedPath);
      }
    } catch (err) {
      // no-op: if URL parsing fails, skip silently
    }
  }, [hasQRCode]);

  useEffect(() => {
    if (!hasQRCode) return;
    dispatch(setIsCartLoading(isCartLoading));
    if (isCartLoading) {
      dispatch(setQRCodeStatus("validating"));
    } else if (cartData) {
      dispatch(setQRCodeStatus("valid"));
    } else if (cartError) {
      dispatch(setQRCodeStatus("invalid"));
    }
  }, [cartData, cartError, isCartLoading, dispatch, hasQRCode]);

  useEffect(() => {
    if (hasQRCode && cartData) {
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
  }, [cartData, cartError, isCartLoading, dispatch, productList, hasQRCode]);

  return null;
};

export default QRCodeDetector;
