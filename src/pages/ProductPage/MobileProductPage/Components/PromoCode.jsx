import React from "react";

function PromoCodePopup({ onClose }) {
  return (
    <div className="promo-popup-overlay">
      <div className="promo-popup-card">
        <button className="promo-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="promo-popup-title">Promo Code Applied</div>
        <div className="promo-popup-amount">AED 100.00</div>
        <div className="promo-popup-saved">
          Saved! that feels amazing, right?
        </div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row">
          <span>Sub total :</span>
          <span>AED 935.71</span>
        </div>
        <div className="promo-popup-row">
          <span>VAT & tax :</span>
          <span>+ 49.29 VAT & Tax</span>
        </div>
        <div className="promo-popup-row">
          <span>promo code savings :</span>
          <span>-100.00</span>
        </div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row promo-popup-row--total">
          <span>Total :</span>
          <span>AED 885.00</span>
        </div>
      </div>
    </div>
  );
}

export default PromoCodePopup;
