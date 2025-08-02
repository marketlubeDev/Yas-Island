import React, { useEffect, useState } from "react";
import BookingSection from "./BookingSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndDate,
  setProductId,
  setStartDate,
} from "../../../global/performanceSlice";

export default function ProductModal({
  selectedProduct,
  showBookingSection,
  setShowBookingSection,
  onClose,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Get current language for RTL support
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const isRTL = currentLanguage === "ar";
  const [swiperKey, setSwiperKey] = useState(0);

  // Reset scroll position when new product is opened
  useEffect(() => {
    const resetScroll = () => {
      const productDescriptionElement = document.querySelector(
        ".product-description-api"
      );
      if (productDescriptionElement) {
        productDescriptionElement.scrollTop = 0;
        productDescriptionElement.scrollLeft = 0;
        productDescriptionElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    };

    resetScroll();

    const timeoutId = setTimeout(resetScroll, 10);

    return () => clearTimeout(timeoutId);
  }, [selectedProduct]);

  useEffect(() => {
    setSwiperKey((prev) => prev + 1);

    // Small delay to ensure proper re-rendering
    const timeoutId = setTimeout(() => {
      // Trigger any additional layout updates if needed
      if (window.dispatchEvent) {
        window.dispatchEvent(new Event("resize"));
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentLanguage]);

  useEffect(() => {
    if (selectedProduct && Object.keys(selectedProduct).length > 0) {
      // 1. Calculate startDate
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date

      const offset = selectedProduct.sale_date_offset || 0;
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + offset);

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

      dispatch(setStartDate(startDate.toDateString()));
      dispatch(setEndDate(endDate.toDateString()));
      dispatch(setProductId(selectedProduct?.default_variant_id));
    }
  }, [selectedProduct, dispatch]);

  const handleAddToCart = () => {
    setShowBookingSection(true);
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
                dir={isRTL ? "rtl" : "ltr"}
                key={`swiper-${swiperKey}-${currentLanguage}`}
                onSwiper={(swiper) => {
                  // Ensure proper initialization after language change
                  setTimeout(() => {
                    if (swiper && swiper.update) {
                      swiper.update();
                    }
                  }, 50);
                }}
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
        />
      )}
    </div>
  );
}
