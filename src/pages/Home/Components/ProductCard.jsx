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

export default function ProductCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const product = [
    {
      image: Product1,
      name: "Driving Experience",
      description:
        "Drive your dream car with a Ferrari-trained instructor and experience the thrill of high-performance driving on a professional race track.",
      price: 100,
      tax: +96.43,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product2,
      name: "Roof Walk Experience",
      description:
        "Experience the thrill of dune bashing, camel riding, and a traditional Bedouin dinner under the stars in the Arabian desert.",
      price: 150,
      tax: +144.65,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product3,
      name: "4 Yas Island Theme Parks",
      description:
        "Enjoy a luxury yacht cruise along the coastline with stunning views, water activities, and gourmet refreshments.",
      price: 300,
      tax: +289.29,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product4,
      name: "1 Day Yas Waterworld Ya...",
      description:
        "Take in breathtaking aerial views of the city's landmarks during an exclusive helicopter sightseeing tour.",
      price: 500,
      tax: +482.15,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product5,
      name: "3 Yas Island Theme Parks",
      description:
        "Indulge in a full-day spa retreat featuring luxury treatments, massage therapy, and wellness activities.",
      price: 250,
      tax: +241.07,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product6,
      name: "2 Yas Island Theme Parks",
      description:
        "Learn to prepare authentic local cuisine with expert chefs in a professional kitchen setting.",
      price: 180,
      tax: +173.57,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product7,
      name: "1 Day Warner Bros. Wor...",
      description:
        "Experience the ultimate adrenaline rush with a tandem skydiving jump over spectacular landscapes.",
      price: 450,
      tax: +433.93,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product8,
      name: "1 Day Seaworld Yas Isla...",
      description:
        "Enjoy a round of golf at a championship course with professional instruction and premium equipment rental.",
      price: 200,
      tax: +192.86,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product9,
      name: "1 Day Ferrari World Yas....",
      description:
        "Discover local heritage with guided visits to historical sites, museums, and traditional markets.",
      price: 120,
      tax: +115.71,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
    {
      image: Product10,
      name: "VIP Experience",
      description:
        "Discover local heritage with guided visits to historical sites, museums, and traditional markets.",
      price: 120,
      tax: +115.71,
      taxDescription: "VAT & tax",
      currency: "AED",
    },
  ];

  return (
    <div className="ProductCard">
      <div className="ProductCard__grid">
        {product.map((product) => (
          <div className="ProductCard__card" key={product.name}>
            <div className="ProductCard__card__image">
              <img src={product.image} alt={product.name} />
            </div>
            <ProductCardContent
              name={product.name}
              description={product.description}
            />
            <ProductCardPricetag
              price={product.price}
              tax={product.tax}
              currency={product.currency}
              taxDescription={product.taxDescription}
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
          />
        )}
      </Modal>
    </div>
  );
}
