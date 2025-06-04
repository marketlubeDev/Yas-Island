import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Expand from "../../../assets/icons/shrink.svg";
import Ferrari from "../../../assets/images/product1.png";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  // Example local state for quantity of the first item
  const [item1Quantity, setItem1Quantity] = useState(2); // Starting with quantity 2
  // Example local state for quantity of the second item
  const [item2Quantity, setItem2Quantity] = useState(2); // Starting with quantity 2

  const handleCheckout = () => {
    navigate("/payment");
    onClose();
  };

  const handleSaveCart = () => {
    onClose();
  };

  // Handlers for the first item's quantity
  const handleIncreaseItem1Quantity = () => {
    setItem1Quantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseItem1Quantity = () => {
    setItem1Quantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent quantity from going below 1
  };

  // Handlers for the second item's quantity
  const handleIncreaseItem2Quantity = () => {
    setItem2Quantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseItem2Quantity = () => {
    setItem2Quantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent quantity from going below 1
  };

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
          <h2>My Cart</h2>
          <button className="expand-icon" onClick={onClose}>
            <img src={Expand} alt="Expand" />
          </button>
        </div>

        <div className="booking-date">
          <p>
            Booking for <span>Thu 08- Feb 2025</span>
          </p>
        </div>

        <div className="cart-items">
          {/* First hardcoded cart item */}
          <div className="cart-item">
            <img src={Ferrari} alt="Ferrari World" />
            <div className="item-details">
              <h4>1 day Ferrari World</h4>
              <p>AED 328.57</p>
              <small>16.43 VAT & Tax</small>
            </div>
            <div className="quantity-controls">
              <span>Adults</span>
              <div className="controls">
                <Button icon={<MinusOutlined />} onClick={handleDecreaseItem1Quantity} />
                <span>{item1Quantity}</span> {/* Display the item1Quantity state */}
                <Button icon={<PlusOutlined />} onClick={handleIncreaseItem1Quantity} />
                <Button className="delete-btn">
                  <img src={DeleteIcon} alt="Delete" />
                </Button>
              </div>
            </div>
          </div>

          {/* Second hardcoded cart item */}
           <div className="cart-item">
            <img src={Ferrari} alt="Ferrari World" />
            <div className="item-details">
              <h4>1 day Ferrari World</h4>
              <p>AED 328.57</p>
              <small>16.43 VAT & Tax</small>
            </div>
            <div className="quantity-controls">
              <span>Adults</span>
              <div className="controls">
                <Button icon={<MinusOutlined />} onClick={handleDecreaseItem2Quantity} />
                <span>{item2Quantity}</span> {/* Display the item2Quantity state */}
                <Button icon={<PlusOutlined />} onClick={handleIncreaseItem2Quantity} />
                <Button className="delete-btn">
                  <img src={DeleteIcon} alt="Delete" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-summary">
          <div className="subtotal">
            <div className="summary-row">
              <span>Sub total :</span>
              <span>AED 935.71</span>
            </div>
            <div className="summary-row">
              <span>VAT & Tax :</span>
              <span>+ 49.29 VAT & Tax</span>
            </div>
          </div>
          <div className="custom-divider"></div>
          <div className="total">
            <span>Total :</span>
            <span>AED 985.00</span>
          </div>

          <div className="cart-actions">
            <button className="save-cart-btn" onClick={handleSaveCart}>
              Save cart & pay later
            </button>
            <button className="checkout-btn" onClick={handleCheckout}>
              Check out
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CartModal;
