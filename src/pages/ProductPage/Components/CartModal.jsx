import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Expand from "../../../assets/icons/shrink.svg";
import Ferrari from "../../../assets/images/product1.png";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Example cart data - in a real app, this would come from a cart context or state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: Ferrari,
      title: "1 day Ferrari World",
      price: 328.57,
      vat: 16.43,
      quantity: 2,
      type: "adults",
      validFrom: "08 feb 2025",
      validTo: "08 feb 2025",
    },
    {
      id: 2,
      image: Ferrari,
      title: "1 day Ferrari World",
      price: 328.57,
      vat: 16.43,
      quantity: 2,
      type: "adults",
      validFrom: "08 feb 2025",
      validTo: "08 feb 2025",
    },
  ]);

  const handleCheckout = () => {
    navigate("/payment");
    onClose();
  };

  const handleSaveCart = () => {
    onClose();
  };

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const vatTotal = cartItems.reduce(
    (sum, item) => sum + item.vat * item.quantity,
    0
  );
  const total = subtotal + vatTotal;

  if (!isOpen) return null;

  return (
    <Drawer
      title={null}
      placement="right"
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
            <img src={Expand} alt="Expand" />
          </button>
        </div>

        <div className="booking-date">
          <p>
            {t("cart.bookingFor")} <span>Thu 08- Feb 2025</span>
          </p>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>AED {item.price.toFixed(2)}</p>
                <div className="item-date">
                  Valid from <b>{item.validFrom}</b> to <b>{item.validTo}</b>
                </div>
              </div>
              <div className="quantity-controls">
                <span>{t(`cart.${item.type}`)}</span>
                <div className="controls">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => updateQuantity(item.id, -1)}
                  />
                  <span>{item.quantity}</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => updateQuantity(item.id, 1)}
                  />
                  <Button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    <img src={DeleteIcon} alt="Delete" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="subtotal">
            <div className="summary-row">
              <span>{t("cart.subTotal")}</span>
              <span>AED {subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>{t("cart.vatAndTax")}</span>
              <span>+ {vatTotal.toFixed(2)} VAT & Tax</span>
            </div>
          </div>
          <div className="custom-divider"></div>
          <div className="total">
            <span>{t("cart.total")}</span>
            <span>AED {total.toFixed(2)}</span>
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
