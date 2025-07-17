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

export default function OrderSummary({ formData, setFormData, checkout }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
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

  const toggleAccordion = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
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

      {/* Items Section */}
      <div className="order-items-section">
        {/* <div className="section-header">
          <span className="section-title">DATES & GUESTS</span>
        </div> */}

        <div className="items-container">
          {checkout?.items?.map((item, index) => (
            <div key={index} className="order-item">
              <div
                className="item-header"
                onClick={() => toggleAccordion(index)}
              >
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
                  <img
                    src={downArrow}
                    alt="expand"
                    className={`expand-icon ${
                      expandedItem === index ? "expanded" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedItem === index && (
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
              )}
            </div>
          ))}
        </div>
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

        {/* <div className="pricing-divider"></div> */}

        <div className="pricing-row total-row">
          <span className="total-label">Total</span>
          <span className="total-value">AED {checkout?.grossAmount}</span>
        </div>
      </div>

      {/* <div className="terms">
        <label
          className={`checkbox-container ${
            currentLanguage === "ar" ? "rtl" : ""
          }`}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={checkout.isTnCAgrred}
            onChange={(e) => handleTermsChange("terms", e.target.checked)}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.acceptTerms")}{" "}
            <a href="#" className="terms-link">
              {t("payment.orderSummary.terms.termsAndConditions")}
            </a>
          </span>
        </label>

        <label
          className={`checkbox-container ${
            currentLanguage === "ar" ? "rtl" : ""
          }`}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={checkout.isConsentAgreed}
            onChange={(e) => handleTermsChange("consent", e.target.checked)}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.receiveCommunications")}
          </span>
        </label>
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
    </div>
  );
}
