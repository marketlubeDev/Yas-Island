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
  const [showAllItems, setShowAllItems] = useState(false);
  const [promoCode, setPromoCode] = useState(
    checkout?.coupons?.[0]?.code || checkout?.promotions?.[0]?.code || ""
  );
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
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

  const toggleAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
            toast.error(message || t("toastMessages.invalidPromoCode"));
          } else if (isRemoveOperation) {
            toast.success(t("orderSummary.promoCodeRemoved"), {});
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
    handleBasketCheck("", "", true);
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCode) {
        setPromoCodeApplying(false);
        toast.error(t("toastMessages.invalidPromoCode"));
        return;
      }
      const response = await validatePromocode(promoCode);
      if (!response?.data?.coupondetails?.coupon) {
        setIsModalVisible(false);
        // toast.error(response?.coupondetails?.error?.text || "Invalid promo code");
        let message =
          response?.coupondetails?.error?.text ||
          t("toastMessages.invalidPromoCode");

        handleBasketCheck("", message);
      } else {
        setFormData({ ...formData, promoCode: promoCode });
        handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      }
    } catch (error) {
      setPromoCodeApplying(false);
      toast.error(error?.message || t("toastMessages.invalidPromoCode"));
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

      {/* View Items Button - Mobile Style */}
      <button
        onClick={toggleAllItems}
        className="email-checkout__summary-viewItems"
        type="button"
      >
        <div className="email-checkout__summary-viewItems-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="email-checkout__summary-viewItems-icon-text">
            {t("orderSummary.viewItems")}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: showAllItems ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {/* Item Details Section - Mobile Style */}
      {showAllItems && (
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
                        Qty: {item.quantity || 0}
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
      )}

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
                {`- AED`} {checkout?.promotions[0]?.discount?.replace("-", "")}
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
              className="email-checkout__summary-promoCode-input-container-inputBox"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoCodeApplying}
            />
            <button
              className="email-checkout__summary-promoCode-input-container-applyButton"
              type="button"
              onClick={handlePromoCode}
              disabled={promoCodeApplying}
            >
              {promoCodeApplying ? <ButtonLoading /> : t("orderSummary.apply")}
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
        <span className="grandTotal-Content">{t("orderSummary.total")}</span>
        <span className="grandTotal-Value">
          {t("common.aed")} {(checkout?.grossAmount || 0).toFixed(2)}
        </span>
      </div>

      {/* Secure Payment Button - Mobile Style */}
      <div className="email-checkout__summary-securePayment">
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
      </div>

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
    </div>
  );
}
