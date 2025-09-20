import React from "react";

export default function ProductCardContent({ name, description }) {
  return (
    <div className="ProductCard__card__content">
      <div
        className="ProductCard__card__content__title"
        dangerouslySetInnerHTML={{ __html: name }}
      ></div>
      <p className="ProductCard__card__content__description">{description}</p>
      <div className="ProductCard__card__content__divider"></div>
    </div>
  );
}
