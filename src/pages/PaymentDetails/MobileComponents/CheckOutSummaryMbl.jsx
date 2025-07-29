import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setCheckout } from "../../../global/checkoutSlice";
import validatePromocode from "../../../serivces/promocode/promocode";
import { toast } from "sonner";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";

function CheckOutSummaryMbl({
  formData,
  setFormData,
  checkout,
  showPromoCode = true,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showItems, setShowItems] = useState(false);
  const [promoCode, setPromoCode] = useState(
    checkout?.coupons?.[0]?.code || ""
  );
  const [promoCodeApplying, setPromoCodeApplying] = useState(false);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Ensure products are loaded for the current language
  useGetProductList();

  const productList = useSelector((state) => state.product.allProducts);
  const { mutate: checkBasket } = useCheckBasket();

  const getProduct = (item) => {
    if (!productList || !item) return { product: null, productVariant: null };

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
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  const handleBasketCheck = (promoCode = "", message = "") => {
    let items = [];
    checkout?.items?.forEach((item) => {
      items.push({
        productId: item?.productId,
        quantity: item?.quantity,
        performance: item?.performances ? item?.performances : [],
        validFrom: item?.validFrom,
        validTo: item?.validTo,
      });
    });

    const data = {
      coupons: promoCode ? [{ couponCode: promoCode }] : [],
      items: items,
      capacityManagement: true,
    };

    checkBasket(data, {
      onSuccess: (res) => {
        if (res?.orderDetails?.error?.code) {
          toast.error(
            res?.orderDetails?.error?.text || t("Something went wrong"),
            {
              position: "top-center",
            }
          );
        } else {
          const orderDetails = res?.orderdetails?.order;
          const items = orderDetails?.items?.map((item) => ({
            productId: item?.productId,
            quantity: item?.quantity,
            performances: item?.performances ? item?.performances : [],
            validFrom: item?.validFrom,
            validTo: item?.validTo,
            productMasterid:
              productList.find((product) =>
                product.product_variants.some(
                  (variant) => variant.productid === item?.productId
                )
              )?.product_masterid || "",
          }));
          dispatch(
            setCheckout({
              coupons: orderDetails?.coupons,
              items: items,
              emailId: checkout?.emailId,
              language: currentLanguage,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
              firstName: checkout?.firstName,
              lastName: checkout?.lastName,
              phoneNumber: checkout?.phoneNumber,
              countryCode: checkout?.countryCode,
              isTnCAgrred: checkout?.isTnCAgrred,
              isConsentAgreed: checkout?.isConsentAgreed,
              promotions: orderDetails?.promotions,
            })
          );
          setPromoCodeApplying(false);
          if (promoCode) {
            toast.success("Promo code applied successfully!");
          } else {
            toast.error(message || "Invalid promo code");
          }
        }
      },
      onError: (err) => {
        console.log(err, "err");
        toast.error(err?.response?.data?.message || t("Something went wrong"), {
          position: "top-center",
        });
        setPromoCodeApplying(false);
      },
    });
  };

  const handlePromoCode = async () => {
    try {
      setPromoCodeApplying(true);
      if (!promoCode) {
        toast.error("Please enter a promo code");
        setPromoCodeApplying(false);
        return;
      }
      const response = await validatePromocode(promoCode);
      if (!response?.data?.coupondetails?.coupon) {
        let message =
          response?.coupondetails?.error?.text || "Invalid promo code";

        handleBasketCheck("", message);
      } else {
        setFormData({ ...formData, promoCode: promoCode });
        handleBasketCheck(response?.data?.coupondetails?.coupon?.code);
      }
    } catch (error) {
      setPromoCodeApplying(false);
      toast.error(error?.message || "Invalid promo code");
    }
  };

  // Calculate totals with fallbacks

  const total = checkout?.grossAmount || 0;

  return (
    <div className="email-checkout__summary">
      {/* Header */}
      <div className="email-checkout__summary-title">
        <h3>{t("orderSummary.title")}</h3>
        <span>
          {checkout?.items?.length || 1} {t("orderSummary.items")}
        </span>
      </div>
      {/* View Items Button */}
      <button
        onClick={() => setShowItems(!showItems)}
        className="email-checkout__summary-viewItems"
        type="button"
      >
        <div className="email-checkout__summary-viewItems-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="email-checkout__summary-viewItems-icon-text">
            {t("orderSummary.viewItems")}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transform: showItems ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {/* Item Details Section */}
      {showItems && (
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
                        Qty: {item.quantity || 0}
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
                        (getProduct(item.productId)?.productVariant?.vat || 0) *
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
      )}

      {/* Cost Breakdown */}
      <div className="email-checkout__summary-costBreakdown">
        <div className="email-checkout__summary-costBreakdown-subTotal">
          <span className="subTotal-Content">
            {t("payment.orderSummary.subTotal")}
          </span>
          <span className="subTotal-Value">
            {t("common.aed")} {checkout?.netAmount}
          </span>
        </div>
        <div className="email-checkout__summary-costBreakdown-vat">
          <span className="vat-Content">{t("orderSummary.vat")}</span>
          <span className="vat-Value">
            + {t("common.aed")} {checkout?.taxAmount}{" "}
          </span>
        </div>
      </div>

      {/* Promo Code Section */}
      {showPromoCode && (
        <div className="email-checkout__summary-promoCode">
          <div className="email-checkout__summary-promoCode-title">
            {t("orderSummary.promoDiscount")}
          </div>
          <div className="email-checkout__summary-promoCode-input-container">
            <input
              type="text"
              placeholder={t("orderSummary.enterPromoCode")}
              className="email-checkout__summary-promoCode-input-container-inputBox"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              className="email-checkout__summary-promoCode-input-container-applyButton"
              type="button"
              onClick={handlePromoCode}
              disabled={promoCodeApplying}
            >
              {promoCodeApplying ? <ButtonLoading /> : t("orderSummary.apply")}
            </button>
          </div>
        </div>
      )}
      {/* Total */}
      <div className="email-checkout__summary-grandTotal">
        <span className="grandTotal-Content">
          {t("payment.orderSummary.total")}
        </span>
        <span className="grandTotal-Value">
          {t("common.aed")} {checkout?.grossAmount}
        </span>
      </div>

      {/* Secure Payment Button */}
      <div className="email-checkout__summary-securePayment">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        {t("orderSummary.securePayment")}
      </div>
    </div>
  );
}

export default CheckOutSummaryMbl;
