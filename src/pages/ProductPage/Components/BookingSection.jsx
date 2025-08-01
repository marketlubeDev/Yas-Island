import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import InvertMinusIcon from "../../../assets/icons/invertminus.svg";
import InvertPlusIcon from "../../../assets/icons/invertplus.svg";
import { addToCart, setIsCartOpen, clearCart } from "../../../global/cartSlice";
import { toast } from "sonner";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import Loading from "../../../components/Loading/ButtonLoading";
import { setCheckout } from "../../../global/checkoutSlice";

export default function BookingSection({
  product,
  onBack,
  startDate,
  endDate,
  availableDates,
  isLoadingDates,
}) {
  const { mutate: checkBasket, isPending } = useCheckBasket();
  const productList = useSelector((state) => state.product.allProducts);
  const verifiedEmail = useSelector((state) => state.checkout.emailId);
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useDispatch();

  const performanceData = useSelector(
    (state) => state.performance.performanceData
  );
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);
  const { verificationEmail, isEmailVerification, cartItems } = useSelector(
    (state) => state.cart
  );
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

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

  // Helper function to find variant data from product list by variant ID
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

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
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
        <div
          key={day}
          className={`day
            ${isSelected ? "selected" : ""}
            ${isToday ? "today" : ""}
            ${isDisabled ? "disabled" : ""}`}
          onClick={() => !isDisabled && handleDateClick(date)}
        >
          {day}
        </div>
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

  const formatMonthYear = (date) => {
    if (!date) return "";
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
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"][parseInt(digit)]
        )
        .join("");
      return `${arabicMonth} ${gregorianYear}`;
    }
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
      const existingCartItems = cartItems.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          performance: item.performances
            ? [{ performanceId: item.performances }]
            : [],
          validFrom: item.validFrom,
          validTo: item.validTo,
        };
      });

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

            const items = orderDetails?.order?.items?.map((item) => ({
              ...item,
              productMasterid:
                productList.find((product) =>
                  product.product_variants.some(
                    (variant) => variant.productid === item?.productId
                  )
                )?.product_masterid || "",
            }));
            // Update the checkout slice
            const checkoutData = {
              coupons: [],
              items: items,
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
      onBack();
      dispatch(setIsCartOpen(true));
    }, "cart");
  };

  const handleCheckout = () => {
    handleBasketCheck(() => {
      // Navigate to email verification or payment details without opening cart modal
      if (!isEmailVerification) {
        navigate("/email-verification");
      } else {
        navigate("/payment-details", { state: { isCheckout: true } });
      }
    }, "checkout"); // Use "checkout" type to include existing cart items + current items
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
        {Array(35)
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
        style={{ height: "30px", marginBottom: "20px", width: "50%" }}
      ></div>
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div key={`guest-${i}`} style={{ marginBottom: "20px" }}>
            <div
              className="guest-row-skeleton skeleton"
              style={{ marginBottom: "15px" }}
            ></div>
            <div className="guest-controls-skeleton">
              <div className="control-btn-skeleton skeleton"></div>
              <div className="control-value-skeleton skeleton"></div>
              <div className="control-btn-skeleton skeleton"></div>
            </div>
            {i < 1 && (
              <div
                style={{ height: "1px", background: "#eee", margin: "20px 0" }}
              ></div>
            )}
          </div>
        ))}
    </div>
  );

  return (
    <div className="booking-section">
      {/* Date Selection */}
      <div className="calendar-container">
        <h2>{t("booking.chooseDate")}</h2>
        <div className="calendar-wrapper">
          {isLoadingDates ? (
            renderCalendarSkeleton()
          ) : (
            <>
              <div className="calendar-header">
                <button onClick={handlePrevMonth}>
                  <img
                    src={LeftArrow}
                    alt="Left Arrow"
                    className={currentLanguage === "ar" ? "rtl-arrow" : ""}
                  />
                </button>
                <h3>{formatMonthYear(currentDate)}</h3>
                <button onClick={handleNextMonth}>
                  <img
                    src={RightArrow}
                    alt="Right Arrow"
                    className={currentLanguage === "ar" ? "rtl-arrow" : ""}
                  />
                </button>
              </div>

              <div className="calendar-body">
                <div className="calendar-weekdays">
                  <span>{t("booking.weekDays.sun")}</span>
                  <span>{t("booking.weekDays.mon")}</span>
                  <span>{t("booking.weekDays.tue")}</span>
                  <span>{t("booking.weekDays.wed")}</span>
                  <span>{t("booking.weekDays.thu")}</span>
                  <span>{t("booking.weekDays.fri")}</span>
                  <span>{t("booking.weekDays.sat")}</span>
                </div>
                <div className="calendar-days">{generateCalendarDays()}</div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="booking-section-divider"></div>
      {/* Guest Selection */}
      <div className="guest-section h-full flex flex-col justify-between">
        <div className="guest-section-header-container">
          <h2 className="section-title">
            {selectedProduct?.quantitydesc || t("booking.chooseGuests")}
          </h2>
          <div className="guest-container">
            {isLoadingDates ? (
              renderGuestSectionSkeleton()
            ) : (
              <>
                <h3 className="guest-summary">
                  {Object.entries(guests).map(
                    ([productId, guestData], idx, arr) => (
                      <span className="" key={productId}>
                        {guestData.name}: {guestData.quantity}
                        {idx < arr.length - 1 ? " / " : ""}
                      </span>
                    )
                  )}
                </h3>
                <div className="guest-controls">
                  {Object.entries(guests)?.map(
                    ([productId, guestData], idx) => {
                      const variantData = guestData.variant;
                      const isAvailable = variantData?.hasperformance
                        ? isVariantAvailableForDate(productId)
                        : true;
                      return (
                        <div key={productId}>
                          <div
                            className={`guest-row ${
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
                            <div className="counter-controls">
                              <button
                                className="counter-btn minus-btn"
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
                                style={{
                                  opacity: !isAvailable ? 0.5 : 1,
                                  cursor: !isAvailable
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                <img
                                  src={isDarkMode ? InvertMinusIcon : MinusIcon}
                                  alt="minus"
                                />
                              </button>
                              <span
                                className="counter-value"
                                style={{
                                  opacity: !isAvailable ? 0.5 : 1,
                                }}
                              >
                                {guestData.quantity}
                              </span>
                              <button
                                className="counter-btn plus-btn"
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
                                style={{
                                  opacity: !isAvailable ? 0.5 : 1,
                                  cursor: !isAvailable
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                <img
                                  src={isDarkMode ? InvertPlusIcon : PlusIcon}
                                  alt="plus"
                                />
                              </button>
                            </div>
                          </div>

                          <div className="guest-row-divider"></div>
                        </div>
                      );
                    }
                  )}
                </div>

                <p className="guest-note"></p>
              </>
            )}
          </div>
        </div>

        <div
          className={
            language === "العربية" ? "ar-booking-actions" : "booking-actions"
          }
        >
          <button
            className="checkout-btnn"
            onClick={handleCheckout}
            disabled={isLoadingDates}
            style={
              isLoadingDates || isPending
                ? { opacity: 0.5, pointerEvents: "none" }
                : {}
            }
          >
            {t("booking.checkOut")}{" "}
            <span style={{ color: "red", opacity: isLoadingDates ? 0.5 : 1 }}>
              {t("common.aed")} {totalPrice}
            </span>
          </button>
          <button
            className="cart-btn"
            onClick={handleSaveToCart}
            disabled={isLoadingDates}
            style={
              isLoadingDates ? { opacity: 0.5, pointerEvents: "none" } : {}
            }
          >
            {isPending ? <Loading /> : t("booking.saveToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
