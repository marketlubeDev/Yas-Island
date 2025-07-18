import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import PromoCodeModalContent from "./PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";
import { useSelector, useDispatch } from "react-redux";
import downArrow from "../../../assets/icons/downArrow.svg";
import {
  setCheckout,
  // updateTermsAcceptance,
} from "../../../global/checkoutSlice";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";

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
    checkout?.coupons?.[0]?.code || ""
  );
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
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

  const handleBasketCheck = (promoCode = "", message = "") => {
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
          } else {
            toast.error(message || "Invalid promo code");
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

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCode) {
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
        <h3 className="order-summary-title">Order Summary</h3>
        <div className="order-summary-subtitle">
          {checkout?.items?.length}{" "}
          {checkout?.items?.length === 1 ? "item" : "items"}
        </div>
      </div>

      {/* View All Items Section */}
      <div className="view-items-section">
        <div className="view-items-header" onClick={toggleAllItems}>
          <div className="view-items-left">
            <div className="shopping-bag-icon">
              <svg
                width="20"
                height="20"
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
            <span className="view-items-text">View Items</span>
          </div>
          <img
            src={downArrow}
            alt="expand"
            className={`view-items-arrow ${showAllItems ? "expanded" : ""}`}
          />
        </div>

        {showAllItems && (
          <div className="items-container">
            {checkout?.items?.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-header">
                  <div className="item-info">
                    <h4 className="item-title">
                      {getProduct(item.productId)?.product?.product_title}
                    </h4>
                    <div className="item-meta">
                      <span className="item-date">
                        {formatDate(item.validFrom)}
                      </span>
                      <span className="item-quantity">
                        • {item.quantity}{" "}
                        {item.quantity === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                  </div>
                  <div className="item-price">
                    <span className="price-amount">
                      AED{" "}
                      {(
                        getProduct(item.productId)?.productVariant?.net_amount *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="item-details">
                  <div className="detail-row">
                    <span className="detail-label">Variant:</span>
                    <span className="detail-value">
                      {
                        getProduct(item.productId)?.productVariant
                          ?.productvariantname
                      }
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {formatDate(item.validFrom)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">{item.quantity}</span>
                  </div>
                  <div className="price-breakdown">
                    <div className="breakdown-row">
                      <span>Net Amount:</span>
                      <span>
                        AED{" "}
                        {(
                          getProduct(item.productId)?.productVariant
                            ?.net_amount * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="breakdown-row">
                      <span>VAT & Tax:</span>
                      <span>
                        + AED{" "}
                        {(
                          getProduct(item.productId)?.productVariant?.vat *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
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
          <span className="pricing-label">Sub Total</span>
          <span className="pricing-value">AED {checkout?.netAmount}</span>
        </div>
        <div className="pricing-row">
          <span className="pricing-label">VAT & Tax</span>
          <span className="pricing-value">
            + {checkout?.taxAmount} VAT & Tax
          </span>
        </div>

        {/* Promo Code Section */}
        {showPromoCode && (
          <div className="promo-section">
            <div className="promo-header">
              <span className="promo-title">
                ENTER YOUR PROMO CODE TO GET DISCOUNT
              </span>
            </div>
            <div className="promo-input-group">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="promo-input"
              />
              <button
                className="promo-apply-btn"
                onClick={handlePromoCode}
                disabled={promoCodeApplying}
              >
                {promoCodeApplying ? (
                  <ButtonLoading height="16px" width="16px" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>
          </div>
        )}

        <div className="pricing-row total-row">
          <span className="total-label">Total</span>
          <span className="total-value">AED {checkout?.grossAmount}</span>
        </div>
      </div>

      {/* Secure Payment Section */}
      <div className="secure-payment-section">
        <div className="secure-payment-button">
          <div className="secure-icon">
            <svg
              width="16"
              height="16"
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
                d="M12 9L15 12L12 15L9 12L12 9Z"
                fill="white"
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
