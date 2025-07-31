import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countries from "i18n-iso-countries";
import ReactCountryFlag from "react-country-flag";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCheckoutEmail,
  updatePersonalDetails,
} from "../../../global/checkoutSlice";

// Import language files
import enCountries from "i18n-iso-countries/langs/en.json";
import arCountries from "i18n-iso-countries/langs/ar.json";

// Register languages for country names
countries.registerLocale(enCountries);
countries.registerLocale(arCountries);

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  button = null,
  isRTL = false,
}) => (
  <label
    className="email-checkout__label"
    id={label.toLowerCase().replace(/\s+/g, "")}
  >
    {label}
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        className={`email-checkout__input ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      {button && (
        <div
          style={{
            position: "absolute",
            [isRTL ? "left" : "right"]: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {button}
        </div>
      )}
    </div>
  </label>
);

const FormSelectWithSearch = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption =
    value && value !== ""
      ? options.find((option) => option.value === value)
      : null;

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <label
      className="email-checkout__label"
      id={label.toLowerCase().replace(/\s+/g, "")}
    >
      {label}
      <div className="custom-select-container" style={{ position: "relative" }}>
        <div
          className="custom-select-control"
          style={{
            border: "none",
            borderBottom: "1px solid var(--ip-bodr-btm)",
            borderRadius: "0",
            backgroundColor: "transparent",
            minHeight: "40px",
            height: "40px",
            padding: "0",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflow: "hidden",
                flex: 1,
              }}
            >
              <ReactCountryFlag
                countryCode={selectedOption.code}
                svg
                style={{ width: "20px", height: "15px", flexShrink: 0 }}
              />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: "1.2",
                  fontSize: "14px",
                }}
              >
                {selectedOption.label}
              </span>
            </div>
          ) : (
            <span style={{ color: "var(--color-base-text-secondary)" }}>
              Select a country
            </span>
          )}
          <div
            style={{
              color: "var(--color-base-text-secondary)",
              padding: "0 8px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            ▼
          </div>
        </div>

        {isOpen && (
          <div
            className="custom-select-menu"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "var(--color-base-bg)",
              border: "1px solid var(--ip-bodr-btm)",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="custom-select-option"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor:
                    option.value === value
                      ? "var(--color-base-primary)"
                      : "transparent",
                  color:
                    option.value === value
                      ? "white"
                      : "var(--color-base-text-secondary)",
                }}
                onClick={() => handleSelect(option)}
                onMouseEnter={(e) => {
                  if (option.value !== value) {
                    e.target.style.backgroundColor = "var(--color-base-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (option.value !== value) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              >
                <ReactCountryFlag
                  countryCode={option.code}
                  svg
                  style={{ width: "20px", height: "15px" }}
                />
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </label>
  );
};

const PhoneInputComponent = ({ label, phoneNumber, onPhoneNumberChange }) => (
  <label className="email-checkout__label" id="phoneNumber">
    {label}
    <PhoneInput
      country={"ae"}
      value={phoneNumber || ""}
      onChange={onPhoneNumberChange}
      inputClass="email-checkout__phone-input"
      containerClass="email-checkout__phone-container"
      buttonClass="email-checkout__phone-button"
      dropdownClass="email-checkout__phone-dropdown"
      enableSearch={true}
      disableSearchIcon={true}
      preferredCountries={["ae", "in", "us", "gb"]}
      containerStyle={{
        width: "100%",
      }}
      inputStyle={{
        width: "100%",
        height: "40px",
        fontSize: "1rem",
        border: "none",
        borderBottom: "1px solid var(--ip-bodr-btm)",
        borderRadius: "0",
        background: "transparent",
        color: "var(--color-base-text-secondary)",
        padding: "8px 0",
        paddingLeft: "58px",
      }}
      buttonStyle={{
        border: "none",
        borderBottom: "1px solid var(--ip-bodr-btm)",
        borderRadius: "0",
        background: "transparent",
        height: "40px",
        padding: "8px 4px",
        width: "50px",
      }}
    />
  </label>
);

function InputFieldsMbl() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux state
  const checkout = useSelector((state) => state.checkout);
  const { email } = useSelector((state) => state.otp);
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  // Generate countries list based on current language
  const COUNTRIES = useMemo(() => {
    const countryCodes = countries.getAlpha2Codes();
    return Object.keys(countryCodes)
      .map((code) => ({
        value: code,
        label: countries.getName(code, currentLanguage === "ar" ? "ar" : "en"),
        code: code.toLowerCase(),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [currentLanguage]);

  // Initialize form data from Redux state
  const [formData, setFormData] = useState({
    firstName: checkout.firstName || "",
    lastName: checkout.lastName || "",
    email: checkout.emailId || "",
    country: checkout.country || "",
    nationality: checkout.nationality || "",
    phoneNumber: checkout.phoneNumber || "",
  });

  const handleInputChange = (field) => (value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    // Update Redux state
    dispatch(
      updatePersonalDetails({
        firstName: updatedFormData.firstName,
        lastName: updatedFormData.lastName,
        country: updatedFormData.country,
        nationality: updatedFormData.nationality,
        emailId: updatedFormData.email,
        phoneNumber: updatedFormData.phoneNumber,
      })
    );
  };

  // Set email from Redux state if available
  useEffect(() => {
    if (email) {
      const updatedFormData = { ...formData, email };
      setFormData(updatedFormData);
      dispatch(setCheckoutEmail(email));
      dispatch(
        updatePersonalDetails({
          ...checkout,
          emailId: email,
        })
      );
    }
  }, [email, dispatch]);

  // Sync with Redux state changes
  useEffect(() => {
    setFormData({
      firstName: checkout.firstName || "",
      lastName: checkout.lastName || "",
      email: checkout.emailId || "",
      country: checkout.country || "",
      nationality: checkout.nationality || "",
      phoneNumber: checkout.phoneNumber || "",
    });
  }, [checkout]);

  const isRTL = i18n.language === "ar";

  return (
    <div className="email-checkout__form-container-inner">
      <FormInput
        label={t("payment.personalDetails.firstName")}
        value={formData.firstName}
        onChange={handleInputChange("firstName")}
      />
      <FormInput
        label={t("payment.personalDetails.lastName")}
        value={formData.lastName}
        onChange={handleInputChange("lastName")}
      />
      <FormInput
        label={t("payment.personalDetails.email")}
        value={formData.email}
        onChange={handleInputChange("email")}
        type="email"
        button={
          <button
            onClick={() => navigate("/email-verification")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              marginLeft: isRTL ? "5px" : "0",
              marginRight: isRTL ? "0" : "5px",
              marginBottom: "5px",
              order: isRTL ? -1 : 1,
            }}
          >
            <FaEdit size={18} color="#666" />
          </button>
        }
        isRTL={isRTL}
      />
      <FormSelectWithSearch
        label={t("payment.personalDetails.countryOfResidence")}
        value={formData.country}
        onChange={handleInputChange("country")}
        options={COUNTRIES}
      />
      <FormSelectWithSearch
        label={t("payment.personalDetails.nationality")}
        value={formData.nationality}
        onChange={handleInputChange("nationality")}
        options={COUNTRIES}
      />

      <PhoneInputComponent
        label={t("payment.personalDetails.phoneNumber")}
        phoneNumber={formData.phoneNumber}
        onPhoneNumberChange={handleInputChange("phoneNumber")}
      />
    </div>
  );
}

export default InputFieldsMbl;
