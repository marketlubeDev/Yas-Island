import React, { useState } from "react";
import closeIcon from "../../../../assets/icons/close.svg"; // Use your close icon
import leftIcon from "../../../../assets/icons/left.svg";

function BookingModal({ onClose, onBack, onSaveToCart, onCheckout }) {
  // Example state for guests
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  // Example state for selected date
  const [selectedDate, setSelectedDate] = useState(8);

  // Example: handle date selection (replace with your calendar logic)
  const handleDateClick = (date) => setSelectedDate(date);

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal" style={{ height: "90vh" }}>
        <div className="booking-modal__header">
          <span className="booking-modal__title">Choose date</span>
        </div>
        <div className="booking-modal__body">
          {/* Calendar */}
          <div className="booking-modal__calendar">
            <div className="booking-modal__calendar-header">
              <button>
                <img src={leftIcon} alt="Next" />
              </button>
              <span className="booking-modal__calendar-month">
                February 2025
              </span>
              <button>
                <img
                  src={leftIcon}
                  alt="Previous"
                  className="booking-modal__calendar-arrow--rotated"
                />
              </button>
            </div>
            <div className="booking-modal__calendar-divider"></div>
            <div className="booking-modal__calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <span key={d} className="booking-modal__calendar-dayname">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
                <button
                  key={date}
                  className={`booking-modal__calendar-date${
                    selectedDate === date ? " selected" : ""
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          {/* Guests */}
          <div className="booking-modal__guests-section">
            <div className="booking-modal__guests-title">Choose guests</div>
            <div className="guests-box">
              <div className="guests-summary">2 Adults / 1 Child</div>
              <div className="guests-divider"></div>
              <div className="guests-row">
                <span>Adult ( 12 Yrs+ )</span>
                <div className="guests-controls">
                  <button className="guests-btn">−</button>
                  <span className="guests-count">2</span>
                  <button className="guests-btn">+</button>
                </div>
              </div>
              <div className="guests-divider"></div>
              <div className="guests-row">
                <span>Children ( 12 Yrs )</span>
                <div className="guests-controls">
                  <button className="guests-btn">−</button>
                  <span className="guests-count">1</span>
                  <button className="guests-btn">+</button>
                </div>
              </div>
              <div className="guests-divider"></div>
              <div className="guests-note">Kids below 3 go free</div>
            </div>
          </div>
        </div>
        <div className="booking-modal__footer">
          <button className="booking-modal__checkout" onClick={onCheckout}>
            Check out <span style={{ color: "red" }}>AED 985.00</span>
          </button>
          <button className="booking-modal__save" onClick={onSaveToCart}>
            Save to cart
          </button>
        </div>
      </div>
      <span className="booking-modal__close" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </span>
    </div>
  );
}

export default BookingModal;
