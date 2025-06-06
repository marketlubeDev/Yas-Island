import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import backIcon from "../../../../assets/icons/back.svg";

function CheckOut({ onClose, onProceedToPayment, onApplyPromo }) {
  const [firstName, setFirstName] = useState("vivek");
  const [lastName, setLastName] = useState("panashi");
  const [country, setCountry] = useState("UAE");
  const [nationality, setNationality] = useState("UAE");
  const [phone, setPhone] = useState("527263748");
  const [promo, setPromo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptTerms) {
      onProceedToPayment();
    }
  };

  return (
    <div className="email-checkout__overlay">
      <div className="email-checkout__container">
        <div className="email-checkout__header">
          <MobileHeader />
        </div>
        <div className="email-checkout__content">
          <div className="email-checkout__title-row">
            <button
              className="email-checkout__back-btn"
              onClick={onClose}
              type="button"
            >
              <img
                src={backIcon}
                alt="Back"
                style={{ width: 24, height: 24 }}
              />
            </button>
            <div className="email-checkout__title">
              Guest details and payment
            </div>
          </div>
          <div className="email-checkout__steps">
            <div className="email-checkout__step">
              Step 1<br />
              <span>Email verification</span>
            </div>
            <div className="email-checkout__step email-checkout__step--active">
              Step 2<br />
              <span>Checkout</span>
            </div>
          </div>
          <div className="email-checkout__underline"></div>
          <div className="email-checkout__form-container">
            <form className="email-checkout__form" onSubmit={handleSubmit}>
              <label className="email-checkout__label">
                FIRST NAME *
                <input
                  type="text"
                  className="email-checkout__input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </label>
              <label className="email-checkout__label">
                LAST NAME *
                <input
                  type="text"
                  className="email-checkout__input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </label>
              <label className="email-checkout__label">
                COUNTRY OF RESIDENCE *
                <select
                  className="email-checkout__input"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                  <option value="UAE">UAE</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </label>
              <label className="email-checkout__label">
                NATIONALITY *
                <select
                  className="email-checkout__input"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                >
                  <option value="UAE">UAE</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </label>
              <label className="email-checkout__label">
                PHONE NUMBER (PREFERRED NUMBER) *
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: 600, color: "#231942" }}>
                    +971
                  </span>
                  <input
                    type="tel"
                    className="email-checkout__input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </label>

              <div className="email-checkout__summary">
                <div className="email-checkout__summary-title">
                  1 day FERRARI WORLD YAS ISLAND
                </div>
                <div className="email-checkout__summary-row">
                  <span>DATES & GUESTS</span>
                  <span>
                    THU 08- FEB 2025 &nbsp; ADULT - 2 &nbsp; CHILDREN - 1
                  </span>
                </div>
                <div className="email-checkout__summary-row">
                  <span>Sub total :</span>
                  <span>AED 935.71</span>
                </div>
                <div className="email-checkout__summary-row">
                  <span>vat & tax :</span>
                  <span>+ 49.29 VAT & Tax</span>
                </div>
                <div className="email-checkout__summary-row email-checkout__summary-row--total">
                  <span>Total :</span>
                  <span>AED 985.00</span>
                </div>
              </div>

              <div className="email-checkout__promo">
                <label
                  className="email-checkout__label"
                  style={{ marginBottom: 0 }}
                >
                  ENTER YOUR PROMO CODE TO GET DISCOUNT
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    className="email-checkout__input"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                  <button
                    type="button"
                    className="email-checkout__promo-apply"
                    onClick={onApplyPromo}
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="email-checkout__checkboxes">
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms((v) => !v)}
                    required
                  />
                  I have read and accept the{" "}
                  <a
                    href="#"
                    style={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    terms and conditions
                  </a>
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="checkbox"
                    checked={receiveComms}
                    onChange={() => setReceiveComms((v) => !v)}
                  />
                  Receive communications via email
                </label>
              </div>

              <button
                className="email-checkout__btn"
                type="button"
                disabled={!acceptTerms}
                onClick={() => {
                  if (acceptTerms) {
                    onProceedToPayment();
                  }
                }}
              >
                Proceed to payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
