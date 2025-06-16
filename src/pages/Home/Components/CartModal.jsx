import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Expand from "../../../assets/icons/shrink.svg";
import Ferrari from "../../../assets/images/product1.png";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

const CartModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Example local state for quantity of the first item
  const [item1Quantity, setItem1Quantity] = useState(2); // Starting with quantity 2
  // Example local state for quantity of the second item
  const [item2Quantity, setItem2Quantity] = useState(2); // Starting with quantity 2

  const { language } = useLanguage();

  const handleCheckout = () => {
    navigate("/payment");
    onClose();
  };

  const handleSaveCart = () => {
    onClose();
  };

  // Handlers for the first item's quantity
  const handleIncreaseItem1Quantity = () => {
    setItem1Quantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseItem1Quantity = () => {
    setItem1Quantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    ); // Prevent quantity from going below 1
  };

  // Handlers for the second item's quantity
  const handleIncreaseItem2Quantity = () => {
    setItem2Quantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseItem2Quantity = () => {
    setItem2Quantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    ); // Prevent quantity from going below 1
  };

  if (!isOpen) return null;

  return (
    <Drawer
      title={null}
      placement={language === "العربية" ? "left" : "right"}
      onClose={onClose}
      open={isOpen}
      width="34%"
      className="cart-drawer"
      closeIcon={null}
      headerStyle={{ display: "none" }}
    >
      <div className="cart-content">
        <div className="cart-header">
          <h2>{t("cart.title")}</h2>
          <button className="expand-icon" onClick={onClose}>
            <img src={Expand} alt={t("cart.expand")} />
          </button>
        </div>

        <div className="booking-date">
          <p>
            {t("cart.bookingFor")} <span>Thu 08- Feb 2025</span>
          </p>
        </div>

        <div className="cart-items">
          {/* First hardcoded cart item */}
          <div className="cart-item">
            <img src={Ferrari} alt={t("cart.item.ferrariWorld")} />
            <div className="item-details">
              <h4>{t("cart.item.ferrariWorld")}</h4>
              <p>{t("cart.item.price")}</p>
              <small>{t("cart.item.vatAndTax")}</small>
            </div>
            <div className="quantity-controls">
              <span>{t("cart.adults")}</span>
              <div className="controls">
                <Button
                  icon={<MinusOutlined />}
                  onClick={handleDecreaseItem1Quantity}
                />
                <span>{item1Quantity}</span>{" "}
                {/* Display the item1Quantity state */}
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleIncreaseItem1Quantity}
                />
                <Button className="delete-btn">
                  <img src={DeleteIcon} alt={t("cart.delete")} />
                </Button>
              </div>
            </div>
          </div>

          {/* Second hardcoded cart item */}
          <div className="cart-item">
            <img src={Ferrari} alt={t("cart.item.ferrariWorld")} />
            <div className="item-details">
              <h4>{t("cart.item.ferrariWorld")}</h4>
              <p>{t("cart.item.price")}</p>
              <small>{t("cart.item.vatAndTax")}</small>
            </div>
            <div className="quantity-controls">
              <span>{t("cart.adults")}</span>
              <div className="controls">
                <Button
                  icon={<MinusOutlined />}
                  onClick={handleDecreaseItem2Quantity}
                />
                <span>{item2Quantity}</span>{" "}
                {/* Display the item2Quantity state */}
                <Button
                  icon={<PlusOutlined />}
                  onClick={handleIncreaseItem2Quantity}
                />
                <Button className="delete-btn">
                  <img src={DeleteIcon} alt={t("cart.delete")} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <div className="subtotal">
            <div className="summary-row">
              <span>{t("cart.subTotal")}</span>
              <span>AED 935.71</span>
            </div>
            <div className="summary-row">
              <span>{t("cart.vatAndTax")}</span>
              <span>+ 49.29 VAT & Tax</span>
            </div>
          </div>
          <div className="custom-divider"></div>
          <div className="total">
            <span>{t("cart.total")}</span>
            <span>AED 985.00</span>
          </div>

          <div className="cart-actions">
            <button className="save-cart-btn" onClick={handleSaveCart}>
              {t("cart.saveCartAndPayLater")}
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              {t("cart.checkOut")}
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartModal;
