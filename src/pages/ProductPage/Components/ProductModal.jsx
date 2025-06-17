import React, { useState } from "react";
import BookingSection from "./BookingSection";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import 'swiper/css';
import "swiper/css/pagination";





export default function ProductModal({
  selectedProduct,
  showBookingSection,
  setShowBookingSection,
}) {
  const { t } = useTranslation();

  const handleAddToCart = () => {
    setShowBookingSection(true);
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
                {selectedProduct?.product_images?.image_urls?.map((img, idx) => ( 
                  <SwiperSlide key={idx}>
                    <img src={img} alt={selectedProduct.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct.name}</h2>
              {/* <p className="description">{selectedProduct.description}</p> */}
              <div dangerouslySetInnerHTML={{ __html: selectedProduct?.productdesc}} style={{height:"50vh" , overflowY:"auto"}}></div>

              <div className="price-section">
                <div className="price-details">
                  <h3>
                    {selectedProduct.currency || "AED"} {selectedProduct?.product_variants?.[0]?.gross}
                  </h3>
                  <p className="tax">
                    +{(selectedProduct?.product_variants?.[0]?.gross * 0.05).toFixed(2)} {selectedProduct?.taxDescription || "Tax"}
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
          onBack={() => setShowBookingSection(false)}
        />
      )}
    </>
  );
}
