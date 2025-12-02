import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useGetProductList from "../../../apiHooks/product/product";
import { HiOutlinePercentBadge } from "react-icons/hi2";

export default function OrderSummary({ checkout }) {
  const { t } = useTranslation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  console.log(checkout, "checkoutordersummaryFailed");
  // Ensure products are loaded for the current language
  useGetProductList();

  const productList = useSelector((state) => state.product.allProducts);

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
                      {item.discount < 0 && (
                        <span
                          className="item-discount"
                          style={{
                            marginTop: "4px",
                            fontSize: "12px",
                            color: "#28a745",
                            backgroundColor: "#e6f4ea",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontWeight: "500",
                          }}
                        >
                          {t("orderSummary.discount")}: {item.discount}
                        </span>
                      )}
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
        {/* Coupon Applied Indicator - show if any promotion with discount exists */}
        {checkout?.promotions
          ?.filter((promotion) => promotion?.discount)
          .map((promotion, index) => (
            <div
              key={promotion?.code || index}
              className="email-checkout__summary-couponApplied"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  padding: "6px",
                  backgroundColor: "var(--color-base-bg)",
                  border: "1px solid #e9ecef",
                  borderRadius: "6px",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <HiOutlinePercentBadge
                      className="coupon-badge-icon"
                      style={{
                        fontSize: "calc(24px * var(--zoom-scale))",
                        width: "calc(24px * var(--zoom-scale))",
                        height: "calc(24px * var(--zoom-scale))",
                        fontWeight: "bold",
                      }}
                      strokeWidth={2}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--color-summary-title)",
                        fontSize: "calc(14px * var(--zoom-scale))",
                        fontWeight: "200",
                      }}
                    >
                      {t("orderSummary.couponApplied")}{" "}
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        {checkout?.coupons?.[index]?.code || promotion?.code}
                      </span>
                    </p>
                    <p
                      style={{
                        color: "#28a745",
                        fontSize: "calc(12px * var(--zoom-scale))",
                      }}
                    >
                      <span style={{ fontWeight: "200" }}>
                        {t("orderSummary.couponSavings")}{" "}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {t("common.aed")}{" "}
                        {promotion?.discount?.toString().replace("-", "")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
