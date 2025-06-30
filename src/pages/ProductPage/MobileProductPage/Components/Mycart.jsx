import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "antd";
import backIcon from "../../../../assets/icons/back.svg";
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import trashIcon from "../../../../assets/icons/trash.svg";
import trashIconInverter from "../../../../assets/icons/invertdelete.svg";
import frame1 from "../../../../assets/images/frame1.png";
import { useNavigate } from "react-router-dom";
import { ar } from "../../../../translations/ar";
import { en } from "../../../../translations/en";
import { useLanguage } from "../../../../context/LanguageContext";
import { useSelector } from "react-redux";

function Mycart({ onClose, visible }) {
  const { language } = useLanguage();
  const t = language === "العربية" || language === "ar" ? ar : en;
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
  const deleteIconSrc = isDarkMode ? trashIconInverter : trashIcon;
  const navigate = useNavigate();
  const isRTL = language === "ar" || language === "العربية";

  const handleBack = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onClose();
    },
    [onClose]
  );

  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: frame1,
      titleKey: "ferrariWorld",
      price: 328.57,
      vat: t.cart.item.vatAndTax,
      date: "08 Feb 2025",
      typeKey: "adults",
      quantity: 2,
    },
    {
      id: 2,
      image: frame1,
      titleKey: "ferrariWorld",
      price: 278.57,
      vat: t.cart.item.vatAndTax,
      date: "08 Feb 2025",
      typeKey: "children",
      quantity: 1,
    },
  ]);

  // Example summary
  const subtotal = 935.71;
  const vatTotal = 49.29;
  const total = 985.0;

  // Quantity handlers
  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Delete handler
  const deleteItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={handleBack}
      footer={null}
      width="100%"
      closable={false}
      keyboard={true}
      maskClosable={true}
      className={`mycart-modal-mobile ${isRTL ? "rtl" : ""}`}
      transitionName="zoom"
      maskTransitionName="fade"
      maskStyle={{ background: "rgba(0, 0, 0, 0.45)" }}
      destroyOnClose
    >
      <div className="mycart-modal__content">
        <div className="mycart-modal__header">
          <button
            className={`mycart-modal__back ${
              isRTL ? "mycart-modal__back--rtl" : ""
            }`}
            onClick={handleBack}
            type="button"
            style={{ cursor: "pointer" }}
            aria-label="Close modal"
          >
            <img
              src={backIconSrc}
              alt="Back"
              style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
            />
          </button>
          <span className="mycart-modal__title">{t.cart.title}</span>
        </div>

        <div className="mycart-modal__items">
          {cartItems.length === 0 ? (
            <div className="mycart-modal__empty">
              <h3>Cart is empty</h3>
              <p>Add some items to your cart to get started</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="mycart-modal__item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.titleKey}
                  className="mycart-modal__item-img"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    e.target.src = frame1;
                  }}
                />
                <div className="mycart-modal__item-content">
                  <div className="mycart-modal__item-title-row">
                    <div className="mycart-modal__item-title">
                      {t.cart.item[item.titleKey]}
                    </div>
                    <button
                      className="mycart-modal__item-delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      <img src={deleteIconSrc} alt="Delete" />
                    </button>
                  </div>
                  <div className="mycart-modal__item-price">
                    <span className="mycart-modal__item-price-main">
                      {t.cart.currency} {item.price}
                    </span>
                    <span className="mycart-modal__item-vat">{item.vat}</span>
                  </div>
                  <div className="mycart-modal__item-date">
                    {t.cart.validFrom} {item.date} {t.cart.to} {item.date}
                  </div>
                  <div className="mycart-modal__item-qty-row">
                    <span style={{ color: "var(--color-email-form-label)" }}>
                      {t.cart[item.typeKey]}
                    </span>
                    <div className="mycart-modal__item-qty-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <span style={{ color: "var(--color-email-form-label)" }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mycart-modal__footer">
            <div className="mycart-modal__summary">
              <div className="mycart-modal__summary-row">
                <span>{t.cart.subTotal}</span>
                <span>
                  {t.cart.currency} {subtotal.toFixed(2)}
                </span>
              </div>
              <div className="mycart-modal__summary-row">
                <span>{t.cart.vatAndTax}</span>
                <span>+ {vatTotal.toFixed(2)} VAT & Tax</span>
              </div>
              <div className="mycart-modal__summary-row mycart-modal__summary-row--total">
                <span>{t.cart.total}</span>
                <span>AED {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="mycart-modal__checkout"
              onClick={() => navigate("/payment")}
            >
              {t.cart.checkOut}
            </button>
            <button
              className="mycart-modal__save"
              onClick={() => {
                handleBack();
                navigate("/product");
              }}
            >
              {t.cart.saveCartAndPayLater}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default Mycart;
