import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setCheckout } from "../../../global/checkoutSlice";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";
import { useNavigate } from "react-router-dom";
import { useUppercaseInput } from "../../../hooks/useUppercaseInput";
import { HiOutlinePercentBadge } from "react-icons/hi2";

function CheckOutSummaryMbl({
  formData,
  setFormData,
  checkout,
  showPromoCode = true,
  setShowPromoPopup,
  isCheckout,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showItems, setShowItems] = useState(false);
  // Use uppercase input hook for promo code with display transformation
  const promoCodeInput = useUppercaseInput(checkout?.coupons?.[0]?.code || "");
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const [promoCodeStatus, setPromoCodeStatus] = useState(null); // null | 'valid' | 'invalid'
  const [removingPromoCode, setRemovingPromoCode] = useState(false);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const navigate = useNavigate();
  useGetProductList();

  const productList = useSelector((state) => state.product.allProducts);
  const { mutate: checkBasket } = useCheckBasket();

  useEffect(() => {
    if (!isCheckout) {
      navigate("/");
    }
  }, []);

  const getProduct = (item) => {
    if (!productList || !item) return { product: null, productVariant: null };

    const product = productList.find((product) =>
      product.product_variants.some((variant) => variant.productid === item)
    );

    const productVariant = product?.product_variants.find(
      (variant) => variant.productid === item
    );
    return {
      product,
      productVariant,
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const locale = currentLanguage === "ar" ? "ar-AE" : "en-US";
      return new Date(dateString).toLocaleDateString(locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const roundToTwoDecimals = (value) => {
    const num = Number(value) || 0;
    return Math.round(num * 100) / 100;
  };

  const handleBasketCheck = (
    promoCode = "",
    message = "",
    isRemoveOperation = false
  ) => {
    let items = [];
    checkout?.items?.forEach((item) => {
      items.push({
        productId: item?.productId,
        quantity: item?.quantity,
        performance: item?.performances ? item?.performances : [],
        validFrom: item?.validFrom,
        validTo: item?.validTo,
      });
    });
    const data = {
      coupons: promoCode ? [{ couponCode: promoCode }] : [],
      items: items,
      capacityManagement: true,
    };

    checkBasket(data, {
      onSuccess: (res) => {
        if (res?.orderDetails?.error?.code) {
          toast.error(t("toastMessages.somethingWentWrong"), {
            position: "top-center",
          });
          setPromoCodeApplying(false);
          setPromoCodeStatus("invalid");
        } else {
          const orderDetails = res?.orderdetails?.order;
          const attemptingToApplyCoupon = Boolean(promoCodeInput.rawValue);

          const items = orderDetails?.items?.map((item) => ({
            productId: item?.productId,
            quantity: item?.quantity,
            performances: item?.performances ? item?.performances : [],
            validFrom: item?.validFrom,
            validTo: item?.validTo,
            productMasterid:
              productList.find((product) =>
                product.product_variants.some(
                  (variant) => variant.productid === item?.productId
                )
              )?.product_masterid || "",
          }));
          // Calculate original amount (before discounts)
          const originalAmount =
            orderDetails?.items?.reduce((total, item) => {
              return total + (item?.original || 0);
            }, 0) || orderDetails?.total?.net;

          // Guard: if applying a coupon but totals didn't change or there is no discount, reject it
          const newGross = roundToTwoDecimals(orderDetails?.total?.gross);
          const newNet = roundToTwoDecimals(orderDetails?.total?.net);
          const prevGross = roundToTwoDecimals(checkout?.grossAmount);
          const prevNet = roundToTwoDecimals(checkout?.netAmount);
          const hasDiscount = Boolean(orderDetails?.promotions?.[0]?.discount);

          if (
            attemptingToApplyCoupon &&
            (!hasDiscount || (newGross === prevGross && newNet === prevNet))
          ) {
            setPromoCodeApplying(false);
            setPromoCodeStatus("invalid");
            toast.error(t("toastMessages.invalidPromoCode"), {
              position: "top-center",
            });
            return;
          }

          dispatch(
            setCheckout({
              coupons: orderDetails?.coupons,
              items: items,
              emailId: checkout?.emailId,
              language: currentLanguage,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
              // Store original netAmount: use calculated original amount if coupons are applied
              originalNetAmount:
                orderDetails?.coupons?.length > 0
                  ? originalAmount
                  : orderDetails?.total?.net,

              phoneNumber: checkout?.phoneNumber,
              countryCode: checkout?.countryCode,
              isTnCAgrred: checkout?.isTnCAgrred,
              isConsentAgreed: checkout?.isConsentAgreed,
              promotions: orderDetails?.promotions,
            })
          );

          if (promoCodeInput.rawValue) {
            toast.success(t("orderSummary.couponApplied"), {
              position: "top-center",
            });
            // Clear the promo code input since it's now applied
            promoCodeInput.reset();
            // Force component re-render to ensure totals update
          } else if (message) {
            toast.error(t("toastMessages.invalidPromoCode"), {
              position: "top-center",
            });
          } else if (isRemoveOperation) {
            toast.success(t("orderSummary.promoCodeRemoved"), {
              position: "top-center",
            });
            setRemovingPromoCode(false);
          }

          // Clear loading states after successful operation
          setPromoCodeApplying(false);
        }
      },

      onError: (err) => {
        toast.error(t("toastMessages.somethingWentWrong"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
        setRemovingPromoCode(false);
        setPromoCodeStatus("invalid");
      },
    });
  };

  const handleRemovePromoCode = async () => {
    setRemovingPromoCode(true);
    promoCodeInput.reset();
    setPromoCodeStatus(null);
    handleBasketCheck("", "", true);
    if (setShowPromoPopup) {
      setShowPromoPopup(false);
    }
    // The loading state will be cleared in the handleBasketCheck success/error callbacks
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCodeInput.rawValue) {
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
        setPromoCodeStatus("invalid");
        return;
      }
      const response = await validatePromocode(promoCodeInput.rawValue);

      // if (!response?.data?.coupondetails?.coupon) {
      //   let message = "";

      //   if (response?.data?.coupondetails?.error?.code === "TooManyRequests") {
      //     setPromoCodeStatus("invalid");
      //     message = t("toastMessages.tooManyRequests");
      //     handleBasketCheck("", message);
      //     return;
      //   }
      //   message = t("toastMessages.invalidPromoCode");
      //   setPromoCodeStatus("invalid");
      //   handleBasketCheck("", message);
      // } else {
      //   setFormData({ ...formData, promoCode: promoCodeInput.rawValue });
      //   setPromoCodeStatus("valid");
      //   handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      // }
      if (response?.data?.isValid) {
        setFormData({ ...formData, promoCode: promoCodeInput.rawValue });
        setPromoCodeStatus("valid");
        handleBasketCheck(promoCodeInput.rawValue);
      } else {
        let message = t("toastMessages.invalidPromoCode");
        setPromoCodeStatus("invalid");
        handleBasketCheck("", message);
      }
    } catch (error) {
      setPromoCodeApplying(false);
      setPromoCodeStatus("invalid");
      let message = "";
      if (error.status === 429) {
        setPromoCodeStatus("invalid");
        message = t("toastMessages.tooManyRequests");
        handleBasketCheck("", message);
        return;
      }
      toast.error(t("toastMessages.invalidPromoCode"), {
        position: "top-center",
      });
    }
  };

  // Calculate totals with fallbacks

  return (
    <div className="email-checkout__summary">
      {/* Header */}
      <div className="email-checkout__summary-title">
        <h3>{t("orderSummary.title")}</h3>
        <span>
          {checkout?.items?.length || 1} {t("orderSummary.items")}
        </span>
      </div>

      {/* Optimized Item Details Section - Two-line layout with inline styles for reliability */}
      {checkout?.items && checkout.items.length > 0 ? (
        checkout.items.map((item, index) => (
          <div
            key={index}
            className="order-item-compact"
            style={{
              border: "1px solid var(--color-base-product-card-divider)",
              borderRadius: "8px",
              marginBottom: "10px",
              padding: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <div
              className="item-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
                gap: "8px",
              }}
            >
              <span
                className="item-title"
                style={{
                  flex: "1",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--color-summary-title)",
                  margin: "0",
                  lineHeight: "1.3",
                  fontFamily: '"YAS Font", sans-serif',
                  minWidth: "0",
                  display: "block",
                }}
              >
                {getProduct(item.productId)?.product?.product_title ||
                  "Product"}
              </span>
              <span
                className="item-price"
                style={{
                  flexShrink: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--color-summary-title)",
                  fontFamily: '"YAS Font", sans-serif',
                  whiteSpace: "nowrap",
                }}
              >
                {t("common.aed")}{" "}
                {(
                  (getProduct(item.productId)?.productVariant?.net_amount ||
                    0) *
                    (item.quantity || 0) +
                  (getProduct(item.productId)?.productVariant?.vat || 0) *
                    (item.quantity || 0)
                ).toFixed(2)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: "4px",
                fontSize: "12px",
                color: "#666",
                lineHeight: "1.2",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  fontWeight: "500",
                  color: "var(--color-base-product-card-price)",
                }}
              >
                {getProduct(item.productId)?.productVariant
                  ?.productvariantname || "Adult"}
              </span>
              <span style={{ color: "#ccc", margin: "0 2px" }}>•</span>
              <span style={{ color: "#888" }}>
                {formatDate(item.validFrom)}
              </span>
              <span style={{ color: "#ccc", margin: "0 2px" }}>•</span>
              <span style={{ color: "#888", fontWeight: "500" }}>
                Qty: {item.quantity || 0}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div
          className="order-item-compact"
          style={{
            border: "1px solid var(--color-base-product-card-divider)",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "12px",
          }}
        >
          <div className="item-header">
            <h4 className="item-title">No items in cart</h4>
          </div>
        </div>
      )}

      {showPromoCode && (
        <div className="email-checkout__summary-promoCode">
          <div className="email-checkout__summary-promoCode-title">
            {t("orderSummary.promoDiscount")}
          </div>
          <div className="email-checkout__summary-promoCode-input-container">
            <input
              type="text"
              placeholder={t("orderSummary.enterPromoCode")}
              className={`email-checkout__summary-promoCode-input-container-inputBox ${
                promoCodeStatus === "valid"
                  ? "valid"
                  : promoCodeStatus === "invalid"
                  ? "invalid"
                  : ""
              }`}
              value={promoCodeInput.displayValue}
              onChange={(e) => {
                promoCodeInput.onChange(e);
                setPromoCodeStatus(null);
              }}
              onCompositionStart={promoCodeInput.onCompositionStart}
              onCompositionEnd={promoCodeInput.onCompositionEnd}
              onFocus={() => setPromoCodeStatus(null)}
            />
            <button
              className="email-checkout__summary-promoCode-input-container-applyButton"
              type="button"
              onClick={handlePromoCode}
              disabled={
                promoCodeApplying || checkout?.promotions?.[0]?.discount
              }
              style={{
                opacity: checkout?.promotions?.[0]?.discount ? 0.5 : 1,
                cursor: checkout?.promotions?.[0]?.discount
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {promoCodeApplying ? <ButtonLoading /> : t("orderSummary.apply")}
            </button>
          </div>
        </div>
      )}

      {/* Coupon Applied Indicator - New Style */}
      {checkout?.promotions?.[0]?.discount && (
        <div className="email-checkout__summary-couponApplied">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              padding: "12px 16px",
              backgroundColor: "var(--color-base-bg)",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              margin: "10px 0",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {/* Checkmark Icon */}
                <HiOutlinePercentBadge
                  className="coupon-badge-icon"
                  style={{
                    fontSize: "calc(24px * var(--zoom-scale))",
                    width: "calc(24px * var(--zoom-scale))",
                    height: "calc(24px * var(--zoom-scale))",
                    minWidth: "calc(24px * var(--zoom-scale))",
                    minHeight: "calc(24px * var(--zoom-scale))",
                  }}
                />
                <span
                  style={{
                    color: "var(--color-summary-title)",
                    fontWeight: "500",
                    fontSize: "calc(14px * var(--zoom-scale))",
                  }}
                >
                  {t("orderSummary.couponApplied")}{" "}
                  <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                    {checkout?.coupons?.[0]?.code ||
                      checkout?.promotions?.[0]?.code}
                  </span>
                </span>
              </div>
              <div style={{ marginLeft: "28px" }}>
                <span
                  style={{
                    color: "#28a745",
                    fontSize: "calc(12px * var(--zoom-scale))",
                    fontWeight: "400",
                  }}
                >
                  {t("orderSummary.couponSavings")}{" "}
                  {checkout?.promotions[0]?.discount?.replace("-", "")}
                </span>
              </div>
            </div>

            {/* Remove Button */}
            {showPromoCode && (
              <button
                onClick={!removingPromoCode ? handleRemovePromoCode : undefined}
                disabled={removingPromoCode}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-summary-title)",
                  fontWeight: "bold",
                  fontSize: "calc(14px * var(--zoom-scale))",
                  cursor: removingPromoCode ? "not-allowed" : "pointer",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  opacity: removingPromoCode ? 0.7 : 1,
                }}
              >
                {removingPromoCode ? (
                  <ButtonLoading />
                ) : (
                  t("orderSummary.remove")
                )}
              </button>
            )}
          </div>
        </div>
      )}
      {/* Total */}
      <div className="email-checkout__summary-grandTotal">
        <span className="grandTotal-Content">
          {t("payment.orderSummary.total")}
        </span>
        <span className="grandTotal-Value">
          {t("common.aed")} {(checkout?.grossAmount || 0).toFixed(2)}
        </span>
      </div>
      {/* Secure Payment Button */}
      {/* <div className="email-checkout__summary-securePayment">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        {t("orderSummary.securePayment")}
      </div> */}
    </div>
  );
}

export default CheckOutSummaryMbl;
