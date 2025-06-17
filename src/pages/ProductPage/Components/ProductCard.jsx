import React, { useState } from "react";
import { Modal } from "antd";
import Product1 from "../../../assets/images/product1.png";
import Product2 from "../../../assets/images/product2.png";
import Product3 from "../../../assets/images/product3.png";
import Product4 from "../../../assets/images/product4.png";
import Product5 from "../../../assets/images/product5.png";
import Product6 from "../../../assets/images/product6.png";
import Product7 from "../../../assets/images/product7.png";
import Product8 from "../../../assets/images/product8.png";
import Product9 from "../../../assets/images/product9.png";
import Product10 from "../../../assets/images/product10.png";
import ProductCardContent from "./ProductCardContent";
import ProductCardPricetag from "./ProductCardPricetag";
import ProductModal from "./ProductModal";
import closeIcon from "../../../assets/icons/close.svg";

export default function ProductCard({ productList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBookingSection, setShowBookingSection] = useState(false);

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setShowBookingSection(false);
  };

  return (
    <div className="ProductCard">
      <div className="ProductCard__grid">
        {productList?.map((product) => (
          <div className="ProductCard__card" key={product?.product_title}>
            <div className="ProductCard__card__image">
              <img src={product?.product_images?.thumbnail_url} alt={product?.product?.product_title} />
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
        header={null}
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
