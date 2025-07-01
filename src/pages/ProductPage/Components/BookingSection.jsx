import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import invertedLeftArrow from "../../../assets/icons/invertleft.svg";
import invertedRightArrow from "../../../assets/icons/invertedright.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout, setCheckoutDate } from "../../../global/checkoutSlice";
import formatDate from "../../../utils/dateFormatter";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import invertedPlusIcon from "../../../assets/icons/invertedplus.svg";
import invertedMinusIcon from "../../../assets/icons/invertedminus.svg";
import { addToCart, setIsCartOpen } from "../../../global/cartSlice";
import { toast } from "sonner";
import Loading from "../../../components/Loading/Loading";
import useCheckBasket from "../../../apiHooks/Basket/checkbasket";

export default function BookingSection({
  product,
  onBack,
  startDate,
  endDate,
  availableDates,
  isLoadingDates,
}) {
  const { checkBasket, isLoading } = useCheckBasket();
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productid] = {
        quantity: variant?.min_quantity || 1,
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

  useEffect(() => {
    // Check if dark mode is enabled by looking at the CSS variable
    const checkDarkMode = () => {
      const bodyStyles = getComputedStyle(document.documentElement);
      const backgroundColor = bodyStyles
        .getPropertyValue("--color-base-bg")
        .trim();
      setIsDarkMode(backgroundColor === "#0B0C0C"); // Check exact match for dark mode background
    };

    checkDarkMode();
    // Create a MutationObserver to watch for changes in dark mode
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  // Add console log to debug
  useEffect(() => {
    console.log("Dark mode status:", isDarkMode);
  }, [isDarkMode]);

  function getValidDateRange(product) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Normalize tomorrow's date

    let endDate;
    if (product.calendar_end_date) {
      endDate = new Date(product.calendar_end_date);
    } else if (product.calendar_range_days) {
      endDate = new Date(
        today.getFullYear(),
        today.getMonth() + product.calendar_range_days,
        today.getDate()
      );
    } else {
      endDate = new Date(today.getFullYear(), 11, 31);
    }
    endDate.setHours(23, 59, 59, 999); // Set end date to end of day

    return { startDate: tomorrow, endDate };
  }

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (date) => {
    // Select the clicked date
    const formattedDate = formatDateToYYYYMMDD(date);
    console.log(formattedDate, "formatted date");
    dispatch(setCheckoutDate(formattedDate));
    setSelectedDate(formattedDate);
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === new Date(selectedDate).toDateString();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];
    const { startDate: minDate, endDate: maxDate } = getValidDateRange(product);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    // Add the actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
        0,
        0,
        0,
        0
      );

      const formattedDateString = formatDate(date);
      const isSelected = isDateSelected(date);
      const isToday = date.toDateString() === new Date().toDateString();

      let isDisabled = false;
      if (availableDates && availableDates.length > 0) {
        isDisabled = !availableDates.includes(formattedDateString);
      } else {
        isDisabled =
          date.getTime() < minDate.getTime() ||
          date.getTime() > maxDate.getTime();
      }

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

  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const today = new Date();

    // Only allow going back to current month
    if (
      newDate.getMonth() >= today.getMonth() ||
      newDate.getFullYear() > today.getFullYear()
    ) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    const { endDate } = getValidDateRange(product);

    // Only allow going forward if within the valid range
    if (newDate <= endDate) {
      setCurrentDate(newDate);
    }
  };

  // Format month and year
  const formatMonthYear = (date) => {
    if (!date) return "";
    if (i18n.language === "ar") {
      const arabicMonths = {
        0: "يناير", // Yanāyir
        1: "فبراير", // Fibrayir
        2: "مارس", // Māris
        3: "أبريل", // Abrīl
        4: "مايو", // Māyū
        5: "يونيو", // Yūniyū
        6: "يوليو", // Yūlyū
        7: "أغسطس", // Aghustus
        8: "سبتمبر", // Septambir
        9: "أكتوبر", // Oktūbar
        10: "نوفمبر", // Nūfambir
        11: "ديسمبر", // Dīsambir
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

  const handleCheckout = () => {
    if (!selectedDate) {
      toast.error(t("Please SelectDate"), {
        position: "top-center",
      });
      return;
    }
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

    Object.entries(guests).forEach(([productId, guestData]) => {
      // Calculate validTo date
      const startDate = new Date(selectedDate);
      const endDate = new Date(startDate);
      endDate.setDate(
        startDate.getDate() + (guestData.variant?.validitydays || 0)
      );

      // Format dates directly to YYYY-MM-DD
      const validToDate = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      dispatch(
        addToCart({
          id: productId,
          variantName: guestData.name,
          net_amount: guestData.variant?.net_amount,
          image: selectedProduct?.product_images?.thumbnail_url,
          title: selectedProduct?.product_title,
          price: guestData.variant?.gross,
          vat: guestData.variant?.vat,
          quantity: guestData.quantity,
          type: guestData.name,
          validFrom: selectedDate,
          validTo: validToDate,
        })
      );
    });
    navigate("/payment");
  };

  const handleSaveToCart = () => {
    if (!selectedDate) {
      toast.error(t("Please SelectDate"), {
        position: "top-center",
      });
      return;
    }

    // here we need to check if the basket is full

    if (isLoading) {
      toast.error(t("Please Wait"), {
        position: "top-center",
      });
      return;
    }

    Object.entries(guests).forEach(([productId, guestData]) => {
      // Calculate validTo date
      const startDate = new Date(selectedDate);
      const endDate = new Date(startDate);
      endDate.setDate(
        startDate.getDate() + (guestData.variant?.validitydays || 0)
      );

      // Format dates directly to YYYY-MM-DD
      const validToDate = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

      dispatch(
        addToCart({
          id: productId,
          variantName: guestData.name,
          net_amount: guestData.variant?.net_amount,
          image: selectedProduct?.product_images?.thumbnail_url,
          title: selectedProduct?.product_title,
          price: guestData.variant?.gross,
          vat: guestData.variant?.vat,
          quantity: guestData.quantity,
          type: guestData.name,
          validFrom: selectedDate,
          validTo: validToDate,
        })
      );
    });

    toast.success(t("booking.productAddedToCart"), {
      position: "top-center",
    });
    onBack();
    dispatch(setIsCartOpen(true));
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
                    src={isDarkMode ? invertedLeftArrow : LeftArrow}
                    alt="Previous Month"
                    className="calendar-arrow"
                  />
                </button>
                <h3>{formatMonthYear(currentDate)}</h3>
                <button onClick={handleNextMonth}>
                  <img
                    src={isDarkMode ? invertedRightArrow : RightArrow}
                    alt="Next Month"
                    className="calendar-arrow"
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
          <h2 className="section-title">{t("booking.chooseGuests")}</h2>
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
                                <img
                                  src={
                                    isDarkMode ? invertedMinusIcon : MinusIcon
                                  }
                                  alt="minus"
                                />
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
                                <img
                                  src={isDarkMode ? invertedPlusIcon : PlusIcon}
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
              isLoadingDates ? { opacity: 0.5, pointerEvents: "none" } : {}
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
            {t("booking.saveToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
