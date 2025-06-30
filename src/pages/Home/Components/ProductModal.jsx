import React from "react";
import BookingSection from "./BookingSection";
import Product1 from "../../../assets/images/product1.png";

export default function ProductModal({
  selectedProduct,
  showBookingSection,
  setShowBookingSection,
}) {
  const handleAddToCart = () => {
    setShowBookingSection(true);
  };
  return (
    <>
      {!showBookingSection ? (
        <div className="product-modal-content">
          <>
            <div className="product-modal-image">
              <img src={Product1} alt={selectedProduct.name} />
            </div>
            <div className="product-modal-details">
              <h2>{selectedProduct.name}</h2>
              <p className="description">{selectedProduct.description}</p>

              <div className="price-section">
                <div className="price-details">
                  <h3>
                    {selectedProduct.currency} {selectedProduct.price}
                  </h3>
                  <p className="tax">
                    +{selectedProduct.tax} {selectedProduct.taxDescription}
                  </p>
                </div>
                <div className="vertical-divider"></div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to cart
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
