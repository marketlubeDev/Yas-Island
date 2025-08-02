import React, { useState } from "react";
import { Modal } from "antd";
import ProductCardContent from "./ProductCardContent";
import ProductCardPricetag from "./ProductCardPricetag";
import ProductModal from "./ProductModal";
import closeIcon from "../../../assets/icons/close.svg";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../global/productSlice";
import { clearPerformance } from "../../../global/performanceSlice";
import BookingSection from "./BookingSection";

export default function ProductCard({ productList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProductState] = useState(null);
  const [showBookingSection, setShowBookingSection] = useState(false);
  const dispatch = useDispatch();

  const showModal = (product, type = "view") => {
    // Create a plain object to avoid non-serializable payload issues
    const plainProduct = { ...product };
    setSelectedProductState(plainProduct);
    dispatch(setSelectedProduct(plainProduct));
    setIsModalOpen(true);
    if (type === "add-to-cart") {
      setShowBookingSection(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(clearPerformance());
    setShowBookingSection(false);
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
    <div className="ProductCard">
      <div className="ProductCard__grid">
        {productList?.map((product, index) => (
          <div
            className="ProductCard__card animate-fade-in-up"
            key={`${product?.product_title}-${index}`}
            style={{
              animationDelay: `${index * 0.1}s`,
              opacity: 0,
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
            }}
            onClick={() => showModal(product)}
          >
            {/* <span>{index}</span> */}
            <div className="ProductCard__card__image">
              <img
                src={product?.product_images?.thumbnail_url}
                alt={product?.product_title}
              />
            </div>
            <ProductCardContent
              name={product?.product_title}
              description={product?.productshortdesc}
            />
            <ProductCardPricetag
              price={defaultVariant(product)?.gross}
              tax={(defaultVariant(product)?.gross * 0.05).toFixed(2)}
              currency={product?.currency}
              taxDescription={product?.taxDescription}
              onAddToCart={() => showModal(product, "add-to-cart")}
              netPrice={defaultVariant(product)?.net_amount}
            />
          </div>
        ))}
      </div>

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="85%"
        className={`product-modal ${
          showBookingSection ? "booking-active" : ""
        }`}
        centered={true}
        closeIcon={
          <span className="custom-modal-close">
            <img src={closeIcon} alt="close" />
          </span>
        }
      >
        {selectedProduct && !showBookingSection && (
          <ProductModal
            selectedProduct={selectedProduct}
            onClose={handleCancel}
            showBookingSection={showBookingSection}
            setShowBookingSection={setShowBookingSection}
          />
        )}
        {selectedProduct && showBookingSection && (
          <BookingSection
            product={selectedProduct}
            onBack={() => {
              setShowBookingSection(false);
              handleCancel();
            }}
          />
        )}
      </Modal>
    </div>
  );
}
