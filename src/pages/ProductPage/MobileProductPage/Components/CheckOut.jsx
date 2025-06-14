import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import backIcon from "../../../../assets/icons/back.svg";
import PaymentHeader from "./PaymentHeader";
import { useTranslation } from "react-i18next";

function CheckOut({ onClose, onProceedToPayment, onApplyPromo, onBack }) {
  const { t, i18n } = useTranslation();
  const [firstName, setFirstName] = useState("vivek");
  const [lastName, setLastName] = useState("panashi");
  const [country, setCountry] = useState("UAE");
  const [nationality, setNationality] = useState("UAE");
  const [phone, setPhone] = useState("527263748");
  const [promo, setPromo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [receiveComms, setReceiveComms] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptTerms) {
      onProceedToPayment();
    }
  };

  // For country/nationality options
  const countryOptions = [
    { value: "UAE", label: t("payment.personalDetails.countries.UAE") },
    { value: "India", label: t("payment.personalDetails.countries.India") },
    { value: "USA", label: t("payment.personalDetails.countries.USA") },
  ];
  const phoneCodeOptions = [
    { value: "+971", label: t("payment.personalDetails.phoneCodes.UAE") },
    { value: "+91", label: t("payment.personalDetails.phoneCodes.India") },
    { value: "+1", label: t("payment.personalDetails.phoneCodes.USA") },
  ];

  return (
    <div className="email-checkout__overlay">
      <PaymentHeader step={3} onBack={onBack} />
      <div className="email-checkout__container">
        <div className="email-checkout__form-container">
          <form className="email-checkout__form" onSubmit={handleSubmit}>
            <div className="email-checkout__steps-underline"></div>
            <label className="email-checkout__label" id="firstName">
              {t("payment.personalDetails.firstName")}
              <input
                id="firstName"
                type="text"
                className="email-checkout__input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label" id="lastName">
              {t("payment.personalDetails.lastName")}
              <input
                id="lastName"
                type="text"
                className="email-checkout__input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label className="email-checkout__label" id="country">
              {t("payment.personalDetails.countryOfResidence")}
              <select
                id="country"
                className="email-checkout__input email-checkout__select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="email-checkout__label" id="nationality">
              {t("payment.personalDetails.nationality")}
              <select
                id="nationality"
                className="email-checkout__input email-checkout__select"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              >
                {countryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label
              id="phoneNumber"
              className="email-checkout__label"
              style={{ flexDirection: "column" }}
            >
              <span style={{ whiteSpace: "nowrap" }}>
                {t("payment.personalDetails.phoneNumber")}
                <span
                  id="phoneNumber"
                  style={{
                    color: "#18142B",
                    fontSize: 14,
                    fontWeight: 200,
                  }}
                >
                  {/* (PREFERRED NUMBER) */}
                </span>{" "}
                {/* * */}
              </span>
              <div className="email-checkout__phone-row">
                <select
                  id="countryCode"
                  className="email-checkout__country-code-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {phoneCodeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <input
                  id="phoneNumber"
                  type="tel"
                  className="email-checkout__input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ letterSpacing: "5px", width: "120px" }}
                />
              </div>
            </label>

            <div
              className="email-checkout__summary"
              style={{
                border: "1px solid var(--color-checkout-summary-border)",
              }}
            >
              <div
                className="email-checkout__summary-title"
                style={{ color: "var(--color-email-form-label)" }}
              >
                {t("payment.orderSummary.title")}
              </div>
              <div className="email-checkout__summary-row email-checkout__summary-row--column">
                <span
                  className="email-checkout__summary-label"
                  style={{ color: "var(--color-email-form-label)" }}
                >
                  {t("payment.orderSummary.datesAndGuests")}
                </span>
                <span
                  className="email-checkout__summary-value"
                  style={{
                    color: "var(--color-email-form-label)",
                    fontWeight: 600,
                    fontSize: 15,
                  }}
                >
                  THU 08- FEB 2025 &nbsp; ADULT - 2 &nbsp; CHILDREN - 1
                </span>
              </div>
              <div
                className="email-checkout__summary-totals"
                style={{
                  color: "var(--color-email-form-label)",
                  backgroundColor: "var(--color-checkout-summary-bg)",
                  border: "1px solid var(--color-checkout-summary-border)",
                }}
              >
                <div className="email-checkout__summary-row">
                  <span>{t("payment.orderSummary.subTotal")}</span>
                  <span>AED 935.71</span>
                </div>
                <div className="email-checkout__summary-row">
                  <span>{t("payment.orderSummary.vatAndTax")}</span>
                  <span>+ 49.29 VAT & Tax</span>
                </div>
                <div className="email-checkout__summary-row email-checkout__summary-row--total">
                  <span>{t("payment.orderSummary.total")}</span>
                  <span>AED 985.00</span>
                </div>
              </div>
            </div>

            <div
              className="email-checkout__promo-box"
              style={{
                backgroundColor: "var(--color-checkout-summary-bg)",
                border: "1px solid var(--color-checkout-summary-border)",
              }}
            >
              <label
                id="promoCode"
                className="email-checkout__label"
                style={{ marginBottom: 0 }}
              >
                {t("payment.orderSummary.promoCode.label")}
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  id="promoCode"
                  type="text"
                  className="email-checkout__input email-checkout__promo-input"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                />
                <button
                  type="button"
                  className="email-checkout__promo-apply"
                  onClick={onApplyPromo}
                >
                  {t("payment.orderSummary.promoCode.apply")}
                </button>
              </div>
            </div>

            <div className="email-checkout__checkboxes">
              <label
                id="acceptTerms"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  marginLeft: "-37px",
                  color: "#908999",
                }}
              >
                <input
                  id="acceptTerms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms((v) => !v)}
                  required
                />
                {t("payment.orderSummary.terms.acceptTerms")}{" "}
                <a
                  href="#"
                  style={{
                    color: "rgb(144, 137, 153)",
                    textDecoration: "underline",
                  }}
                >
                  {t("payment.orderSummary.terms.termsAndConditions")}
                </a>
              </label>
              <label
                id="receiveComms"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#908999",
                  marginLeft: "-37px",
                  marginTop: "20px",
                }}
              >
                <input
                  id="receiveComms"
                  type="checkbox"
                  checked={receiveComms}
                  onChange={() => setReceiveComms((v) => !v)}
                />
                {t("payment.orderSummary.terms.receiveCommunications")}
              </label>
            </div>

            <button
              className="email-checkout__btn"
              type="button"
              style={{
                backgroundColor: "var(--color-email-form-confirm-btn)",
                color: "var(--color-email-form-confirm-btn-clr)",
                border: "1px solid var(--color-checkout-summary-border)",
              }}
              disabled={!acceptTerms}
              onClick={() => {
                if (acceptTerms) {
                  onProceedToPayment();
                }
              }}
            >
              {t("payment.paymentDetails.proceedToPayment")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
