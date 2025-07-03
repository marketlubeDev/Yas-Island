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


function getAvailableDates(product){
  const today = new Date();
  const startDate = product?.sale_date_offset || 0;
  today.setDate(today.getDate() + startDate);
  let endDate;

  if(product?.calendar_range_days && product?.calendar_end_date){
    const rangeEndDate = new Date(today);
    rangeEndDate.setDate(today.getDate() + product?.calendar_range_days);
    const calendarEndDate = new Date(product?.calendar_end_date);
    endDate = new Date(Math.min(calendarEndDate.getTime(), rangeEndDate.getTime()));
  } else if(product?.calendar_range_days){
    endDate = new Date(today);
    endDate.setDate(today.getDate() + product?.calendar_range_days);
  } else if(product?.calendar_end_date){
    endDate = new Date(product?.calendar_end_date);
  } else {
    endDate = new Date(today.getFullYear(), 11, 31);
  }

  const dates = [];
  let currentDate = new Date(today);
  
  while(currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate = new Date(currentDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

  const fetchAvailableDates = async () => {
    setIsLoadingDates(true);    
    try {
    
      let hasPerformance = false;

      if(selectedProduct?.product_variants?.length > 0){
        selectedProduct?.product_variants?.forEach((variant) => {
          if(variant?.hasperformance){
            hasPerformance = true;
          }
        });
      }

      if(hasPerformance){
        const productId = selectedProduct?.default_variant_id || selectedProduct?.product_variants[0]?.productid
        const performanceData = await getPerformance(
          formatDate(validStartDate),
          formatDate(validEndDate),
          productId
        );
  
        if (performanceData && performanceData.performance) {
          dispatch(setPerformanceData(performanceData.performance));
          const dates = performanceData.performance.map((p) => p.date);
          setAvailableDates(dates);
        }
      } else {
        setAvailableDates(getAvailableDates(selectedProduct));
      }


    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong")
      // if it is error then close all modals
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
    const defaultVariant = product?.product_variants?.find((variant) => variant.isdefault);
    return defaultVariant;
  };

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
                {selectedProduct?.product_images?.image_urls?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Product ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct?.product_title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedProduct?.productdesc,
                }}
                style={{ height: "35vh", overflowY: "auto" }}
              ></div>

              <div className="price-section">
                <div className="price-details">
                  <h3>
                    {selectedProduct.currency || "AED"}{" "}
                    {defaultVariant(selectedProduct)?.gross}
                  </h3>
                  <p className="tax">
                    {defaultVariant(selectedProduct)?.net_amount} +
                    {(defaultVariant(selectedProduct)?.gross * 0.05).toFixed(2)}{" "}
                    {"Net & Tax"}
                  </p>
                </div>
                <div className="vertical-divider"></div>
                <button
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
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
            setShowBookingSection(false)
            onClose()
          }}
          availableDates={availableDates}
          isLoadingDates={isLoadingDates}
        />
      )}
    </div>
  );
}
