import React, { useState } from "react";
import { Modal } from "antd";
import ProductCardContent from "./ProductCardContent";
import ProductCardPricetag from "./ProductCardPricetag";
import ProductModal from "./ProductModal";
import closeIcon from "../../../assets/icons/close.svg";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "../../../global/productSlice";

export default function ProductCard({ productList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProductState] = useState(null);
  const [showBookingSection, setShowBookingSection] = useState(false);
  const dispatch = useDispatch();

  const showModal = (product) => {
    // Create a plain object to avoid non-serializable payload issues
    const plainProduct = { ...product };
    setSelectedProductState(plainProduct);
    dispatch(setSelectedProduct(plainProduct));
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(setSelectedProduct({}));
    setShowBookingSection(false);
  };

  const defaultVariant = (product) => { 
    const defaultVariant = product?.product_variants?.find((variant) => variant.isdefault);
    return defaultVariant;
  };

  return (
    <div className="ProductCard">
      <div className="ProductCard__grid">
        {productList?.map((product) => (
          <div className="ProductCard__card" key={product?.product_title}>
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
              price={product?.product_variants?.[0]?.gross}
              tax={(product?.product_variants?.[0]?.gross * 0.05).toFixed(2)}
              currency={product?.currency}
              taxDescription={product?.taxDescription}
              onAddToCart={() => showModal(product)}
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
        className="product-modal"
        centered={true}
        closeIcon={
          <span className="custom-modal-close">
            <img src={closeIcon} alt="close" />
          </span>
        }
      >
        {selectedProduct && (
          <ProductModal
            selectedProduct={selectedProduct}
            onClose={handleCancel}
            showBookingSection={showBookingSection}
            setShowBookingSection={setShowBookingSection}
          />
        )}
      </Modal>
    </div>
  );
}
