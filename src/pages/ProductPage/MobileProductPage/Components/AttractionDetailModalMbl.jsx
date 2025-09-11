import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setEndDate,
  setProductId,
  setStartDate,
} from "../../../../global/performanceSlice";

function AttractionDetailModalMbl({
  attraction,
  onClose,
  setShowBookingSection,
}) {
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
  const dispatch = useDispatch();
  const [validStartDate, setValidStartDate] = useState(null);
  const [validEndDate, setValidEndDate] = useState(null);
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    // When modal is open, prevent background scroll
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    // Lock the body position to prevent any scrolling
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!attraction) return null;

  useEffect(() => {
    if (attraction && Object.keys(attraction).length > 0) {
      // 1. Calculate startDate
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const offset = attraction.sale_date_offset || 0;
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + offset);
      setValidStartDate(startDate);

      // 2. Calculate endDate
      let endDate;

      const endDateFromCalendar = attraction.calendar_end_date
        ? new Date(attraction.calendar_end_date)
        : null;

      const endDateFromRange = attraction.calendar_range_days
        ? new Date(startDate)
        : null;

      if (endDateFromRange) {
        endDateFromRange.setDate(
          startDate.getDate() + attraction.calendar_range_days - 1
        );
      }

      if (endDateFromCalendar && endDateFromRange) {
        endDate = new Date(Math.min(endDateFromCalendar, endDateFromRange));
      } else if (endDateFromCalendar) {
        endDate = endDateFromCalendar;
      } else if (endDateFromRange) {
        endDate = endDateFromRange;
      } else {
        endDate = new Date(today.getFullYear(), 11, 31);
      }

      endDate.setHours(23, 59, 59, 999);
      setValidEndDate(endDate.toISOString());
      dispatch(setStartDate(startDate.toDateString()));
      dispatch(setEndDate(endDate.toDateString()));
      dispatch(setProductId(attraction?.default_variant_id));
    }
  }, [attraction]);

  const handleAddToCart = () => {
    setShowBookingSection("booking");
  };

  const defaultVariant = (product) => {
    let defaultVariant = product?.product_variants?.find(
      (variant) => variant.isdefault
    );
    if (!defaultVariant) {
      defaultVariant = product?.product_variants[0];
    }
    return defaultVariant;
  };

  return (
    <div className="attraction-detail-modal__container">
      <div className="attraction-detail-modal__header">
        <img
          src={backIconSrc}
          alt="Back"
          className="attraction-detail-modal__back-icon"
          onClick={onClose}
          style={{
            transform: isRTL ? "scaleX(-1)" : "none",
          }}
        />
        <span className="attraction-detail-modal__title">
          {attraction?.product_title}
        </span>
        <span
          className="attraction-detail-modal__header-spacer"
          aria-hidden="true"
        ></span>
      </div>
      <div className="attraction-detail-modal__body">
        <img
          src={attraction?.product_images?.image_urls[0]}
          alt={attraction?.product_title}
          className="attraction-detail-modal__image"
        />

        <div
          dangerouslySetInnerHTML={{ __html: attraction?.productdesc }}
        ></div>
      </div>

      <div className="attraction-detail-modal__footer">
        <div className="attraction-detail-modal__price-section">
          <div className="attraction-detail-modal__price-left">
            <div className="attraction-detail-modal__price">
              {attraction.currency || "AED"} {defaultVariant(attraction)?.gross}
            </div>
            <div className="attraction-detail-modal__vat">
              <div className="attraction-detail-modal__vat-amount">
                {defaultVariant(attraction)?.net_amount} +{" "}
                {defaultVariant(attraction)?.vat}
              </div>
              <div className="attraction-detail-modal__vat-text">
                {t("common.netAndTax")}
              </div>
            </div>
          </div>
          <div className="attraction-detail-modal__footer-vertical-divider"></div>
          <div className="attraction-detail-modal__button-section">
            <button
              className="attraction-detail-modal__add-btn"
              onClick={handleAddToCart}
            >
              + {t("common.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetailModalMbl;
