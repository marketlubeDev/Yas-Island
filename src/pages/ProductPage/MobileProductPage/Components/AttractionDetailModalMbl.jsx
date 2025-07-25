import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  setEndDate,
  setPerformanceData,
  setProductId,
  setStartDate,
} from "../../../../global/performanceSlice";
import getPerformance from "../../../../serivces/performance/performance";
import formatDate from "../../../../utils/dateFormatter";
import { toast } from "sonner";

function AttractionDetailModalMbl({
  attraction,
  onClose,
  setShowBookingSection,
  setAvailableDates,
  setIsLoadingDates,
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
    return () => {
      // Restore scroll when modal closes
      document.body.style.overflow = "";
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

  function getAvailableDates(product) {
    const today = new Date();
    const startDate = product?.sale_date_offset || 0;
    today.setDate(today.getDate() + startDate);
    let endDate;

    if (product?.calendar_range_days && product?.calendar_end_date) {
      const rangeEndDate = new Date(today);
      rangeEndDate.setDate(today.getDate() + product?.calendar_range_days);
      const calendarEndDate = new Date(product?.calendar_end_date);
      endDate = new Date(
        Math.min(calendarEndDate.getTime(), rangeEndDate.getTime())
      );
    } else if (product?.calendar_range_days) {
      endDate = new Date(today);
      endDate.setDate(today.getDate() + product?.calendar_range_days);
    } else if (product?.calendar_end_date) {
      endDate = new Date(product?.calendar_end_date);
    } else {
      endDate = new Date(today.getFullYear(), 11, 31);
    }

    const dates = [];
    let currentDate = new Date(today);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const fetchAvailableDates = async () => {
    setIsLoadingDates(true);
    try {
      let hasPerformance = false;

      if (attraction?.product_variants?.length > 0) {
        attraction?.product_variants?.forEach((variant) => {
          if (variant?.hasperformance) {
            hasPerformance = true;
          }
        });
      }

      if (hasPerformance) {
        const productId = attraction?.product_masterid;
        const performanceData = await getPerformance(productId);

        // Check if we have any performance data
        if (!performanceData || performanceData.length === 0) {
          toast.error("This product is currently not available", {
            position: "top-center",
          });
          onClose();
          // setShowBookingSection(false);
          return;
        }

        // Format dates for each variant and mark variants with no dates as unavailable
        const formattedData = performanceData.map((variant) => {
          const formattedDates =
            variant.availableDates?.map((date) => date.split("T")[0]) || [];
          return {
            ...variant,
            availableDates: formattedDates,
            isAvailable: formattedDates.length > 0, // Add flag to track if variant has any dates
          };
        });

        // Get all unique dates from all variants for calendar display
        const allUniqueDates = [
          ...new Set(
            formattedData.flatMap((variant) => variant.availableDates)
          ),
        ];

        // Check if all variants have no dates
        const allVariantsUnavailable = formattedData.every(
          (variant) => !variant.isAvailable
        );

        if (allVariantsUnavailable) {
          toast.error("This product is currently not available", {
            position: "top-center",
          });
          onClose();
          // setShowBookingSection(false);
          return;
        }

        dispatch(setPerformanceData(formattedData));
        setAvailableDates(allUniqueDates);
      } else {
        setAvailableDates(getAvailableDates(attraction));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
      onClose();
      setShowBookingSection(false);
    } finally {
      setIsLoadingDates(false);
    }
  };

  const handleAddToCart = () => {
    setShowBookingSection("booking");
    fetchAvailableDates();
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
    <>
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
        {/* <div className="attraction-detail-modal__footer-divider"></div> */}
        <div className="attraction-detail-modal__footer-left">
          <div className="attraction-detail-modal__price">
            {attraction.currency || "AED"} {defaultVariant(attraction)?.gross}
          </div>
          <div className="attraction-detail-modal__vat">
            {defaultVariant(attraction)?.net_amount} +
            {defaultVariant(attraction)?.vat}
            {t("common.netAndTax")}
          </div>
        </div>
        <div className="attraction-detail-modal__footer-vertical-divider"></div>
        <div className="attraction-detail-modal__footer-right">
          <button
            className="attraction-detail-modal__add-btn"
            onClick={handleAddToCart}
          >
            + {t("common.addToCart")}
          </button>
        </div>
      </div>
    </>
  );
}

export default AttractionDetailModalMbl;
