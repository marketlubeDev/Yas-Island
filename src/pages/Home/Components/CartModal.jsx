import React, { useEffect, useState } from "react";
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Expand from "../../../assets/icons/shrink.svg";
import ExpandDark from "../../../assets/icons/invertShrink.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import InvertDeleteIcon from "../../../assets/icons/invertdelete.svg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../../../global/cartSlice";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import useGetProductList from "../../../apiHooks/product/product";
import Loading from "../../../components/Loading/ButtonLoading";
import { setCheckout, setCheckoutEmail } from "../../../global/checkoutSlice";
import { toast } from "sonner";
import { basketService } from "../../../serivces/basket/checkBasket";

// Helper function to check if a date is expired
const isDateExpired = (validToDate) => {
  if (!validToDate) return false;

  try {
    // Convert both dates to UTC to ensure consistent comparison
    const validTo = new Date(validToDate);
    const now = new Date();

    // Reset both dates to start of day in UTC
    const validToUTC = Date.UTC(
      validTo.getUTCFullYear(),
      validTo.getUTCMonth(),
      validTo.getUTCDate()
    );
    const nowUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    return validToUTC < nowUTC;
  } catch (error) {
    console.error("Error comparing dates:", error);
    return false;
  }
};

const CartModal = ({ isOpen, onClose }) => {
  const language = useSelector((state) => state.language.currentLanguage);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { isBigTablets, isDesktop } = useSelector((state) => state.responsive);

  // Ensure products are loaded for the current language
  useGetProductList();

  const {
    cartItems,
    subtotal,
    vatAndTax,
    total,
    isEmailVerification,
    verificationEmail,
  } = useSelector((state) => state.cart);
  const { mutate: checkBasket, isPending } = useCheckBasket();
  const productList = useSelector((state) => state.product.allProducts);

  const handleCheckout = () => {
    if (!isEmailVerification) {
      navigate("/email-verification");
    } else {
      dispatch(setCheckoutEmail(verificationEmail));
      navigate("/payment-details", {
        state: {
          isCheckout: true,
        },
      });
    }
    onClose();
  };

  // const handleSaveCart = () => {
  //   onClose();
  // };

  const handleQuantityChange = (
    id,
    change,
    validFrom,
    minQuantity,
    maxQuantity,
    incrementNumber = 1
  ) => {
    const item = cartItems.find(
      (item) => item.productId === id && item.validFrom === validFrom
    );
    if (!item) return;

    // Calculate the actual change amount based on increment number
    const actualChange = change > 0 ? incrementNumber : -incrementNumber;

    // Calculate new quantity respecting min and max bounds
    const newQuantity = Math.max(
      minQuantity,
      Math.min(maxQuantity, item.quantity + actualChange)
    );

    dispatch(updateQuantity({ id, quantity: newQuantity, validFrom }));
  };

  const handleDeleteItem = (id, validFrom) => {
    dispatch(removeItemFromCart({ id, validFrom }));
  };

  const handleBasketCheck = (onSuccess) => {
    let items = [];
    cartItems?.forEach((item) => {
      items.push({
        productId: item?.productId,
        quantity: item?.quantity,
        performance: item?.performances
          ? [{ performanceId: item?.performances }]
          : [],
        validFrom: item?.validFrom,
        validTo: item?.validTo,
      });
    });

    const data = {
      coupons: [],
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
              coupons: [],
              items: items,
              emailId: "",
              language: language,
              grossAmount: orderDetails?.total?.gross,
              netAmount: orderDetails?.total?.net,
              taxAmount: orderDetails?.total?.tax,
              originalNetAmount: orderDetails?.total?.gross,
              firstName: "",
              lastName: "",
              phoneNumber: "",
              countryCode: "",
              isTnCAgrred: false,
              isConsentAgreed: false,
              promoCode: "",
              promotions: [],
            })
          );
          onSuccess();
        }
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || t("Something went wrong"), {
          position: "top-center",
        });
      },
    });
  };

  // CartModal Skeleton Component
  const CartModalSkeleton = () => (
    <div className="cart-content">
      <div className="cart-header">
        <div
          className="skeleton-shimmer"
          style={{
            height: "24px",
            width: "120px",
            borderRadius: "6px",
          }}
        ></div>
        <div
          className="skeleton-shimmer"
          style={{
            height: "32px",
            width: "32px",
            borderRadius: "50%",
          }}
        ></div>
      </div>

      <div className="cart-items">
        {[1, 2, 3].map((index) => (
          <div key={index} className="cart-item">
            <div
              className="skeleton-shimmer"
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "8px",
              }}
            ></div>
            <div className="item-details" style={{ flex: 1 }}>
              <div
                className="skeleton-shimmer"
                style={{
                  height: "16px",
                  width: "80%",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              ></div>
              <div
                className="skeleton-shimmer"
                style={{
                  height: "14px",
                  width: "60%",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              ></div>
              <div
                className="skeleton-shimmer"
                style={{
                  height: "12px",
                  width: "40%",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
            <div className="quantity-controls">
              <div
                className="skeleton-shimmer"
                style={{
                  height: "14px",
                  width: "60px",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              ></div>
              <div className="controls">
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "6px",
                  }}
                ></div>
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "20px",
                    width: "30px",
                    borderRadius: "4px",
                  }}
                ></div>
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "6px",
                  }}
                ></div>
                <div
                  className="skeleton-shimmer"
                  style={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "6px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="subtotal">
          <div className="summary-row">
            <div
              className="skeleton-shimmer"
              style={{
                height: "16px",
                width: "80px",
                borderRadius: "4px",
              }}
            ></div>
            <div
              className="skeleton-shimmer"
              style={{
                height: "16px",
                width: "60px",
                borderRadius: "4px",
              }}
            ></div>
          </div>
          <div className="summary-row">
            <div
              className="skeleton-shimmer"
              style={{
                height: "16px",
                width: "60px",
                borderRadius: "4px",
              }}
            ></div>
            <div
              className="skeleton-shimmer"
              style={{
                height: "16px",
                width: "80px",
                borderRadius: "4px",
              }}
            ></div>
          </div>
        </div>
        <div className="custom-divider"></div>
        <div className="total">
          <div
            className="skeleton-shimmer"
            style={{
              height: "20px",
              width: "100px",
              borderRadius: "4px",
            }}
          ></div>
          <div
            className="skeleton-shimmer"
            style={{
              height: "20px",
              width: "80px",
              borderRadius: "4px",
            }}
          ></div>
        </div>

        <div className="cart-actions">
          <div
            className="skeleton-shimmer"
            style={{
              height: "48px",
              width: "100%",
              borderRadius: "8px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <Drawer
      title={null}
      placement={isRTL ? "left" : "right"}
      onClose={onClose}
      open={isOpen}
      width={isBigTablets ? "60%" : isDesktop ? "45%" : "35%"}
      className="cart-drawer"
      closeIcon={null}
      headerStyle={{ display: "none" }}
    >
      <div className="cart-content">
        <div className="cart-header">
          <h2>{t("cart.title")}</h2>
          <button
            className="expand-icon"
            onClick={onClose}
            style={{
              height: isDarkMode ? "1.5rem" : "2.5rem",
              width: isDarkMode ? "1.5rem" : "2.5rem",
            }}
          >
            <img
              src={isDarkMode ? ExpandDark : Expand}
              alt={t("cart.expand")}
            />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>{t("cart.empty")}</h3>
            <p>{t("cart.emptyMessage")}</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => {
                const product = productList.find((product) =>
                  product.product_variants.some(
                    (variant) => variant.productid === item.productId
                  )
                );

                const productData = product
                  ? {
                      ...product,
                      selectedVariant: {
                        ...product.product_variants.find(
                          (variant) => variant.productid === item.productId
                        ),
                        quantity: item.quantity,
                        date: item.date,
                        time: item.time,
                        cartItemId: item.id,
                        ...item, // include any other cart item properties
                      },
                    }
                  : null;

                const isExpired = isDateExpired(item?.validTo);

                return (
                  <div
                    key={index}
                    className={`cart-item ${isExpired ? "expired-item" : ""}`}
                  >
                    <img
                      src={productData?.product_images?.thumbnail_url}
                      alt={productData?.product_title}
                    />
                    <div className="item-details">
                      <h4>{productData?.product_title}</h4>
                      <p>
                        {t("common.aed")}{" "}
                        {productData?.selectedVariant?.net_amount} +
                        <span
                          className="text-[0.7rem] font-normal"
                          style={{ color: "var(--cart-item-date)" }}
                        >
                          {" "}
                          {productData?.selectedVariant?.vat}{" "}
                          {t("common.netAndTax")}
                        </span>
                      </p>
                      <div className="validity-date" style={{}}>
                        <span>{item?.validFrom}</span>
                        {/* {t("common.validFrom")} <span>{item?.validFrom}</span> {t("common.to")}{" "}
                        <span>{item?.validTo}</span> */}
                      </div>
                      {isExpired && (
                        <p className="expired-text">
                          {t("common.thisTicketIsExpired")}
                        </p>
                      )}
                    </div>
                    <div className="quantity-controls">
                      <span>
                        {productData?.selectedVariant?.productvariantname}
                      </span>
                      <div className="controls">
                        <Button
                          className="minus-btn-web"
                          icon={<MinusOutlined />}
                          disabled={isExpired}
                          onClick={() =>
                            !isExpired &&
                            handleQuantityChange(
                              item?.productId,
                              -1,
                              item?.validFrom,
                              item?.minQuantity,
                              item?.maxQuantity,
                              item?.incrementNumber
                            )
                          }
                        />
                        <span>{item?.quantity}</span>
                        <Button
                          className="plus-btn-web"
                          icon={<PlusOutlined />}
                          disabled={isExpired}
                          onClick={() =>
                            !isExpired &&
                            handleQuantityChange(
                              item?.productId,
                              1,
                              item?.validFrom,
                              item?.minQuantity,
                              item?.maxQuantity,
                              item?.incrementNumber
                            )
                          }
                        />
                        <Button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteItem(item?.productId, item?.validFrom)
                          }
                        >
                          <img
                            src={isDarkMode ? InvertDeleteIcon : DeleteIcon}
                            alt={t("cart.delete")}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="subtotal">
                <div className="summary-row">
                  <span>{t("cart.subTotal")}</span>
                  <span>
                    {t("common.aed")} {subtotal?.toFixed(2)}
                  </span>
                </div>
                <div className="summary-row">
                  <span>{t("cart.vat")}</span>
                  <span>
                    + {t("common.aed")} {vatAndTax?.toFixed(2)} {t("cart.vat")}
                  </span>
                </div>
              </div>
              <div className="custom-divider"></div>
              <div className="total">
                <span>{t("cart.total")}</span>
                <span>
                  {t("common.aed")} {total?.toFixed(2)}
                </span>
              </div>

              <div className="cart-actions">
                {/* <button className="save-cart-btn" onClick={handleSaveCart}>
                  {t("cart.saveCartAndPayLater")}
                </button> */}
                <button
                  className="checkout-btn"
                  onClick={() => handleBasketCheck(handleCheckout)}
                >
                  {isPending ? <Loading /> : t("cart.checkOut")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartModal;
