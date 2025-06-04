import React from "react";
import { Modal } from "antd";
import PromoCodeModalContent from "../Components/PromoCodeModalContent";
import closeIcon from "../../../assets/icons/close.svg";

export default function OrderSummary({ formData, setFormData }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="order-summary">
      <h3 className="order-summary__title">1 day FERRARI WORLD YAS ISLAND</h3>

      <div className="order-summary__details">
        <div className="detail-row">
          <span className="label">DATES & GUESTS</span>
          <div className="values">
            <div>THU 08- FEB 2025</div>
            <div>ADULT - 2</div>
            <div>CHILDREN - 1</div>
          </div>
        </div>
      </div>

      <div className="order-summary__pricing">
        <div className="price-row">
          <span className="price-row__label">Sub total :</span>
          <span className="price-row__values">AED 935.71</span>
        </div>
        <div className="price-row">
          <span className="price-row__label">vat & tax :</span>
          <span className="price-row__values">+ 49.29 VAT & Tax</span>
        </div>
        <div className="divider-line"></div>
        <div className="price-row total">
          <span className="price-row__label-total">Total :</span>
          <span className="price-row__values-total">AED 985.00</span>
        </div>
      </div>

      <div className="promo-code">
        <p className="promo-code__label">
          ENTER YOUR PROMO CODE TO GET DISCOUNT
        </p>
        <div className="promo-code__input-group">
          <input
            type="text"
            value={formData.promoCode}
            onChange={(e) =>
              setFormData({ ...formData, promoCode: e.target.value })
            }
            placeholder="Enter promo code"
          />
          <button className="apply-btn" onClick={() => setIsModalVisible(true)}>
            Apply
          </button>
        </div>
      </div>

      <div className="terms">
        <label className="checkbox-container">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            I have read and accept the{" "}
            <a href="#" className="terms-link">
              terms and conditions *
            </a>
          </span>
        </label>

        <label className="checkbox-container">
          <input type="checkbox" className="checkbox-input" />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            Receive communications via email
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
