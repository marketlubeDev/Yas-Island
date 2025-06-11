import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import backIcon from "../../../../assets/icons/back.svg";
import trashIcon from "../../../../assets/icons/trash.svg";
import frame1 from "../../../../assets/images/frame1.png";
import { useNavigate } from "react-router-dom";

function Mycart({ onClose, visible }) {
  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: frame1,
      title: "1 day Ferrari World Yas Island",
      price: 328.57,
      vat: "16.43 VAT & tax",
      date: "08 Feb 2025",
      type: "Adults",
      quantity: 2,
    },
    {
      id: 2,
      image: frame1,
      title: "1 day Ferrari World Yas Island",
      price: 278.57,
      vat: "16.43 VAT & tax",
      date: "08 Feb 2025",
      type: "Children",
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
    onClose();
  };

  useEffect(() => {
    document.body.classList.add("body--modal-open");
    return () => {
      document.body.classList.remove("body--modal-open");
    };
  }, []);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      closable={false}
      className="cart-modal"
    >
      <div className="cart-modal__header">
        <button className="cart-modal__back" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
        <span className="cart-modal__title">My cart</span>
      </div>
      <div className="cart-modal__booking-date">
        Booking for <b>Thu 08- Feb 2025</b>
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
                e.target.src = frame1;
              }}
            />
            <div className="cart-modal__item-content">
              <div className="cart-modal__item-title-row">
                <div className="cart-modal__item-title">{item.title}</div>
                <button
                  className="cart-modal__item-delete"
                  onClick={() => deleteItem(item.id)}
                >
                  <img src={trashIcon} alt="Delete" />
                </button>
              </div>
              <div className="cart-modal__item-price">
                <span className="cart-modal__item-price-main">
                  AED {item.price}
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
            <span>Sub total :</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-modal__summary-row">
            <span>vat & tax :</span>
            <span>+ {vatTotal.toFixed(2)} VAT & Tax</span>
          </div>
          <div className="cart-modal__summary-row cart-modal__summary-row--total">
            <span>Total :</span>
            <span>AED {total.toFixed(2)}</span>
          </div>
        </div>
        <button
          className="cart-modal__checkout"
          onClick={() => navigate("/payment")}
        >
          Check out
        </button>
        <button
          className="cart-modal__save"
          onClick={() => {
            onClose();
            navigate("/product");
          }}
        >
          Save cart & pay later
        </button>
      </div>
    </Modal>
  );
}

export default Mycart;
