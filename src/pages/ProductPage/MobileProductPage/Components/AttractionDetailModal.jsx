import React from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close copy.svg"; // Replace with your close icon
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow icon

function AttractionDetailModal({ attraction, onClose, onAddToCart }) {
  const { t } = useTranslation();
  
  if (!attraction) return null;

  return (
    <>
      {/* <span
        className="attraction-detail-modal__close attraction-detail-modal__close--outside"
        onClick={onClose}
      >
        <img src={closeIcon} alt="close" />
      </span> */}
      <div className="attraction-detail-modal__header">
        <button className="attraction-detail-modal__back" onClick={onClose}>
          <img src={backIcon} alt="Back" />
        </button>
        <span className="attraction-detail-modal__title">
          {t(attraction.titleKey)}
        </span>
      </div>
      <div className="attraction-detail-modal__body">
        <img
          src={attraction.image}
          alt={t(attraction.titleKey)}
          className="attraction-detail-modal__image"
        />
        <div className="attraction-detail-modal__main-title">
          {t(attraction.titleKey)}
        </div>
        <div className="attraction-detail-modal__desc">
          {t(attraction.detailDesc || attraction.descKey)}
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
            onClick={onAddToCart}
          >
            + Add to cart
          </button>
        </div>
      </div>
    </>
  );
}

export default AttractionDetailModal;
