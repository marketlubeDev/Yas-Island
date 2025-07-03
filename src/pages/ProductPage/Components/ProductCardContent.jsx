import React from "react";

export default function ProductCardContent({ name, description }) {
  const truncatedDescription =
    description?.length > 100 ? `${description.slice(0, 55)}...` : description;

  return (
    <div className="ProductCard__card__content">
      <div
        className="ProductCard__card__content__title"
        dangerouslySetInnerHTML={{ __html: name }}
      ></div>
      <p className="ProductCard__card__content__description">
        {truncatedDescription}
      </p>
      <div className="ProductCard__card__content__divider"></div>
    </div>
  );
}
