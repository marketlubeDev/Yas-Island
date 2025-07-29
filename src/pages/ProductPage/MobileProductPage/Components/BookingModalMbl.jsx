import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../../../assets/icons/close.svg"; // Use your close icon
import leftIcon from "../../../../assets/icons/left.svg";
import { useLanguage } from "../../../../context/LanguageContext";
import backIcon from "../../../../assets/icons/back copy.svg"; // Replace with your back arrow
import backIconInverter from "../../../../assets/icons/invertedback.svg";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../../components/Loading/ButtonLoading";
import {
  addToCart,
  setIsCartOpen,
  clearCart,
} from "../../../../global/cartSlice";
import { toast } from "sonner";
import useCheckBasket from "../../../../apiHooks/Basket/checkbasket";
import { useNavigate } from "react-router-dom";
import { setCheckout } from "../../../../global/checkoutSlice";

function BookingModalMbl({
  onClose,
  onBack,
  onSaveToCart,
  onCheckout,
  product,
  availableDates,
  isLoadingDates,
}) {
  const { mutate: checkBasket, isPending } = useCheckBasket();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const productList = useSelector((state) => state.product.allProducts);
  const performanceData = useSelector(
    (state) => state.performance.performanceData
  );
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const { verificationEmail, isEmailVerification, cartItems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backIconSrc = isDarkMode ? backIconInverter : backIcon;
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);
  const isRTL = i18n.language === "ar";

  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productid] = {
        quantity: variant?.default_quantity || 0,
        name: variant?.productvariantname,
        variant: variant,
      };
    });
    return variants;
  }

  useEffect(() => {
    setGuests(getVariants());
  }, [product]);

  useEffect(() => {
    let newTotalPrice = 0;
    Object.values(guests).forEach((guestData) => {
      newTotalPrice += guestData.variant.gross * guestData.quantity;
    });
    setTotalPrice(newTotalPrice);
  }, [guests, product]);

  // Auto-select first available date when dates are loaded
  useEffect(() => {
    if (
      availableDates &&
      availableDates.length > 0 &&
      !selectedDate &&
      !isLoadingDates
    ) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate, isLoadingDates]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateToYYYYMMDD = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    const formattedDate = formatDateToYYYYMMDD(date);
    setSelectedDate(formattedDate);
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return formatDateToYYYYMMDD(date) === selectedDate;
  };

  // Function to check if a variant is available for the selected date
  const isVariantAvailableForDate = (variantProductId) => {
    // If no date is selected, all variants are unavailable
    if (!selectedDate) {
      return false;
    }

    // If no performance data, variants should be unavailable
    if (!performanceData.length) {
      return false;
    }

    // Find the variant data in performanceData
    const variantData = performanceData.find(
      (v) => v.variantProductId === variantProductId
    );

    if (!variantData) {
      return false;
    }

    // First check if the variant has any available dates at all
    if (!variantData.isAvailable) {
      return false;
    }

    // Then check if selected date is in this variant's available dates
    const isAvailable = variantData.availableDates.includes(selectedDate);

    return isAvailable;
  };

  const getValidToDate = (id, selectedDate) => {
    const item = selectedProduct?.product_variants?.find(
      (variant) => variant?.productid == id
    );
    const validFromDate = new Date(selectedDate);
    let validToDate = selectedDate;
    const endDate = new Date(validFromDate);
    endDate.setDate(validFromDate.getDate() + (item?.validitydays || 1));
    validToDate = formatDateToYYYYMMDD(endDate);

    return validToDate;
  };

  const getPerformanceId = (date, variantProductId) => {
    // Find the variant data in performanceData
    const variantData = performanceData.find(
      (v) => v.variantProductId === variantProductId
    );
    if (!variantData || !variantData.performances) return false;

    // Find performance for the specific date
    const performance = variantData.performances.find(
      (p) => p.date.split("T")[0] === date
    );
    return performance ? performance.performanceId : false;
  };

  const findVariantById = (variantId, productList = []) => {
    // Search through all products to find the variant
    for (const product of productList) {
      if (product?.product_variants) {
        const variant = product.product_variants.find(
          (variant) => variant?.productid == variantId
        );
        if (variant) {
          return variant;
        }
      }
    }
    return null; // Return null if variant not found
  };
  // Common function to handle basket check and cart operations
  const handleBasketCheck = (onSuccess, type = "cart") => {
    if (!selectedDate) {
      toast.error(t("Please SelectDate"), {
        position: "top-center",
      });
      return;
    }

    let hasPerformance = false;
    let performanceId = null;

    selectedProduct?.product_variants?.forEach((variant) => {
      if (variant?.hasperformance) {
        hasPerformance = true;
      }
    });

    if (hasPerformance) {
      performanceId = getPerformanceId(
        selectedDate,
        selectedProduct?.product_variants[0]?.productid
      );
      if (!performanceId) {
        toast.error(t("NoPerformance"), {
          position: "top-center",
        });
        return;
      }
    }

    const currentItems = [];

    // if (type === "checkout") {
    //   cartItems?.forEach((item) => {
    //     items.push({
    //       productId: item?.productId,
    //       quantity: item?.quantity,
    //       performance: item?.performances
    //         ? [{ performanceId: item?.performances }]
    //         : [],
    //       validFrom: item?.validFrom,
    //       validTo: item?.validTo,
    //     });
    //   });
    // }
    Object.entries(guests).forEach(([productId, guestData]) => {
      if (guestData.quantity < 1) {
        return;
      }
      let hasperformance = false;
      if (guestData.variant?.hasperformance) {
        hasperformance = true;
      }
      currentItems.push({
        productId: productId,
        quantity: guestData.quantity,
        performance: hasperformance
          ? [{ performanceId: getPerformanceId(selectedDate, productId) }]
          : [],
        validFrom: selectedDate,
        validTo: getValidToDate(productId, selectedDate),
      });
    });

    // For checkout, include existing cart items + current items
    let allItems = currentItems;
    if (type === "checkout") {
      const existingCartItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        performance: item.performances
          ? [{ performanceId: item.performances }]
          : [],
        validFrom: item.validFrom,
        validTo: item.validTo,
      }));
      allItems = [...existingCartItems, ...currentItems];
    }

    const data = {
      coupons: [],
      items: allItems,
      capacityManagement: true,
    };

    if (currentItems.length === 0) {
      toast.error(t("Please enter a valid quantity"), {
        position: "top-center",
      });
      return;
    }

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
          const orderDetails = res?.orderdetails;

          if (type === "cart") {
            // For cart, add only the new items to cart
            // Filter to only include current items (not existing cart items)
            const newItems = orderDetails?.order?.items?.filter((item) => {
              // Check if this item matches any of the current items being added
              return currentItems.some(
                (currentItem) =>
                  currentItem.productId == item?.productId &&
                  currentItem.validFrom === item?.validFrom
              );
            });

            newItems?.forEach((item) => {
              const variantData = selectedProduct?.product_variants?.find(
                (variant) => variant?.productid == item?.productId
              );

              let price = {
                currency: "AED",
                net: variantData?.net_amount,
                tax: variantData?.vat,
                gross: variantData?.gross,
              };
              let obj = {
                capacityGuid: item?.capacityGuid,
                discount: item?.discount,
                groupingCode: item?.groupingCode,
                itemPromotionList: item?.itemPromotionList,
                original: item?.original,
                packageCode: item?.packageCode,
                performances:
                  item?.performances?.[0]?.performanceId ||
                  getPerformanceId(item?.validFrom, item?.productId) ||
                  null,
                price: price,
                productId: item?.productId,
                quantity: item?.quantity,
                rechargeAmount: item?.rechargeAmount,
                validFrom: item?.validFrom,
                validTo: item?.validTo
                  ? formatDateToYYYYMMDD(item?.validTo)
                  : getValidToDate(item?.productId, selectedDate),
                image: selectedProduct?.product_images?.thumbnail_url,
                title: selectedProduct?.product_title,
                variantName: selectedProduct?.product_variants?.find(
                  (variant) => variant?.productid == item?.productId
                )?.productvariantname,
                minQuantity: variantData?.min_quantity,
                maxQuantity: variantData?.max_quantity,
                incrementNumber: variantData?.increment_number,
              };
              dispatch(addToCart(obj));
            });
          } else if (type === "checkout") {
            // For checkout, clear cart first and add all verified items
            dispatch(clearCart());

            orderDetails?.order?.items?.forEach((item) => {
              const variantData = selectedProduct?.product_variants?.find(
                (variant) => variant?.productid == item?.productId
              );

              let price = {
                currency: "AED",
                net: variantData?.net_amount,
                tax: variantData?.vat,
                gross: variantData?.gross,
              };
              let obj = {
                capacityGuid: item?.capacityGuid,
                discount: item?.discount,
                groupingCode: item?.groupingCode,
                itemPromotionList: item?.itemPromotionList,
                original: item?.original,
                packageCode: item?.packageCode,
                performances:
                  item?.performances?.[0]?.performanceId ||
                  getPerformanceId(item?.validFrom, item?.productId) ||
                  null,
                price: price,
                productId: item?.productId,
                quantity: item?.quantity,
                rechargeAmount: item?.rechargeAmount,
                validFrom: item?.validFrom,
                validTo: item?.validTo
                  ? formatDateToYYYYMMDD(item?.validTo)
                  : getValidToDate(item?.productId, selectedDate),
                image: selectedProduct?.product_images?.thumbnail_url,
                title: selectedProduct?.product_title,
                variantName: selectedProduct?.product_variants?.find(
                  (variant) => variant?.productid == item?.productId
                )?.productvariantname,
                minQuantity: variantData?.min_quantity,
                maxQuantity: variantData?.max_quantity,
                incrementNumber: variantData?.increment_number,
              };
              dispatch(addToCart(obj));
            });

            // Update the checkout slice
            const checkoutData = {
              coupons: [],
              items: orderDetails?.order?.items?.map((item) => ({
                ...item,
                productMasterid:
                  productList.find((product) =>
                    product.product_variants.some(
                      (variant) => variant.productid === item?.productId
                    )
                  )?.product_masterid || "",
              })),
              emailId: verificationEmail || "",
              country: "",
              nationality: "",
              phoneNumber: "",
              language: language,
              grossAmount: orderDetails?.order?.total?.gross,
              netAmount: orderDetails?.order?.total?.net,
              taxAmount: orderDetails?.order?.total?.tax,
              firstName: "",
              lastName: "",
              countryCode: "",
              isTnCAgrred: false,
              isConsentAgreed: false,
              promoCode: "",
            };
            dispatch(setCheckout(checkoutData));
            dispatch(clearCart());

            orderDetails?.order?.items?.forEach((item) => {
              const variantData = findVariantById(item?.productId, productList);

              let price = {
                currency: "AED",
                net: variantData?.net_amount,
                tax: variantData?.vat,
                gross: variantData?.gross,
              };
              let obj = {
                capacityGuid: item?.capacityGuid,
                discount: item?.discount,
                groupingCode: item?.groupingCode,
                itemPromotionList: item?.itemPromotionList,
                original: item?.original,
                packageCode: item?.packageCode,
                performances:
                  item?.performances?.[0]?.performanceId ||
                  getPerformanceId(item?.validFrom, item?.productId) ||
                  null,
                price: price,
                productId: item?.productId,
                quantity: item?.quantity,
                rechargeAmount: item?.rechargeAmount,
                validFrom: item?.validFrom,
                validTo: item?.validTo
                  ? formatDateToYYYYMMDD(item?.validTo)
                  : getValidToDate(item?.productId, selectedDate),
                image: selectedProduct?.product_images?.thumbnail_url,
                title: selectedProduct?.product_title,
                variantName: selectedProduct?.product_variants?.find(
                  (variant) => variant?.productid == item?.productId
                )?.productvariantname,
                minQuantity: variantData?.min_quantity,
                maxQuantity: variantData?.max_quantity,
                incrementNumber: variantData?.increment_number,
              };
              dispatch(addToCart(obj, "checkout"));
            });
          }
          onSuccess();
        }
      },
      onError: (err) => {
        console.log(err);
        toast.error(err?.response?.data?.message || t("Something went wrong"), {
          position: "top-center",
        });
      },
    });
  };

  const handleSaveToCart = () => {
    handleBasketCheck(() => {
      toast.success(t("booking.productAddedToCart"), {
        position: "top-center",
      });
      onClose();
      dispatch(setIsCartOpen(true));
    }, "cart");
  };

  const handleCheckout = () => {
    handleBasketCheck(() => {
      // Navigate to email verification or payment details without opening cart modal
      if (!isEmailVerification) {
        navigate("/email-verification");
      } else {
        navigate("/payment-details");
      }
    }, "checkout"); // Use "checkout" type to include existing cart items + current items
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="booking-modal__calendar-date empty"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const formattedDateString = formatDateToYYYYMMDD(date);
      const isSelected = isDateSelected(date);
      const isToday =
        formatDateToYYYYMMDD(date) === formatDateToYYYYMMDD(new Date());
      const isDisabled = !availableDates?.includes(formattedDateString);

      days.push(
        <button
          key={day}
          className={`booking-modal__calendar-date${
            isSelected ? " selected" : ""
          }${isToday ? " today" : ""}${isDisabled ? " disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(date)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const formatMonthYear = (date) => {
    if (i18n.language === "ar") {
      const arabicMonths = {
        0: "يناير",
        1: "فبراير",
        2: "مارس",
        3: "أبريل",
        4: "مايو",
        5: "يونيو",
        6: "يوليو",
        7: "أغسطس",
        8: "سبتمبر",
        9: "أكتوبر",
        10: "نوفمبر",
        11: "ديسمبر",
      };
      const arabicMonth = arabicMonths[date.getMonth()];
      const gregorianYear = date
        .getFullYear()
        .toString()
        .split("")
        .map(
          (digit) =>
            ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"][parseInt(digit)]
        )
        .join("");
      return `${arabicMonth} ${gregorianYear}`;
    }
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const toArabicNumeral = (num) => {
    if (i18n.language === "ar") {
      const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return num
        .toString()
        .split("")
        .map((digit) => arabicNumerals[parseInt(digit)])
        .join("");
    }
    return num;
  };

  const renderCalendarSkeleton = () => (
    <div className="calendar-skeleton">
      <div className="calendar-header-skeleton skeleton"></div>
      <div className="calendar-days-skeleton">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div
              key={`weekday-${i}`}
              className="skeleton"
              style={{ height: "20px" }}
            ></div>
          ))}
        {Array(28)
          .fill(0)
          .map((_, i) => (
            <div key={`day-${i}`} className="day-skeleton skeleton"></div>
          ))}
      </div>
    </div>
  );

  const renderGuestSectionSkeleton = () => (
    <div className="guest-section-skeleton">
      <div
        className="guest-summary-skeleton skeleton"
        style={{ height: "24px", marginBottom: "16px", width: "50%" }}
      ></div>
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div key={`guest-${i}`} style={{ marginBottom: "16px" }}>
            <div
              className="guest-row-skeleton skeleton"
              style={{ height: "32px", marginBottom: "12px" }}
            ></div>
            <div className="guest-controls-skeleton">
              <div
                className="control-btn-skeleton skeleton"
                style={{ width: "24px", height: "24px" }}
              ></div>
              <div
                className="control-value-skeleton skeleton"
                style={{ width: "32px", height: "24px" }}
              ></div>
              <div
                className="control-btn-skeleton skeleton"
                style={{ width: "24px", height: "24px" }}
              ></div>
            </div>
            {i < 1 && (
              <div
                style={{ height: "1px", background: "#eee", margin: "16px 0" }}
              ></div>
            )}
          </div>
        ))}
    </div>
  );

  const skeletonStyles = `
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .calendar-skeleton {
    width: 100%;
    padding: 16px;
    height: fit-content;
  }

  .calendar-header-skeleton {
    height: 32px;
    margin-bottom: 16px;
    border-radius: 4px;
  }

  .calendar-days-skeleton {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
  }

  .day-skeleton {
    aspect-ratio: 1;
    border-radius: 4px;
  }

  .guest-section-skeleton {
    padding: 16px;
    height: fit-content;
  }

  .guest-controls-skeleton {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }
  `;

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = skeletonStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div
      className="booking-modal-overlay"
      style={{ background: "var(--color-bkg-body-bg)" }}
    >
      <div className="booking-modal">
        <div className="booking-modal__header">
          <img
            src={backIconSrc}
            alt="Back"
            className="attraction-detail-modal__back-icon"
            onClick={onClose}
            style={{
              transform: isRTL ? "scaleX(-1)" : "none",
            }}
          />
          <span className="booking-modal__title">
            {t("booking.chooseDate")}
          </span>
        </div>
        <div className="booking-modal__body">
          {/* Calendar */}
          <div className="booking-modal__calendar">
            {isLoadingDates ? (
              renderCalendarSkeleton()
            ) : (
              <>
                <div className="booking-modal__calendar-header">
                  <button onClick={handlePrevMonth}>
                    <img
                      src={leftIcon}
                      alt="Previous"
                      style={{
                        transform: isRTL ? "scaleX(-1)" : "none",
                      }}
                    />
                  </button>
                  <span className="booking-modal__calendar-month">
                    {formatMonthYear(currentDate)}
                  </span>
                  <button onClick={handleNextMonth}>
                    <img
                      src={leftIcon}
                      alt="Next"
                      className="booking-modal__calendar-arrow--rotated"
                      style={{
                        transform: isRTL ? "scaleX(1)" : "scaleX(-1)",
                      }}
                    />
                  </button>
                </div>
                <div className="booking-modal__calendar-divider"></div>
                <div className="booking-modal__calendar-grid">
                  {Object.values(
                    t("booking.weekDays", { returnObjects: true })
                  ).map((d) => (
                    <span key={d} className="booking-modal__calendar-dayname">
                      {d}
                    </span>
                  ))}
                  {generateCalendarDays()}
                </div>
              </>
            )}
          </div>

          {/* Guests */}
          <div className="booking-modal__guests-section">
            <div className="booking-modal__guests-title">
              {product?.quantitydesc || t("booking.chooseGuests")}
            </div>

            <div className="guests-box-container">
              <div className="guests-box">
                {isLoadingDates ? (
                  renderGuestSectionSkeleton()
                ) : (
                  <>
                    <div className="guests-summary">
                      {Object.entries(guests).map(
                        ([productId, guestData], idx, arr) => (
                          <span key={productId}>
                            {guestData.name}: {guestData.quantity}
                            {idx < arr.length - 1 ? " / " : ""}
                          </span>
                        )
                      )}
                    </div>
                    <div className="guests-divider"></div>
                    {Object.entries(guests).map(
                      ([productId, guestData], idx) => {
                        const variantData = guestData.variant;
                        const isAvailable = variantData?.hasperformance
                          ? isVariantAvailableForDate(productId)
                          : true;
                        return (
                          <React.Fragment key={productId}>
                            <div
                              className={`guests-row ${
                                !isAvailable ? "unavailable-variant" : ""
                              }`}
                            >
                              <div className="guest-label-container">
                                <span className="guest-label">
                                  {guestData.name}{" "}
                                  {variantData?.productvariantdesc &&
                                    `(${variantData.productvariantdesc})`}
                                  {!isAvailable && (
                                    <span className="unavailable-notice">
                                      {!selectedDate
                                        ? "- Please select a date first"
                                        : "- Not available on selected date"}
                                    </span>
                                  )}
                                </span>
                                <span className="guest-label-price">
                                  {guestData.quantity > 0 &&
                                    `AED ${
                                      variantData?.gross * guestData.quantity
                                    }`}
                                </span>
                              </div>

                              <div className="guests-controls">
                                <button
                                  className="guests-btn"
                                  style={{
                                    color: "var(--color-bkg-guest-title-clr)",
                                    opacity: !isAvailable ? 0.5 : 1,
                                    cursor: !isAvailable
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  onClick={() =>
                                    setGuests((prev) => {
                                      const currentValue =
                                        prev[productId].quantity;
                                      const newValue = Math.max(
                                        variantData?.min_quantity || 0,
                                        currentValue -
                                          (variantData?.increment_number || 1)
                                      );
                                      return {
                                        ...prev,
                                        [productId]: {
                                          ...prev[productId],
                                          quantity: newValue,
                                        },
                                      };
                                    })
                                  }
                                  disabled={
                                    !isAvailable ||
                                    guestData.quantity <=
                                      (variantData?.min_quantity || 0)
                                  }
                                >
                                  -
                                </button>
                                <span
                                  className="guests-count"
                                  style={{
                                    color: "var(--color-bkg-guest-title-clr)",
                                    opacity: !isAvailable ? 0.5 : 1,
                                  }}
                                >
                                  {guestData.quantity}
                                </span>
                                <button
                                  className="guests-btn"
                                  style={{
                                    color: "var(--color-bkg-guest-title-clr)",
                                    opacity: !isAvailable ? 0.5 : 1,
                                    cursor: !isAvailable
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                  onClick={() =>
                                    setGuests((prev) => {
                                      const currentValue =
                                        prev[productId].quantity;
                                      const newValue = Math.min(
                                        variantData?.max_quantity || 100,
                                        currentValue +
                                          (variantData?.increment_number || 1)
                                      );
                                      return {
                                        ...prev,
                                        [productId]: {
                                          ...prev[productId],
                                          quantity: newValue,
                                        },
                                      };
                                    })
                                  }
                                  disabled={
                                    !isAvailable ||
                                    guestData.quantity >=
                                      (variantData?.max_quantity || 100)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="guests-divider"></div>
                          </React.Fragment>
                        );
                      }
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="booking-modal__footer">
          <button
            className="booking-modal__checkout"
            onClick={handleCheckout}
            disabled={isLoadingDates || isPending}
            style={
              isLoadingDates || isPending
                ? { opacity: 0.5, pointerEvents: "none" }
                : {}
            }
          >
            {t("booking.checkOut")}{" "}
            <span style={{ color: "var(--color-bkg-checkout-btn-clr-span)" }}>
              {t("common.aed")} {totalPrice}
            </span>
          </button>
          <button
            className="booking-modal__save"
            onClick={handleSaveToCart}
            disabled={isLoadingDates || isPending}
            style={
              isLoadingDates || isPending
                ? { opacity: 0.5, pointerEvents: "none" }
                : {}
            }
          >
            {isPending ? <Loading /> : t("booking.saveToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModalMbl;
