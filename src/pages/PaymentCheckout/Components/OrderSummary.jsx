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

export default function OrderSummary({
  formData,
  setFormData,
  checkout,
  showPromoCode = true,
  isCheckout = false,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState(
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
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
          toast.error(
            res?.orderDetails?.error?.text ||
              t("toastMessages.somethingWentWrong"),
            {
              position: "top-center",
            }
          );
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
          if (promoCode) {
            setIsModalVisible(true);
            // Clear the promo code input since it's now applied
            setPromoCode("");
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
        toast.error(
          err?.response?.data?.message || t("toastMessages.somethingWentWrong"),
          {
            position: "top-center",
          }
        );
        setPromoCodeApplying(false);
        // Set loading to false on error
      },
    });
  };

  const handleRemovePromoCode = () => {
    setPromoCodeApplying(true);
    setPromoCode("");
    setPromoCodeStatus(null);
    handleBasketCheck("", "", true);
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCode) {
        setPromoCodeApplying(false);
        toast.error(t("toastMessages.invalidPromoCode"), {
          position: "top-center",
        });
        setPromoCodeStatus("invalid");
        return;
      }
      const response = await validatePromocode(promoCode);
      if (!response?.data?.coupondetails?.coupon) {
        setIsModalVisible(false);
        // toast.error(response?.coupondetails?.error?.text || "Invalid promo code");
        let message =
          response?.coupondetails?.error?.text ||
          t("toastMessages.invalidPromoCode");

        setPromoCodeStatus("invalid");
        handleBasketCheck("", message);
      } else {
        setFormData({ ...formData, promoCode: promoCode });
        setPromoCodeStatus("valid");
        handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      }
    } catch (error) {
      setPromoCodeApplying(false);
        toast.error(error?.message || t("toastMessages.invalidPromoCode"), {
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
      {/* Scrollable content wrapper */}
      <div className="order-summary-scrollable">
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
                        (getProduct(item.productId)?.productVariant?.vat || 0) *
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
                  {`- AED`}{" "}
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
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoCodeStatus(null);
                }}
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

        {/* Secure Payment Button - Mobile Style */}
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

        <Modal
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          centered
          className="promo-modal"
          width="40%"
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
