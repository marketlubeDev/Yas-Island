import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import PromoCodeModalContent from "./PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setCheckout,
  // updateTermsAcceptance,
} from "../../../global/checkoutSlice";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../../hooks/responsiveHook/useResponsive";
import { useUppercaseInput } from "../../../hooks/useUppercaseInput";

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
  const promoCodeInput = useUppercaseInput(
    checkout?.coupons?.[0]?.code || checkout?.promotions?.[0]?.code || ""
  );
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const [promoCodeStatus, setPromoCodeStatus] = useState(null); // null | 'valid' | 'invalid'
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const navigate = useNavigate();

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

  // const handleTermsChange = (type, checked) => {
  //   if (type === "terms") {
  //     dispatch(
  //       updateTermsAcceptance({
  //         isTnCAgrred: checked,
  //         isConsentAgreed: checkout.isConsentAgreed,
  //       })
  //     );
  //   } else if (type === "consent") {
  //     dispatch(
  //       updateTermsAcceptance({
  //         isTnCAgrred: checkout.isTnCAgrred,
  //         isConsentAgreed: checked,
  //       })
  //     );
  //   }
  // };

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
        } else {
          const orderDetails = res?.orderdetails?.order;
          const attemptingToApplyCoupon = Boolean(promoCode);
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
          setPromoCodeApplying(false);
          if (attemptingToApplyCoupon) {
            setIsModalVisible(true);
            // Clear the promo code input since it's now applied
            promoCodeInput.reset();
          } else if (message) {
            toast.error(message || t("toastMessages.invalidPromoCode"), {
              position: "top-center",
            });
          } else if (isRemoveOperation) {
            toast.success(t("orderSummary.promoCodeRemoved"), {
              position: "top-center",
            });
          }
        }
      },
      onError: (err) => {
        toast.error(t("toastMessages.somethingWentWrong"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
        // Set loading to false on error
      },
    });
  };

  const handleRemovePromoCode = () => {
    setPromoCodeApplying(true);
    promoCodeInput.reset();
    setPromoCodeStatus(null);
    handleBasketCheck("", "", true);
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
      const response = await validatePromocode(promoCodeInput.rawValue);
      let message = "";
      if (!response?.data?.coupondetails?.coupon) {
        setIsModalVisible(false);

        if (response?.data?.coupondetails?.error?.code === "TooManyRequests") {
          setPromoCodeStatus("invalid");
          message = t("toastMessages.tooManyRequests");
          handleBasketCheck("", message);
          return;
        }

        message = t("toastMessages.invalidPromoCode");

        setPromoCodeStatus("invalid");
        handleBasketCheck("", message);
      } else {
        setFormData({ ...formData, promoCode: promoCodeInput.rawValue });
        setPromoCodeStatus("valid");
        handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      }
    } catch (error) {
      setPromoCodeApplying(false);
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
                    <div className="item-price">
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
        {/* Cost Breakdown - Mobile Style */}
        <div className="email-checkout__summary-costBreakdown">
          {checkout?.promotions?.[0]?.discount && (
            <>
              <div className="email-checkout__summary-costBreakdown-subTotal">
                <span className="subTotal-Content">
                  {t("orderSummary.subTotal")}
                </span>
                <span className="subTotal-Value">
                  {t("common.aed")} {checkout?.originalNetAmount}
                </span>
              </div>

              <div
                className="email-checkout__summary-costBreakdown-promo"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span className="promo-Content">
                  {t("orderSummary.promoCodeSavings")}
                </span>
                <span
                  className="promo-Value"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {`- ${t("common.aed")}`}{" "}
                  {checkout?.promotions[0]?.discount?.replace("-", "")}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Promo Code Section - Mobile Style - Only show if no coupon is applied */}
        {showPromoCode && !checkout?.promotions?.[0]?.discount && (
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

        {/* Coupon Applied Indicator - Mobile Style */}
        {showPromoCode && checkout?.promotions?.[0]?.discount && (
          <div
            className="email-checkout__summary-couponApplied"
            onClick={handleRemovePromoCode}
            style={{ cursor: promoCodeApplying ? "not-allowed" : "pointer" }}
            disabled={promoCodeApplying}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                padding: "12px 16px",
                backgroundColor: "#fce1d3",
                border: "1px solid #ffbbaf",
                borderRadius: "8px",
                margin: "10px 0",
                opacity: promoCodeApplying ? 0.7 : 1,
              }}
            >
              <span
                style={{
                  color: "#ff7158",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {t("orderSummary.removePromoCode")}
              </span>

              {/* Loading/Remove indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "20px",
                }}
              >
                {promoCodeApplying && <ButtonLoading />}
              </div>
            </div>
          </div>
        )}

        {/* Total - Mobile Style */}
        <div className="email-checkout__summary-grandTotal">
          <span className="email-checkout__summary-grandTotal-Content">
            {t("orderSummary.total")}
          </span>
          <span className="email-checkout__summary-grandTotal-Value">
            {t("common.aed")} {(checkout?.grossAmount || 0).toFixed(2)}
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
