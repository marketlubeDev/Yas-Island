import React from "react";

export default function PromoCodeModalContent() {
  return (
    <div className="promo-modal-content">
      <h2 className="promo-modal-content__title">Promo Code Applied</h2>
      <div className="promo-modal-content__amount">AED 100.00</div>
      <div className="promo-modal-content__saved">
        Saved! that feels amazing, right?
      </div>
      <hr className="promo-modal-content__divider" />
      <div className="promo-modal-content__summary">
        <div className="promo-modal-content__row">
          <span>Sub total :</span>
          <span>AED 935.71</span>
        </div>
        <div className="promo-modal-content__row">
          <span>vat & tax :</span>
          <span>+ 49.29 VAT & Tax</span>
        </div>
        <div className="promo-modal-content__row promo-modal-content__row--savings">
          <span>promo code savings :</span>
          <span>-100.00</span>
        </div>
      </div>
      <hr className="promo-modal-content__divider" />
      <div className="promo-modal-content__total">
        <span>Total :</span>
        <span className="promo-modal-content__total-amount">AED 885.00</span>
      </div>
    </div>
  );
}
