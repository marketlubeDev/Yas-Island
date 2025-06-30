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
import Loading from "../../../components/Loading/Loading";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      // 1. Calculate startDate
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const offset = selectedProduct.sale_date_offset || 0;
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + offset);
      setValidStartDate(startDate);

      console.log(startDate, "startDate>>>>");

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

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const performanceData = await getPerformance(
        formatDate(validStartDate),
        formatDate(validEndDate),
        selectedProduct?.default_variant_id
      );

      if (performanceData && performanceData.performance) {
        dispatch(setPerformanceData(performanceData.performance));
        const dates = performanceData.performance.map((p) => p.date);
        setAvailableDates(dates);
      }
      setShowBookingSection(true);
    } catch (error) {
      console.log(error, "error");
      if(error.status === 404){
        setAvailableDates([]); //if no availability set all dates of this year as available
        const today = new Date();
        const startDate = selectedProduct.sale_date_offset || 0; // default to 0 if undefined
        today.setDate(today.getDate() + startDate);
        let endDate;

        if(selectedProduct.calendar_range_days && selectedProduct.calendar_end_date){
          const rangeEndDate = new Date(today);
          rangeEndDate.setDate(today.getDate() + selectedProduct.calendar_range_days);
          const calendarEndDate = new Date(selectedProduct.calendar_end_date);
          endDate = new Date(Math.min(calendarEndDate.getTime(), rangeEndDate.getTime()));
        } else if(selectedProduct.calendar_range_days){
          endDate = new Date(today);
          endDate.setDate(today.getDate() + selectedProduct.calendar_range_days);
        } else if(selectedProduct.calendar_end_date){
          endDate = new Date(selectedProduct.calendar_end_date);
        } else {
          endDate = new Date(today.getFullYear(), 11, 31); // Last day of current year
        }

        const dates = [];
        let currentDate = new Date(today);
        
        while(currentDate <= endDate) {
          dates.push(currentDate.toISOString().split('T')[0]);
          currentDate = new Date(currentDate);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setAvailableDates(dates);
      }
      setShowBookingSection(true);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultVariant = (product) => {
    const defaultVariant = product?.product_variants?.find(
      (variant) => variant.isdefault
    );
    return defaultVariant;
  };

  return (
    <>
      {!showBookingSection ? (
        <div className="product-modal-content">
          <>
            <div className="product-modal-image">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                spaceBetween={10}
                slidesPerView={1}
              >
                {selectedProduct?.product_images?.image_urls?.map(
                  (img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} alt={selectedProduct.name} />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct?.product_title}</h2>
              {/* <p className="description">{selectedProduct.description}</p> */}
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
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : t("product.addToCart")}
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
          startDate={validStartDate}
          endDate={validEndDate}
          availableDates={availableDates}
        />
      )}
    </>
  );
}
