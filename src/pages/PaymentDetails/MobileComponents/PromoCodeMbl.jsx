import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import closeIcon from "../../../assets/icons/close.svg";
import closeIconInverter from "../../../assets/icons/closeinverter.svg";
import { setCheckout } from "../../../global/checkoutSlice";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import { toast } from "sonner";

function PromoCodeMbl({ onClose }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const checkout = useSelector((state) => state.checkout);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const { mutate: checkBasket } = useCheckBasket();

  const toArabicNumeral = (num) => {
    if (i18n.language === "ar") {
      const arabicNumerals = [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩",
        ".",
      ];
      return num
        .toString()
        .split("")
        .map((digit) =>
          digit === "." ? "." : arabicNumerals[parseInt(digit, 10)]
        )
        .join("");
    }
    return num;
  };

  const handleRemovePromoCode = () => {
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
      coupons: [], // Remove coupon by sending empty array
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
            productMasterid: item?.productMasterid || "",
          }));

          dispatch(
            setCheckout({
              ...checkout,
              coupons: orderDetails?.coupons || [],
              items: items,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              // Reset originalNetAmount when coupon is removed
              originalNetAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
              promotions: orderDetails?.promotions || [],
            })
          );

          toast.success(t("orderSummary.promoCodeRemoved"), {});
          onClose(); // Close the popup after removing
        }
      },
      onError: (err) => {
        console.log(err, "err");
        toast.error(err?.response?.data?.message || t("Something went wrong"), {
          position: "top-center",
        });
      },
    });
  };

  return (
    <div className="promo-popup-overlay">
      <div className="promo-popup-card">
        <span className="promo-popup-custom-close" onClick={onClose}>
          <img src={isDarkMode ? closeIconInverter : closeIcon} alt="close" />
        </span>
        <div className="promo-popup-title">{t("promo.applied")}</div>
        <div className="promo-popup-amount">
          {t("promo.amount")}{" "}
          {toArabicNumeral(checkout?.promotions?.[0]?.discount || "0.00")}
        </div>
        <div className="promo-popup-saved">{t("promo.saved")}</div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row">
          <span>{t("payment.orderSummary.subTotal")}</span>
          <span>
            {t("common.aed")}{" "}
            {toArabicNumeral(
              (checkout?.originalNetAmount || checkout?.netAmount || 0).toFixed(
                2
              )
            )}
          </span>
        </div>
        <div className="promo-popup-row">
          <span>{t("payment.orderSummary.vatAndTax")}</span>
          <span>
            + {t("common.aed")}{" "}
            {toArabicNumeral((checkout?.taxAmount || 0).toFixed(2))}
          </span>
        </div>
        <div className="promo-popup-row">
          <span>{t("promo.savings")}</span>
          <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {checkout?.promotions?.[0]?.discount}
            <button
              onClick={handleRemovePromoCode}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                color: "#dc3545",
                fontSize: "12px",
              }}
              title={t("orderSummary.removePromoCode")}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </span>
        </div>
        <hr className="promo-popup-divider" />
        <div className="promo-popup-row promo-popup-row--total">
          <span>{t("payment.orderSummary.total")}</span>
          <span>
            {t("common.aed")}{" "}
            {toArabicNumeral((checkout?.grossAmount || 0).toFixed(2))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PromoCodeMbl;
