import React from "react";
import closeIcon from "../../../../assets/icons/close copy.svg"; // Replace with your close icon
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow icon

function AttractionDetailModal({ attraction, onClose, onBack, onAddToCart,setShowBookingModal,setShowAttractionDetail }) {
  if (!attraction) return null;

  return (
    <div className="attraction-detail-modal-overlay">
      <span className="attraction-detail-modal__close" onClick={onClose}>
        <img src={closeIcon} alt="close" />
      </span>
      <div className="attraction-detail-modal" style={{ height: "85vh" }}>
        <div className="attraction-detail-modal__header">
          <button className="attraction-detail-modal__back" onClick={onBack}>
            <img src={backIcon} alt="Back" />
          </button>
          <span className="attraction-detail-modal__title">
            {attraction.title}
          </span>
        </div>
        <div className="attraction-detail-modal__body">
          <img
            src={attraction.image}
            alt={attraction.title}
            className="attraction-detail-modal__image"
          />
          <div className="attraction-detail-modal__main-title">
            {attraction.title}
          </div>
          <div className="attraction-detail-modal__desc">
            {attraction.detailDesc || attraction.desc}
          </div>
        </div>
        <div className="attraction-detail-modal__footer-divider"></div>
        <div className="attraction-detail-modal__footer">
          <div className="attraction-detail-modal__footer-left">
            <div className="attraction-detail-modal__price">
              {attraction.detailPrice || attraction.price}
            </div>
            <div className="attraction-detail-modal__vat">
              {attraction.detailVat || attraction.vat}
            </div>
          </div>
          <div className="attraction-detail-modal__footer-vertical-divider"></div>
          <div className="attraction-detail-modal__footer-right">
            <button
              className="attraction-detail-modal__add-btn"
              onClick={() => {
                setShowAttractionDetail(false);
                setShowBookingModal(true);
              }}
            >
              + Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetailModal;
