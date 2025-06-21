import React from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import PromoCodeModalContent from "../Components/PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";

export default function OrderSummary({ formData, setFormData }) {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="order-summary" style={{ backgroundColor: "#fff" }}>
      <h3 className="order-summary__title">
        {t("payment.orderSummary.title")}
      </h3>

      <div className="order-summary__details">
        <div className="detail-row">
          <span className="label">
            {t("payment.orderSummary.datesAndGuests")}
          </span>
          <div className="values">
            <div>THU 08- FEB 2025</div>
            <div>{t("payment.orderSummary.adult")} - 2</div>
            <div>{t("payment.orderSummary.children")} - 1</div>
          </div>
        </div>
      </div>

      <div className="order-summary__pricing">
        <div className="price-row">
          <span className="price-row__label">
            {t("payment.orderSummary.subTotal")}
          </span>
          <span className="price-row__values">AED 935.71</span>
        </div>
        <div className="price-row">
          <span className="price-row__label">
            {t("payment.orderSummary.vatAndTax")}
          </span>
          <span className="price-row__values">+ 49.29 VAT & Tax</span>
        </div>
        <div className="divider-line"></div>
        <div className="price-row total">
          <span className="price-row__label-total">
            {t("payment.orderSummary.total")}
          </span>
          <span className="price-row__values-total">AED 985.00</span>
        </div>
      </div>

      <div
        className="promo-code"
        style={{
          backgroundColor: "#F4F7F8",
          borderRadius: "10px",
          height: "110px",
          width: "300px",
          padding: "10px",
          marginLeft: "4.5rem",
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
