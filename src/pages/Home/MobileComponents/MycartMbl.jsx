import React from "react";
import { Modal, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import backIcon from "../../../assets/icons/back.svg";
import backIconInverter from "../../../assets/icons/invertedback.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import InvertDeleteIcon from "../../../assets/icons/invertdelete.svg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../../../global/cartSlice";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import Loading from "../../../components/Loading/ButtonLoading";
import { setCheckout, setCheckoutEmail } from "../../../global/checkoutSlice";
import { toast } from "sonner";

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

function MycartMbl({ onClose, visible }) {
  const language = useSelector((state) => state.language.currentLanguage);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isRTL } = useLanguage();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

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

  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
  const deleteIconSrc = isDarkMode ? InvertDeleteIcon : DeleteIcon;

  const handleCheckout = () => {
    if (!isEmailVerification) {
      navigate("/email-verification");
    } else {
      dispatch(setCheckoutEmail(verificationEmail));
      navigate("/payment-details");
    }
    onClose();
  };

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
              firstName: "",
              lastName: "",
              phoneNumber: "",
              countryCode: "",
              isTnCAgrred: false,
              isConsentAgreed: false,
            })
          );
          onSuccess();
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
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
      closable={false}
      keyboard={true}
      maskClosable={true}
      className={`mycart-modal-mobile ${isRTL ? "rtl" : ""}`}
      transitionName="zoom"
      maskTransitionName="fade"
      styles={{
        mask: { background: "rgba(0, 0, 0, 0.45)" },
      }}
      destroyOnHidden
    >
      <div className="mycart-modal__content">
        <div className="mycart-modal__header">
          <button
            className={`mycart-modal__back ${
              isRTL ? "mycart-modal__back--rtl" : ""
            }`}
            onClick={onClose}
            type="button"
            style={{ cursor: "pointer" }}
            aria-label="Close modal"
          >
            <img
              src={backIconSrc}
              alt="Back"
              style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
            />
          </button>
          <span className="mycart-modal__title">{t("cart.title")}</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="mycart-modal__empty">
            <h3>{t("cart.empty")}</h3>
            <p>{t("cart.emptyMessage")}</p>
          </div>
        ) : (
          <>
            <div className="mycart-modal__items">
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
                    className={`mycart-modal__item ${
                      isExpired ? "expired-item" : ""
                    }`}
                    key={index}
                  >
                    <img
                      src={productData?.product_images?.thumbnail_url}
                      alt={productData?.product_title}
                      className="mycart-modal__item-img"
                    />
                    <div className="mycart-modal__item-content">
                      <div className="mycart-modal__item-title-row">
                        <div className="mycart-modal__item-title">
                          {productData?.product_title}
                        </div>
                        <button
                          className="mycart-modal__item-delete"
                          onClick={() =>
                            handleDeleteItem(item?.productId, item?.validFrom)
                          }
                        >
                          <img src={deleteIconSrc} alt="Delete" />
                        </button>
                      </div>
                      <div className="mycart-modal__item-price">
                        <span className="mycart-modal__item-price-main">
                          {t("common.aed")}{" "}
                          {productData?.selectedVariant?.price?.net}
                        </span>
                        <span className="mycart-modal__item-vat">
                          +
                          <span className="text-xs text-gray-500">
                            {" "}
                            {productData?.selectedVariant?.price?.tax}{" "}
                            {t("common.netAndTax")}
                          </span>
                        </span>
                      </div>
                      <div className="mycart-modal__item-date">
                        <span>{item?.validFrom}</span>
                      </div>
                      {isExpired && (
                        <p className="expired-text">
                          {t("common.thisTicketIsExpired")}
                        </p>
                      )}
                      <div className="mycart-modal__item-qty-row">
                        <span
                          style={{ color: "var(--color-email-form-label)" }}
                        >
                          {productData?.selectedVariant?.productvariantname}
                        </span>
                        <div className="mycart-modal__item-qty-controls">
                          <button
                            className="minus-btn-mobile"
                            onClick={() =>
                              handleQuantityChange(
                                item?.productId,
                                -1,
                                item?.validFrom,
                                item?.minQuantity,
                                item?.maxQuantity,
                                item?.incrementNumber
                              )
                            }
                          >
                            <MinusOutlined />
                          </button>
                          <span
                            style={{ color: "var(--color-email-form-label)" }}
                          >
                            {item?.quantity}
                          </span>
                          <button
                            className="plus-btn-mobile"
                            onClick={() =>
                              handleQuantityChange(
                                item?.productId,
                                1,
                                item?.validFrom,
                                item?.minQuantity,
                                item?.maxQuantity,
                                item?.incrementNumber
                              )
                            }
                          >
                            <PlusOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mycart-modal__footer">
              <div className="mycart-modal__summary">
                <div className="mycart-modal__summary-row">
                  <span>{t("cart.subTotal")}</span>
                  <span>
                    {t("common.aed")} {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="mycart-modal__summary-row">
                  <span>{t("cart.vat")}</span>
                  <span>
                    + {t("common.aed")} {vatAndTax.toFixed(2)}{" "}
                    {t("cart.vatUnit")}
                  </span>
                </div>
                <div className="mycart-modal__summary-row mycart-modal__summary-row--total">
                  <span>{t("cart.total")}</span>
                  <span>
                    {t("common.aed")} {total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="mycart-modal__checkout"
                onClick={() => handleBasketCheck(handleCheckout)}
              >
                {isPending ? <Loading /> : t("cart.checkOut")}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default MycartMbl;
