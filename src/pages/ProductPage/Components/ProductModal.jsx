import React, { useEffect, useState } from "react";
import BookingSection from "./BookingSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch } from "react-redux";
import {
  setEndDate,
  setPerformanceData,
  setProductId,
  setStartDate,
} from "../../../global/performanceSlice";
import getPerformance from "../../../serivces/performance/performance";
import formatDate from "../../../utils/dateFormatter";
import { toast } from "sonner";

export default function ProductModal({
  selectedProduct,
  showBookingSection,
  setShowBookingSection,
  onClose,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [validStartDate, setValidStartDate] = useState(null);
  const [validEndDate, setValidEndDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(false);

  // Reset scroll position when new product is opened
  useEffect(() => {
    const resetScroll = () => {
      const productDescriptionElement = document.querySelector(
        ".product-description-api"
      );
      if (productDescriptionElement) {
        // Force scroll reset with multiple methods
        productDescriptionElement.scrollTop = 0;
        productDescriptionElement.scrollLeft = 0;
        productDescriptionElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    };

    // Reset immediately
    resetScroll();

    // Also reset after a small delay to ensure element is fully rendered
    const timeoutId = setTimeout(resetScroll, 10);

    return () => clearTimeout(timeoutId);
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      // 1. Calculate startDate
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const offset = selectedProduct.sale_date_offset || 0;
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + offset);
      setValidStartDate(startDate);

      // 2. Calculate endDate
      let endDate;

      const endDateFromCalendar = selectedProduct.calendar_end_date
        ? new Date(selectedProduct.calendar_end_date)
        : null;

      const endDateFromRange = selectedProduct.calendar_range_days
        ? new Date(startDate)
        : null;

      if (endDateFromRange) {
        endDateFromRange.setDate(
          startDate.getDate() + selectedProduct.calendar_range_days - 1
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
      dispatch(setProductId(selectedProduct?.default_variant_id));
    }
  }, [selectedProduct]);

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

      if (selectedProduct?.product_variants?.length > 0) {
        selectedProduct?.product_variants?.forEach((variant) => {
          if (variant?.hasperformance) {
            hasPerformance = true;
          }
        });
      }

      if (hasPerformance) {
        const productId = selectedProduct?.product_masterid;
        const performanceData = await getPerformance(productId);

        // Check if we have any performance data
        if (!performanceData || performanceData.length === 0) {
          toast.error("This product is currently not available", {
            position: "top-center",
          });
          onClose();
          setShowBookingSection(false);
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
          setShowBookingSection(false);
          return;
        }

        dispatch(setPerformanceData(formattedData));
        setAvailableDates(allUniqueDates);
      } else {
        setAvailableDates(getAvailableDates(selectedProduct));
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
    setShowBookingSection(true);
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

  console.log(selectedProduct?.product_images?.image_urls, "dgsgasdadjg");

  return (
    <div className="product-modal">
      {!showBookingSection ? (
        <div className="product-modal-content">
          <>
            <div className="product-modal-image">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {selectedProduct?.product_images?.image_urls?.map(
                  (image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`Product ${index + 1}`} />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct?.product_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedProduct?.productdesc,
                }}
                className="product-description-api"
              ></div>

              <div className="price-section">
                <div className="price-details">
                  <h3>
                    {selectedProduct.currency || "AED"}{" "}
                    {defaultVariant(selectedProduct)?.gross}
                  </h3>
                  <p className="tax">
                    {defaultVariant(selectedProduct)?.net_amount} +
                    {defaultVariant(selectedProduct)?.vat}
                    {t("common.netAndTax")}
                  </p>
                </div>
                <div className="vertical-divider"></div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  {t("product.addToCart")}
                </button>
              </div>
            </div>
          </>
        </div>
      ) : (
        <BookingSection
          product={selectedProduct}
          onBack={() => {
            setShowBookingSection(false);
            onClose();
          }}
          availableDates={availableDates}
          isLoadingDates={isLoadingDates}
        />
      )}
    </div>
  );
}
