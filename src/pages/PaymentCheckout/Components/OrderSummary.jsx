import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";
import PromoCodeModalContent from "./PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";
import { useSelector } from "react-redux";
import downArrow from "../../../assets/icons/downArrow.svg";

export default function OrderSummary({ formData, setFormData, checkout }) {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const { isBigDesktop, isDesktop } = useSelector((state) => state.responsive);
  const productList = useSelector((state) => state.product.allProducts);
  console.log(checkout , "checkout>>")

  const getProduct = (item ) => {
    const product = productList.find(
      (product) => product.product_variants.some(variant => variant.productid === item)
    );
  
    const productVariant = product?.product_variants.find(variant => variant.productid === item);
    console.log(productVariant , "productVariant>>")
    return {
      product,
      productVariant
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
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div
      className="order-summary"
      style={{ backgroundColor: "--color-order-summary-bg" }}
    >
    

      {/* Display each item as accordion */}
      <div className="order-summary__items">
        {checkout?.items?.map((item, index) => (
          <div key={index} className="item-accordion">
            <div 
              className="item-accordion__header" 
              onClick={() => toggleAccordion(index)}
            >
              <div className="item-accordion__title">
                <h4>{getProduct(item.productId)?.product?.product_title}</h4>
           
              </div>
              <img 
                src={downArrow} 
                alt="expand" 
                className={`accordion-arrow ${expandedItem === index ? 'expanded' : ''}`}
              />
            </div>
            
            {expandedItem === index && (
              <div className="item-accordion__content">
                <div className="detail-row">
                  <span className="label">{t("payment.orderSummary.datesAndGuests")}</span>
                  <div className="values">
                    <div>{formatDate(item.validFrom)}</div>
                    <div>
                      {getProduct(item.productId)?.productVariant?.productvariantname} - {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="price-details">
                  <div className="price-row">
                    <span>Net Amount:</span>
                    <span>AED {getProduct(item.productId)?.productVariant?.net_amount * item.quantity}</span>
                  </div>
                  <div className="price-row">
                    <span>VAT & Tax:</span>
                    <span>+ {getProduct(item.productId)?.productVariant?.vat * item.quantity}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="order-summary__pricing">
        <div className="price-row">
          <span className="price-row__label">
            {t("payment.orderSummary.subTotal")}
          </span>
          <span className="price-row__values">AED {checkout?.netAmount}</span>
        </div>
        <div className="price-row">
          <span className="price-row__label">
            {t("payment.orderSummary.vatAndTax")}
          </span>
          <span className="price-row__values">+ {checkout?.taxAmount} VAT & Tax</span>
        </div>
        <div className="divider-line"></div>
        <div className="price-row total">
          <span className="price-row__label-total">
            {t("payment.orderSummary.total")}
          </span>
          <span className="price-row__values-total">AED {checkout?.grossAmount}</span>
        </div>
      </div>

      <div
        className="promo-code"
        style={{
          backgroundColor: "var(--color-order-summary-bg)",
          borderRadius: "10px",
          height: "110px",
          width: "300px",
          padding: "10px",
          marginLeft: isBigDesktop ? "40px" : isDesktop ? "20px" : "4.5rem",
        }}
      >
        <p className="promo-code__label">
          {t("payment.orderSummary.promoCode.label")}
        </p>
        <div className="promo-code__input-group">
          <input
            type="text"
            value={formData.promoCode}
            onChange={(e) =>
              setFormData({ ...formData, promoCode: e.target.value })
            }
            placeholder={t("payment.orderSummary.promoCode.placeholder")}
          />
          <button className="apply-btn" onClick={() => setIsModalVisible(true)}>
            {t("payment.orderSummary.promoCode.apply")}
          </button>
        </div>
      </div>

      <div className="terms">
        <label className="checkbox-container">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.acceptTerms")}{" "}
            <a href="#" className="terms-link">
              {t("payment.orderSummary.terms.termsAndConditions")}
            </a>
          </span>
        </label>

        <label className="checkbox-container">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.receiveCommunications")}
          </span>
        </label>
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
        <PromoCodeModalContent />
      </Modal>
    </div>
  );
}
