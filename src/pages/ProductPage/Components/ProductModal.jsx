import React, { useState } from "react";
import BookingSection from "./BookingSection";
import Product1 from "../../../assets/images/product1.png";

import { useTranslation } from "react-i18next";

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
              <img src={selectedProduct?.product_images?.image_urls?.[0]} alt={selectedProduct.name} />
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct.name}</h2>
              {/* <p className="description">{selectedProduct.description}</p> */}
              <div dangerouslySetInnerHTML={{ __html: selectedProduct?.productdesc}} style={{height:"40vh" , overflowY:"auto"}}></div>

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
