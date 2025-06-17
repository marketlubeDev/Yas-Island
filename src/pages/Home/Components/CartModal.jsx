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
  const { language } = useLanguage();

  // Cart items data
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

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
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

        {/* <div className="booking-date">
          <p>
            {t("cart.bookingFor")} <span>Thu 08- Feb 2025</span>
          </p>
        </div> */}

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.price}</p>
                <div className="validity-date" style={{}}>
                  Valid from <span>{item.validFrom}</span> to{" "}
                  <bspan>{item.validTo}</bspan>
                </div>
              </div>
              <div className="quantity-controls">
                <span>{t("cart.adults")}</span>
                <div className="controls">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange(item.id, -1)}
                  />
                  <span>{item.quantity}</span>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleQuantityChange(item.id, 1)}
                  />
                  <Button className="delete-btn">
                    <img src={DeleteIcon} alt={t("cart.delete")} />
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
