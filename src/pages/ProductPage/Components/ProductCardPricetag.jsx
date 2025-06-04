import React from "react";
import AddtoCartbtn from "./AddtoCartbtn";

export default function ProductCardPricetag({
  price,
  tax,
  currency,
  taxDescription,
  onAddToCart,
}) {
  return (
    <div className="ProductCard__card__pricetag">
      <div className="ProductCard__card__pricetag__price">
        <p className="ProductCard__card__pricetag__price__text">
          {currency} {price}
        </p>
        <p className="ProductCard__card__pricetag__price__tax">
          +{tax} {taxDescription}
        </p>
      </div>
      <AddtoCartbtn onClick={onAddToCart} />
    </div>
  );
}
