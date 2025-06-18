import React from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close copy.svg"; // Replace with your close icon
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow
import closeIconInverter from "../../../../assets/icons/closeinverter.svg";
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector } from "react-redux";

function AttractionDetailModal({ attraction, onClose, onAddToCart }) {
  console.log(attraction, "attraction>>");
  const { t } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;

  if (!attraction) return null;

  return (
    <>
      <div className="attraction-detail-modal__header">
        <button className="attraction-detail-modal__back" onClick={onClose}>
          <img src={backIconSrc} alt={t("common.back")} />
        </button>
        <span className="attraction-detail-modal__title">
          {attraction?.product_title}
        </span>
      </div>
      <div className="attraction-detail-modal__body">
        <img
          src={attraction?.product_images?.image_urls[0]}
          alt={attraction?.product_title}
          className="attraction-detail-modal__image"
        />
        {/* <div className="attraction-detail-modal__main-title">
          {t(attraction.titleKey)}
        </div> */}
        {/* <div className="attraction-detail-modal__desc">
          {t(attraction.detailDesc || attraction.descKey)}
        </div> */}

        <div
          dangerouslySetInnerHTML={{ __html: attraction?.productdesc }}
        ></div>
      </div>

      <div className="attraction-detail-modal__footer">
        <div className="attraction-detail-modal__footer-divider"></div>
        <div className="attraction-detail-modal__footer-left">
          <div className="attraction-detail-modal__price">
            AED {attraction?.product_variants[0]?.gross}
          </div>
          <div className="attraction-detail-modal__vat">
            +{(attraction?.product_variants[0]?.gross * 0.05).toFixed(2)} Tax
          </div>
        </div>
        <div className="attraction-detail-modal__footer-vertical-divider"></div>
        <div className="attraction-detail-modal__footer-right">
          <button
            className="attraction-detail-modal__add-btn"
            onClick={onAddToCart}
          >
            + {t("common.addToCart")}
          </button>
        </div>
      </div>
    </>
  );
}

export default AttractionDetailModal;
