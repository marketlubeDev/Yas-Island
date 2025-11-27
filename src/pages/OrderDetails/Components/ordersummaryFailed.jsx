import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";

export default function OrderSummary({ checkout }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Ensure products are loaded for the current language
  useGetProductList();

  const productList = useSelector((state) => state.product.allProducts);
  const { mutate: checkBasket } = useCheckBasket();

  const getProduct = (item) => {
    const product = productList.find((product) =>
      product.product_variants.some((variant) => variant.productid === item)
    );

    const productVariant = product?.product_variants.find(
      (variant) => variant.productid === item
    );
    return {
      product,
      productVariant,
    };
  };

  const formatDate = (dateString) => {
    // Use the appropriate locale based on current language
    const locale = currentLanguage === "ar" ? "ar-AE" : "en-US";

    const date = new Date(dateString).toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return date;
  };

  const roundToTwoDecimals = (value) => {
    const num = Number(value) || 0;
    return Math.round(num * 100) / 100;
  };

  return (
    <div className="order-summary-new">
      {/* Header - Mobile Style */}
      <div className="email-checkout__summary-title">
        <h3>{t("orderSummary.title")}</h3>
        <span>
          {checkout?.items?.length || 1} {t("orderSummary.items")}
        </span>
      </div>
      {/* Scrollable content wrapper with fadeout effect */}
      <div className="order-summary-scrollable-wrapper">
        <div className="order-summary-scrollable ">
          {/* Items are always visible; removed toggle button */}
          {/* Item Details Section - Mobile Style */}
          <div className="items-container">
            {checkout?.items && checkout.items.length > 0 ? (
              checkout.items.map((item, index) => (
                <div key={index} className="order-item-minimal">
                  <div className="item-content">
                    <div className="item-main">
                      <h4 className="item-title">
                        {getProduct(item.productId)?.product?.product_title ||
                          "Product"}
                      </h4>
                      <div className="item-meta">
                        <span className="item-variant">
                          {getProduct(item.productId)?.productVariant
                            ?.productvariantname || "Variant"}
                        </span>
                        <span className="item-separator">•</span>
                        <span className="item-date">
                          {formatDate(item.validFrom)}
                        </span>
                        <span className="item-separator">•</span>
                        <span className="item-quantity">
                          {t("payment.orderSummary.qty")} {item.quantity || 0}
                        </span>
                      </div>
                    </div>
                    <div className="item-price">
                      <span className="price-amount">
                        {t("common.aed")}{" "}
                        {(
                          (getProduct(item.productId)?.productVariant
                            ?.net_amount || 0) *
                            (item.quantity || 0) +
                          (getProduct(item.productId)?.productVariant?.vat ||
                            0) *
                            (item.quantity || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="order-item-minimal">
                <div className="item-content">
                  <div className="item-main">
                    <h4 className="item-title">No items in cart</h4>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* End of scrollable content */}
      </div>{" "}
      {/* End of scrollable wrapper */}
      {/* Sticky bottom section */}
      <div className="order-summary-sticky-bottom">
        {/* Total - Mobile Style */}
        <div className="email-checkout__summary-grandTotal">
          <span className="email-checkout__summary-grandTotal-Content">
            {t("orderSummary.total")}
          </span>
          <span className="email-checkout__summary-grandTotal-Value">
            {t("common.aed")} {(checkout?.grossAmount || 0).toFixed(2)}
          </span>
        </div>
      </div>{" "}
      {/* End of sticky bottom section */}
    </div>
  );
}
