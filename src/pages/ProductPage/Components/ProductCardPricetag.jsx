import React from "react";
import AddtoCartbtn from "./AddtoCartbtn";

export default function ProductCardPricetag({
  price,
  tax,
  currency = "AED",
  taxDescription = "Net & Tax",
  onAddToCart,
  netPrice,
}) {
  return (
    <div className="ProductCard__card__pricetag">
      <div className="ProductCard__card__pricetag__price">
        <p className="ProductCard__card__pricetag__price__text">
          {currency} {price}
        </p>
        <p className="ProductCard__card__pricetag__price__tax">
          {netPrice}+{tax} {taxDescription}
        </p>
      </div>
      <AddtoCartbtn onClick={onAddToCart} />
    </div>
  );
}
