import React, { useState, useEffect } from "react";
import backIcon from "../../../../assets/icons/back.svg";
import trashIcon from "../../../../assets/icons/trash.svg";
import frame1 from "../../../../assets/images/frame1.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

// Set the app element for react-modal
Modal.setAppElement("#root");

function Mycart({ onClose, onCheckout, onSaveAndPayLater }) {
  const { t } = useTranslation();
  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: frame1,
      title: t("cart.item.ferrariWorld"),
      price: 328.57,
      vat: t("cart.item.vatAndTax"),
      date: "08 Feb 2025",
      type: t("cart.adults"),
      quantity: 2,
    },
    {
      id: 2,
      image: frame1,
      title: t("cart.item.ferrariWorld"),
      price: 278.57,
      vat: t("cart.item.vatAndTax"),
      date: "08 Feb 2025",
      type: t("cart.adults"),
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

  const navigate = useNavigate();

  const handleBack = () => {
    onClose(); // Close the modal first
    window.history.back(); // Go back to the previous page
  };

  useEffect(() => {
    document.body.classList.add("body--modal-open");
    return () => {
      document.body.classList.remove("body--modal-open");
    };
  }, []);

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="cart-modal"
      overlayClassName="cart-modal-overlay"
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="cart-modal__header">
        <button className="cart-modal__back" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
        <span className="cart-modal__title">{t("cart.myCart")}</span>
      </div>
      <div className="cart-modal__booking-date">
        {t("cart.bookingFor")} <b>Thu 08- Feb 2025</b>
      </div>
      <div className="cart-modal__items">
        {cartItems.map((item) => (
          <div className="cart-modal__item" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="cart-modal__item-img"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.target.src = frame1; // Fallback to frame1
              }}
            />
            <div className="cart-modal__item-content">
              <div className="cart-modal__item-title-row">
                <div className="cart-modal__item-title">{item.title}</div>
                <button
                  className="cart-modal__item-delete"
                  onClick={() => deleteItem(item.id)}
                >
                  <img src={trashIcon} alt={t("cart.delete")} />
                </button>
              </div>
              <div className="cart-modal__item-price">
                <span className="cart-modal__item-price-main">
                  {t("cart.item.price")}
                </span>
                <span className="cart-modal__item-vat">{item.vat}</span>
              </div>
              <div className="cart-modal__item-date">
                Valid from {item.date} to {item.date}
              </div>
              <div className="cart-modal__item-qty-row">
                <span>{item.type}</span>
                <div className="cart-modal__item-qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-modal__footer">
        <div className="cart-modal__summary">
          <div className="cart-modal__summary-row">
            <span>{t("cart.subTotal")}</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-modal__summary-row">
            <span>{t("cart.vatAndTax")}</span>
            <span>
              + {vatTotal.toFixed(2)} {t("cart.vatAndTax")}
            </span>
          </div>
          <div className="cart-modal__summary-row cart-modal__summary-row--total">
            <span>{t("cart.total")}</span>
            <span>AED {total.toFixed(2)}</span>
          </div>
        </div>
        <button className="cart-modal__checkout" onClick={onCheckout}>
          {t("cart.checkOut")}
        </button>
        <button className="cart-modal__save" onClick={onSaveAndPayLater}>
          {t("cart.saveCartAndPayLater")}
        </button>
      </div>
    </Modal>
  );
}

export default Mycart;
