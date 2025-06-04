import React from "react";
import arrow from "../../../../assets/icons/left.svg";
import accessibility from "../../../../assets/icons/assess.svg";
import globe from "../../../../assets/icons/globe.svg";
import cart from "../../../../assets/icons/cart.svg";
import downArrow from "../../../../assets/icons/downArrow.svg";
export default function MainProductHead({ onAccessibilityOpen, onCartOpen }) {
  return (
    <div className="product-header">
      <button className="back-buttonn" onClick={() => window.history.back()}>
        <img src={arrow} alt="Back" />
        Back
      </button>
      <h1 className="product-header__title">Select attractions</h1>
      <div className="header-actions">
        <button
          className="accessibility-button"
          aria-label="Accessibility options"
          onClick={onAccessibilityOpen}
        >
          <span className="product-header__icon">
            <img src={accessibility} alt="Accessibility" />
          </span>
        </button>
        <div className="language-selector">
          <button className="language-button">
            <span className="globe-icon">
              <img src={globe} alt="Globe" />
            </span>
            <span>English</span>
            <span className="chevron-down">
              <img src={downArrow} />
            </span>
          </button>
        </div>
        <button className="cart-button" onClick={onCartOpen}>
          <span className="cart-icon">
            <img src={cart} alt="Cart" />
          </span>
          View Cart
        </button>
      </div>
    </div>
  );
}
