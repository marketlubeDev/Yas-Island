import React from "react";

import product1 from "../../../assets/images/product1.png";

export default function ProductSoloThumbnail() {
  const product = {
    image: product1,
    name: "Product 1",
  };
  return (
    <div className="product-solo-thumbnail">
      <div className="product-solo-thumbnail__image">
        <img src={product.image} alt={product.name} />
      </div>
    </div>
  );
}
