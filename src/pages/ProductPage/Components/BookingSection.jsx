import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout, setCheckoutDate } from "../../../global/checkoutSlice";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import { addToCart, setIsCartOpen } from "../../../global/cartSlice";
import { toast } from "sonner";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";
import Loading from "../../../components/Loading/Loading";

export default function BookingSection({
  product,
  onBack,
  startDate,
  endDate,
  availableDates,
  isLoadingDates,
}) {
  const { mutate: checkBasket, isPending } = useCheckBasket();
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

  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productid] = {
        quantity: variant?.min_quantity || 0,
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
    dispatch(setCheckoutDate(formattedDate));
    setSelectedDate(formattedDate);
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return formatDateToYYYYMMDD(date) === selectedDate;
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
            ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"][parseInt(digit)]
        )
        .join("");
      return `${arabicMonth} ${gregorianYear}`;
    }
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Common function to handle basket check and cart operations
  const handleBasketCheck = (onSuccess) => {
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
      performanceId = getPerformanceId(selectedDate);
      if (!performanceId) {
        toast.error(t("NoPerformance"), {
          position: "top-center",
        });
        return;
      }
    }

    const items = [];
    Object.entries(guests).forEach(([productId, guestData]) => {
      if (guestData.quantity < 1) {
        return;
      }
      let hasperformance = false;
      if (guestData.variant?.hasperformance) {
        hasperformance = true;
      }
      items.push({
        productId: productId,
        quantity: guestData.quantity,
        performance: hasperformance
          ? [{ performanceId: getPerformanceId(selectedDate) }]
          : [],
        validFrom: selectedDate,
        validTo: getValidToDate(productId, selectedDate),
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
          const orderDetails = res?.orderdetails;

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
                getPerformanceId(item?.validFrom) ||
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
            };
            dispatch(addToCart(obj));
          });

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
    });
  };

  const handleCheckout = () => {
    handleBasketCheck(() => {
      const variants = {};
      Object.entries(guests).forEach(([productId, guestData]) => {
        variants[productId] = guestData.quantity;
      });

      dispatch(
        setCheckout({
          selectedDate,
          guests: variants,
          totalPrice,
        })
      );

      navigate("/email-verification");
    });
  };

  const getPerformanceId = (date) => {
    const performance = performanceData.find((p) => p.date == date);
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
      {/* <div className="calendar-container">
        <h2>{t("booking.chooseDate")}</h2>
        <div className="calendar-wrapper">
          {isLoadingDates ? (
            renderCalendarSkeleton()
          ) : (
            <>
              <div className="calendar-header">
                <button onClick={handlePrevMonth}>
                  <img src={LeftArrow} alt="Left Arrow" />
                </button>
                <h3>{formatMonthYear(currentDate)}</h3>
                <button onClick={handleNextMonth}>
                  <img src={RightArrow} alt="Right Arrow" />
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
      <div className="booking-section-divider"></div> */}
      {/* Guest Selection */}
      {/* <div className="guest-section h-full flex flex-col justify-between">
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
                      return (
                        <div key={productId}>
                          <div className="guest-row">
                            <div className="guest-label-container">
                              <span className="guest-label">
                                {guestData.name}{" "}
                                {variantData?.productvariantdesc &&
                                  `(${variantData.productvariantdesc})`}
                              </span>
                              <span className="guest-label-price">
                                AED {variantData?.gross * guestData.quantity}{" "}
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
                                  guestData.quantity <=
                                  (variantData?.min_quantity || 0)
                                }
                              >
                                <img src={MinusIcon} alt="minus" />
                              </button>
                              <span className="counter-value">
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
                                  guestData.quantity >=
                                  (variantData?.max_quantity || 100)
                                }
                              >
                                <img src={PlusIcon} alt="plus" />
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
              AED {totalPrice}
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
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          width: "100%",
          minHeight: "60vh",
        }}
      >
        <div className="calendar-container">
          <h2>{t("booking.chooseDate")}</h2>
          <div className="calendar-wrapper">
            {isLoadingDates ? (
              renderCalendarSkeleton()
            ) : (
              <>
                <div className="calendar-header">
                  <button onClick={handlePrevMonth}>
                    <img src={LeftArrow} alt="Left Arrow" />
                  </button>
                  <h3>{formatMonthYear(currentDate)}</h3>
                  <button onClick={handleNextMonth}>
                    <img src={RightArrow} alt="Right Arrow" />
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40vh",
              background: "blue",
              overflowY: "scroll",
            }}
          >
            <div
              style={{ width: "100%", height: "100rem", background: "yellow" }}
            ></div>
            <div
              style={{ width: "100%", height: "100rem", background: "black" }}
            ></div>
          </div>
          <div style={{ width: "100%", height: "10rem", background: "green" }}>
            3
          </div>
        </div>
      </div>
    </div>
  );
}
