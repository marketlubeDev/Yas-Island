import React, { useState } from "react";
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

export default function OrderSummary({
  formData,
  setFormData,
  checkout,
  showPromoCode = true,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  // const { isBigDesktop, isDesktop } = useSelector((state) => state.responsive);
  const [promoCode, setPromoCode] = useState(
    checkout?.coupons?.[0]?.code || checkout?.promotions?.[0]?.code || ""
  );
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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
            res?.orderDetails?.error?.text || t("Something went wrong"),
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
          dispatch(
            setCheckout({
              coupons: orderDetails?.coupons,
              items: items,
              emailId: checkout?.emailId,
              language: currentLanguage,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
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
          } else if (message) {
            toast.error(message || "Invalid promo code");
          } else if (isRemoveOperation) {
            toast.success(t("orderSummary.promoCodeRemoved"), {});
          }
        }
      },
      onError: (err) => {
        console.log(err, "err");
        toast.error(err?.response?.data?.message || t("Something went wrong"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
      },
    });
  };

  const handleRemovePromoCode = () => {
    setPromoCode("");
    handleBasketCheck("", "", true); // Pass a flag to indicate this is a remove operation
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCode) {
        setPromoCodeApplying(false);
        toast.error("Please enter a promo code");
        return;
      }
      const response = await validatePromocode(promoCode);
      if (!response?.data?.coupondetails?.coupon) {
        setIsModalVisible(false);
        // toast.error(response?.coupondetails?.error?.text || "Invalid promo code");
        let message =
          response?.coupondetails?.error?.text || "Invalid promo code";

        handleBasketCheck("", message);
      } else {
        setFormData({ ...formData, promoCode: promoCode });
        handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      }
    } catch (error) {
      setPromoCodeApplying(false);
      toast.error(error?.message || "Invalid promo code");
    }
  };

  return (
    <div className="order-summary-new">
      {/* Header */}
      <div className="order-summary-header">
        <h3 className="order-summary-title">{t("orderSummary.title")}</h3>
        <div className="order-summary-subtitle">
          {checkout?.items?.length}{" "}
          {checkout?.items?.length === 1
            ? t("orderSummary.item")
            : t("orderSummary.items")}
        </div>
      </div>

      {/* View All Items Section */}
      <div className="view-items-section">
        <div className="view-items-header" onClick={toggleAllItems}>
          <div className="view-items-left">
            <div className="shopping-bag-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="view-items-text">
              {t("orderSummary.viewItems")}
            </span>
          </div>
          {/* <img
            src={downArrow}
            alt="expand"
            className={`view-items-arrow ${showAllItems ? "expanded" : ""}`}
          /> */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            style={{
              transform: showAllItems ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </div>

        {showAllItems && (
          <div className="items-container">
            {checkout?.items?.map((item, index) => (
              <div key={index} className="order-item-minimal">
                <div className="item-content">
                  <div className="item-main">
                    <h4 className="item-title">
                      {getProduct(item.productId)?.product?.product_title}
                    </h4>
                    <div className="item-meta">
                      <span className="item-variant">
                        {
                          getProduct(item.productId)?.productVariant
                            ?.productvariantname
                        }
                      </span>
                      <span className="item-separator">•</span>
                      <span className="item-date">
                        {formatDate(item.validFrom)}
                      </span>
                      <span className="item-separator">•</span>
                      <span className="item-quantity">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="item-price">
                    <span className="price-amount">
                      {t("common.aed")}{" "}
                      {(
                        getProduct(item.productId)?.productVariant?.net_amount *
                          item.quantity +
                        getProduct(item.productId)?.productVariant?.vat *
                          item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="pricing-section">
        <div className="pricing-row">
          <span className="pricing-label">{t("orderSummary.subTotal")}</span>
          <span className="pricing-value">
            {t("common.aed")} {checkout?.netAmount}
          </span>
        </div>
        <div className="pricing-row">
          <span className="pricing-label">{t("orderSummary.vat")}</span>
          <span className="pricing-value">
            + {t("common.aed")} {checkout?.taxAmount}
          </span>
        </div>
        {checkout?.promotions?.[0]?.discount && (
          <div className="pricing-row">
            <span className="pricing-label-promo">
              {t("orderSummary.promoCodeSavings")}
            </span>
            <span className="pricing-value" style={{ display: "flex" }}>
              {checkout?.promotions[0]?.discount}
              <button
                className="remove-promo-btn"
                onClick={handleRemovePromoCode}
                title={t("orderSummary.removePromoCode")}
                type="button"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </span>
          </div>
        )}

        {/* Promo Code Section */}
        {showPromoCode && (
          <div className="promo-section">
            <div className="promo-input-group">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t("orderSummary.enterPromoCode")}
                className="promo-input"
                disabled={promoCodeApplying}
              />
              <button
                className="promo-apply-btn"
                onClick={handlePromoCode}
                disabled={promoCodeApplying}
              >
                {promoCodeApplying ? (
                  <ButtonLoading height="14px" width="14px" />
                ) : (
                  t("orderSummary.apply")
                )}
              </button>
            </div>
          </div>
        )}

        <div className="pricing-row total-row">
          <span className="total-label">{t("orderSummary.total")}</span>
          <span className="total-value">
            {t("common.aed")} {checkout?.grossAmount}
          </span>
        </div>
      </div>

      {/* Secure Payment Section */}
      <div className="secure-payment-section">
        <div className="secure-payment-button">
          <div className="secure-icon">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7V12C3 16.4183 6.58172 20 11 20H13C17.4183 20 21 16.4183 21 12V7L12 2Z"
                fill="#22C55E"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="secure-text">Secure Payment</span>
        </div>
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
