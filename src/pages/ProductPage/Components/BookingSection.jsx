import { useEffect, useState } from "react";
import LeftArrow from "../../../assets/icons/left.svg";
import RightArrow from "../../../assets/icons/right.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useDispatch, useSelector } from "react-redux";
import { setCheckout, setCheckoutDate } from "../../../global/checkoutSlice";
import formatDate from "../../../utils/dateFormatter";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import InvertedPlusIcon from "../../../assets/icons/invertedplus.svg";
import InvertedMinusIcon from "../../../assets/icons/invertedminus.svg";
import { addToCart, setIsCartOpen } from "../../../global/cartSlice";
import { toast } from "sonner";

export default function BookingSection({
  product,
  onBack,
  startDate,
  endDate,
  availableDates,
}) {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [guests, setGuests] = useState(getVariants());
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.accessibility.isDarkMode);

  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  function getVariants() {
    const variants = {};
    product?.product_variants?.forEach((variant) => {
      variants[variant?.productvariantname] = variant?.min_quantity || 1;
    });
    return variants;
  }

  useEffect(() => {
    setGuests(getVariants());
  }, [product]);

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
    setSelectedDate(date);
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
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

  useEffect(() => {
    let newTotalPrice = 0;
    product.product_variants.forEach((variant) => {
      const variantName = variant.productvariantname;

      if (guests[variantName]) {
        newTotalPrice += variant.gross * guests[variantName];
      }
    });
    setTotalPrice(newTotalPrice);
  }, [guests, product]);

  const handleCheckout = () => {
    const variants = {};

    product?.product_variants.forEach((variant) => {
      variants[variant?.productid] = guests[variant?.productvariantname];
    });
    dispatch(
      setCheckout({
        selectedDate,
        guests: variants,
        totalPrice,
      })
    );

    dispatch(
      addToCart({
        id: selectedProduct?.default_variant_id,
        image: selectedProduct?.product_images?.thumbnail_url,
        title: selectedProduct?.product_title,
        price: 328.57,
        vat: 16.43,
        quantity:
          selectedProduct?.product_variants.find(
            (variant) => variant.id === selectedProduct?.default_variant_id
          )?.min_quantity || 1,
        type: "adults",
        validFrom: formatDate(selectedDate),
        validTo: formatDate(endDate),
      })
    );
    navigate("/payment");
  };

  const handleSaveToCart = () => {
    dispatch(
      addToCart({
        id: selectedProduct?.default_variant_id,
        image: selectedProduct?.product_images?.thumbnail_url,
        title: selectedProduct?.product_title,
        price: 328.57,
        vat: 16.43,
        quantity: 2,
        type: "adults",
        validFrom: formatDate(selectedDate),
        validTo: formatDate(endDate),
      })
    );
    toast.success(t("booking.productAddedToCart"), {
      position: "top-center",
    });
    onBack();
    dispatch(setIsCartOpen(true));
  };

  return (
    <div className="booking-section">
      {/* Date Selection */}
      <div className="calendar-container">
        <h2>{t("booking.chooseDate")}</h2>
        {/* <div className="selected-dates">
          {selectedDate && (
            <div>
              {t("booking.selectedDate")}: {formatMonthYear(selectedDate)}
            </div>
          )}
        </div> */}
        <div className="calendar-wrapper">
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
        </div>
      </div>
      <div className="booking-section-divider"></div>
      {/* Guest Selection */}
      <div className="guest-section h-full flex flex-col justify-between">
        <div className="guest-section-header-container">
          <h2 className="section-title">{t("booking.chooseGuests")}</h2>
          <div className="guest-container">
            <h3 className="guest-summary">
              {Object.keys(guests).map((variant, idx, arr) => (
                <span className="" key={variant}>
                  {variant}: {guests[variant]}
                  {idx < arr.length - 1 ? " / " : ""}
                </span>
              ))}
            </h3>
            <div className="guest-controls">
              {Object.keys(guests)?.map((variant, idx) => {
                const variantData = product.product_variants.find(
                  (v) => v.productvariantname === variant
                );
                return (
                  <div key={idx}>
                    <div className="guest-row">
                      <div className="guest-label-container">
                        <span className="guest-label">
                          {variant}{" "}
                          {variantData?.productvariantdesc &&
                            `(${variantData.productvariantdesc})`}
                        </span>
                        <span className="guest-label-price">
                          AED {variantData?.gross * guests[variant]}{" "}
                        </span>
                      </div>
                      <div className="counter-controls">
                        <button
                          className="counter-btn minus-btn"
                          onClick={() =>
                            setGuests((prev) => {
                              const currentValue = prev[variant];
                              const newValue = Math.max(
                                variantData?.min_quantity || 0,
                                currentValue -
                                  (variantData?.increment_number || 1)
                              );
                              return {
                                ...prev,
                                [variant]: newValue,
                              };
                            })
                          }
                          disabled={
                            guests[variant] <= (variantData?.min_quantity || 0)
                          }
                        >
                          <img
                            src={isDarkMode ? InvertedMinusIcon : MinusIcon}
                            alt="minus"
                          />
                        </button>
                        <span className="counter-value">{guests[variant]}</span>
                        <button
                          className="counter-btn plus-btn"
                          onClick={() =>
                            setGuests((prev) => {
                              const currentValue = prev[variant];
                              const newValue = Math.min(
                                variantData?.max_quantity || 100,
                                currentValue +
                                  (variantData?.increment_number || 1)
                              );
                              return {
                                ...prev,
                                [variant]: newValue,
                              };
                            })
                          }
                          disabled={
                            guests[variant] >=
                            (variantData?.max_quantity || 100)
                          }
                        >
                          <img
                            src={isDarkMode ? InvertedPlusIcon : PlusIcon}
                            alt="plus"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="guest-row-divider"></div>
                  </div>
                );
              })}
            </div>

            <p className="guest-note"></p>
          </div>
        </div>

        <div
          className={
            language === "العربية" ? "ar-booking-actions" : "booking-actions"
          }
        >
          <button className="checkout-btnn" onClick={handleCheckout}>
            {t("booking.checkOut")}{" "}
            <span style={{ color: "red" }}>AED {totalPrice}</span>
          </button>
          <button className="cart-btn" onClick={handleSaveToCart}>
            {t("booking.saveToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
