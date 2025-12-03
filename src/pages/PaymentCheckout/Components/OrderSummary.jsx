import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import PromoCodeModalContent from "./PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";
import { useSelector, useDispatch } from "react-redux";
import { setCheckout } from "../../../global/checkoutSlice";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../../hooks/responsiveHook/useResponsive";
import { useUppercaseInput } from "../../../hooks/useUppercaseInput";
import { HiOutlinePercentBadge } from "react-icons/hi2";

export default function OrderSummary({
  formData,
  setFormData,
  checkout,
  showPromoCode = true,
  isCheckout = false,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isBigTablets } = useResponsive();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Use uppercase input hook for promo code with display transformation
  const promoCodeInput = useUppercaseInput(checkout?.coupons?.[0]?.code || "");
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const [removingPromoCode, setRemovingPromoCode] = useState(false);
  const [promoCodeStatus, setPromoCodeStatus] = useState(null); // null | 'valid' | 'invalid'
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const navigate = useNavigate();
  console.log(isModalVisible, "dsjkhfjdhhdfhdsh");
  console.log(checkout, "checkrtrtrtrtout");
  // Ensure products are loaded for the current language
  useGetProductList();

  const productList = useSelector((state) => state.product.allProducts);
  const { mutate: checkBasket } = useCheckBasket();

  const getProduct = (item) => {
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

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formatDate = (dateString) => {
    // Use the appropriate locale based on current language
    const locale = currentLanguage === "ar" ? "ar-AE" : "en-US";

    const date = new Date(dateString).toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return date;
  };

  const roundToTwoDecimals = (value) => {
    const num = Number(value) || 0;
    return Math.round(num * 100) / 100;
  };

  useEffect(() => {
    if (!isCheckout) {
      navigate("/");
    }
  }, []);

  // Price breakdown values
  // Subtotal = sum of all item amounts (net + VAT) * quantity
  const subTotal = roundToTwoDecimals(
    checkout?.items?.reduce((total, item) => {
      const { productVariant } = getProduct(item.productId) || {};
      const net = Number(productVariant?.net_amount) || 0;
      const vat = Number(productVariant?.vat) || 0;
      const qty = Number(item?.quantity) || 0;
      return total + (net + vat) * qty;
    }, 0) ?? 0
  );
  const totalAmount = roundToTwoDecimals(checkout?.grossAmount ?? 0);
  const discountAmount =
    subTotal > totalAmount ? roundToTwoDecimals(subTotal - totalAmount) : 0;

  const handleBasketCheck = (
    promoCode = "",
    message = "",
    isRemoveOperation = false,
    couponToRemoveCode = null
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

    // Build coupons payload:
    // - When applying a coupon: send all existing coupons plus the new one
    // - When removing a specific coupon: send all remaining coupons except the one being removed
    let couponsPayload = [];

    if (isRemoveOperation && couponToRemoveCode) {
      const remainingCoupons =
        checkout?.coupons?.filter(
          (coupon) => coupon?.code && coupon.code !== couponToRemoveCode
        ) || [];

      couponsPayload = remainingCoupons.map((coupon) => ({
        couponCode: coupon.code,
      }));
    } else if (promoCode) {
      // Get all existing coupons
      const existingCoupons =
        checkout?.coupons
          ?.filter((coupon) => coupon?.code)
          .map((coupon) => coupon.code) || [];

      // Add the new coupon if it's not already in the list (case-insensitive check)
      const promoCodeUpper = promoCode.toUpperCase();
      const isDuplicate = existingCoupons.some(
        (code) => code.toUpperCase() === promoCodeUpper
      );

      if (!isDuplicate) {
        existingCoupons.push(promoCode);
      }

      // Map to the required format
      couponsPayload = existingCoupons.map((code) => ({
        couponCode: code,
      }));
    } else {
      // If no promoCode is provided and it's not a remove operation,
      // send all existing coupons
      couponsPayload =
        checkout?.coupons
          ?.filter((coupon) => coupon?.code)
          .map((coupon) => ({
            couponCode: coupon.code,
          })) || [];
    }

    const data = {
      coupons: couponsPayload,
      items: items,
      capacityManagement: true,
    };

    checkBasket(data, {
      onSuccess: (res) => {
        // if (res?.orderDetails?.error?.code) {
        //   toast.error(t("toastMessages.somethingWentWrong"), {
        //     position: "top-center",
        //   });
        // } else {
        const orderDetails = res?.orderdetails?.order;
        const attemptingToApplyCoupon = Boolean(promoCode);
        const items = orderDetails?.items?.map((item) => ({
          productId: item?.productId,
          quantity: item?.quantity,
          performances: item?.performances ? item?.performances : [],
          validFrom: item?.validFrom,
          validTo: item?.validTo,
          discount: item?.discount,
          itemPromotionList: item?.itemPromotionList
            ? item?.itemPromotionList
            : [],
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

        // If a coupon is being applied but totals did not change or discount is not present, do not apply it
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
          setIsModalVisible(false);
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
                : orderDetails?.total?.gross,
            firstName: checkout?.firstName,
            lastName: checkout?.lastName,
            phoneNumber: checkout?.phoneNumber,
            countryCode: checkout?.countryCode,
            isTnCAgrred: checkout?.isTnCAgrred,
            isConsentAgreed: checkout?.isConsentAgreed,
            promotions: orderDetails?.promotions,
          })
        );
        // Clear appropriate loading state
        if (isRemoveOperation) {
          setRemovingPromoCode(false);
          toast.success(t("orderSummary.promoCodeRemoved"), {
            position: "top-center",
          });
        } else {
          setPromoCodeApplying(false);

          if (attemptingToApplyCoupon) {
            // Only show success modal if the applied promo code
            // is actually present in the coupons list returned from API
            const isCouponInResponse = orderDetails?.coupons?.some(
              (coupon) =>
                coupon?.code &&
                promoCode &&
                coupon.code.toUpperCase() === promoCode.toUpperCase()
            );

            if (isCouponInResponse) {
              setIsModalVisible(true);
            }

            // Clear the promo code input since it's now applied / processed
            promoCodeInput.reset();
          } else if (message) {
            toast.error(message || t("toastMessages.invalidPromoCode"), {
              position: "top-center",
            });
          }
        }
        // }
      },
      onError: (err) => {
        toast.error(t("toastMessages.somethingWentWrong"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
        setRemovingPromoCode(false);
        // Set loading to false on error
      },
    });
  };

  const handleRemovePromoCode = (couponCodeToRemove) => {
    setRemovingPromoCode(true);
    promoCodeInput.reset();
    setPromoCodeStatus(null);
    handleBasketCheck("", "", true, couponCodeToRemove);
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCodeInput.rawValue) {
        setPromoCodeApplying(false);
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
        setPromoCodeStatus("invalid");
        return;
      }

      // Check if coupon is already applied
      const existingCouponCodes =
        checkout?.coupons
          ?.filter((coupon) => coupon?.code)
          .map((coupon) => coupon.code.toUpperCase()) || [];

      if (existingCouponCodes.includes(promoCodeInput.rawValue.toUpperCase())) {
        setPromoCodeApplying(false);
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
        setPromoCodeStatus("invalid");
        return;
      }

      const response = await validatePromocode(promoCodeInput.rawValue);
      let message = "";

      if (response?.data?.isValid) {
        setFormData({ ...formData, promoCode: promoCodeInput.rawValue });
        setPromoCodeStatus("valid");
        handleBasketCheck(promoCodeInput.rawValue);
      } else {
        message = t("toastMessages.invalidPromoCode");
        setPromoCodeStatus("invalid");
        handleBasketCheck("", message);
      }
    } catch (error) {
      let message = "";
      setPromoCodeApplying(false);
      if (error.status === 429) {
        setPromoCodeStatus("invalid");
        message = t("toastMessages.tooManyRequests");
        handleBasketCheck("", message);
        return;
      }
      toast.error(t("toastMessages.invalidPromoCode"), {
        position: "top-center",
      });
      setPromoCodeStatus("invalid");
    }
  };

  return (
    <div className="order-summary-new">
      {/* Header - Mobile Style */}
      <div className="email-checkout__summary-title">
        <h3>{t("orderSummary.title")}</h3>
        <span>
          {checkout?.items?.length || 1} {t("orderSummary.items")}
        </span>
      </div>
      {/* Scrollable content wrapper with fadeout effect */}
      <div className="order-summary-scrollable-wrapper">
        <div className="order-summary-scrollable ">
          {/* Items are always visible; removed toggle button */}
          {/* Item Details Section - Mobile Style */}
          <div className="items-container">
            {checkout?.items && checkout.items.length > 0 ? (
              checkout.items.map((item, index) => (
                <div key={index} className="order-item-minimal">
                  <div className="item-content">
                    <div className="item-main">
                      <h4 className="item-title">
                        {getProduct(item.productId)?.product?.product_title ||
                          "Product"}
                      </h4>
                      <div className="item-meta">
                        <span className="item-variant">
                          {getProduct(item.productId)?.productVariant
                            ?.productvariantname || "Variant"}
                        </span>
                        <span className="item-separator">•</span>
                        <span className="item-date">
                          {formatDate(item.validFrom)}
                        </span>
                        <span className="item-separator">•</span>
                        <span className="item-quantity">
                          {t("payment.orderSummary.qty")} {item.quantity || 0}
                        </span>
                      </div>
                    </div>
                    <div
                      className="item-price"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <span className="price-amount">
                        {t("common.aed")}{" "}
                        {(
                          (getProduct(item.productId)?.productVariant
                            ?.net_amount || 0) *
                            (item.quantity || 0) +
                          (getProduct(item.productId)?.productVariant?.vat ||
                            0) *
                            (item.quantity || 0)
                        ).toFixed(2)}
                      </span>
                      {item.discount < 0 && (
                        <span
                          className="item-discount"
                          style={{
                            marginTop: "4px",
                            fontSize: "12px",
                            color: "#28a745",
                            backgroundColor: "#e6f4ea",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontWeight: "500",
                          }}
                        >
                          {t("orderSummary.discount")}: {item.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="order-item-minimal">
                <div className="item-content">
                  <div className="item-main">
                    <h4 className="item-title">No items in cart</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* End of scrollable content */}
      </div>{" "}
      {/* End of scrollable wrapper */}
      {/* Sticky bottom section */}
      <div className="order-summary-sticky-bottom">
        {/* Promo Code Section - Mobile Style - Only show if no coupon is applied */}

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
                disabled={promoCodeApplying}
              />
              <button
                className="email-checkout__summary-promoCode-input-container-applyButton"
                type="button"
                onClick={handlePromoCode}
                disabled={promoCodeApplying}
                style={{
                  opacity: promoCodeApplying ? 0.5 : 1,
                  cursor: promoCodeApplying ? "not-allowed" : "pointer",
                }}
              >
                {promoCodeApplying ? (
                  <ButtonLoading />
                ) : (
                  t("orderSummary.apply")
                )}
              </button>
            </div>
          </div>
        )}

        {/* Coupon Applied Indicator - New Style */}
        {checkout?.promotions
          ?.filter((promotion) => promotion?.discount)
          .map((promotion, index) => {
            // Show the remove button only if this promotion code
            // also exists in checkout.coupons
            const hasMatchingCoupon = checkout?.coupons?.some(
              (coupon) =>
                coupon?.code &&
                promotion?.code &&
                coupon.code === promotion.code
            );

            return (
              <div
                key={promotion?.code || index}
                className="email-checkout__summary-couponApplied"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    padding: "6px",
                    backgroundColor: "var(--color-base-bg)",
                    border: "1px solid #e9ecef",
                    borderRadius: "6px",
                    margin: "10px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <HiOutlinePercentBadge
                        className="coupon-badge-icon"
                        style={{
                          fontSize: "calc(24px * var(--zoom-scale))",
                          width: "calc(24px * var(--zoom-scale))",
                          height: "calc(24px * var(--zoom-scale))",
                          fontWeight: "bold",
                        }}
                        strokeWidth={2}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {/* Checkmark Icon */}

                      <p
                        style={{
                          color: "var(--color-summary-title)",

                          fontSize: "calc(14px * var(--zoom-scale))",
                          fontWeight: "200",
                        }}
                      >
                        {t("orderSummary.couponApplied")}{" "}
                        <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                          {checkout?.coupons?.[index]?.code || promotion?.code}
                        </span>
                      </p>
                      <p
                        style={{
                          color: "#28a745",
                          fontSize: "calc(12px * var(--zoom-scale))",
                        }}
                      >
                        <span style={{ fontWeight: "200" }}>
                          {" "}
                          {t("orderSummary.couponSavings")}{" "}
                        </span>
                        <span style={{ fontWeight: "bold" }}>
                          {t("common.aed")}{" "}
                          {promotion?.discount?.toString().replace("-", "")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  {showPromoCode && hasMatchingCoupon && (
                    <button
                      onClick={() => handleRemovePromoCode(promotion?.code)}
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
            );
          })}

        {/* Price Breakdown - Mobile Style (one item per line) */}
        {/* Subtotal */}
        <div className="email-checkout__summary-grandTotalNew">
          <span className="email-checkout__summary-grandTotalNew-ContentNew">
            {t("orderSummary.subTotal")}
          </span>
          <span className="email-checkout__summary-grandTotalNew-ValueNew">
            {t("common.aed")} {subTotal.toFixed(2)}
          </span>
        </div>

        {/* Discount (only show when applicable) */}
        {discountAmount > 0 && (
          <div className="email-checkout__summary-grandTotalNew">
            <span className="email-checkout__summary-grandTotalNew-ContentNew">
              {t("orderSummary.discount")}
            </span>
            <span className="email-checkout__summary-grandTotalNew-ValueNew">
              -&nbsp;{t("common.aed")} {discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        {/* Grand Total */}
        <div className="email-checkout__summary-grandTotal">
          <span className="email-checkout__summary-grandTotal-Content">
            {t("orderSummary.total")}
          </span>
          <span className="email-checkout__summary-grandTotal-Value">
            {t("common.aed")} {checkout?.grossAmount.toFixed(2)}
          </span>
        </div>

        <Modal
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          centered
          className="promo-modal"
          destroyOnClose
          // width={isBigTablets ? "60%" : "40%"}
          style={{
            width: isBigTablets ? "60%" : "40%",
          }}
          closeIcon={
            <span className="custom-modal-close">
              <img src={closeIcon} alt="close" />
            </span>
          }
        >
          <PromoCodeModalContent checkout={checkout} />
        </Modal>
      </div>{" "}
      {/* End of sticky bottom section */}
    </div>
  );
}
