import React from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { getData } from "country-list";
import ReactCountryFlag from "react-country-flag";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const COUNTRIES = getData().map((country) => ({
  value: country.code,
  label: country.name,
  code: country.code.toLowerCase(),
}));

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  className = "",
  button = null,
}) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        className={`form-group__input ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%" }}
      />
      {button && (
        <div 
          className="form-group__button" 
          style={{ 
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none"
          }}
        >
          {button}
        </div>
      )}
    </div>
  </div>
);

const FormSelectWithSearch = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => {
  const selectedOption =
    value && value !== ""
      ? options.find((option) => option.value === value)
      : null;
  const customOption = ({ data, ...props }) => (
    <div {...props.innerProps} className="country-option">
      <ReactCountryFlag countryCode={data.code} svg className="country-flag" />
      <span className="country-name">{data.label}</span>
    </div>
  );

  const customSingleValue = ({ data }) => (
    <div className="country-single-value">
      <ReactCountryFlag countryCode={data.code} svg className="country-flag" />
      <span className="country-name">{data.label}</span>
    </div>
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      borderBottom: "1px solid var(--ip-bodr-btm)",
      borderRadius: "0",
      backgroundColor: "transparent",
      boxShadow: "none",
      minHeight: "40px",
      height: "40px",
      padding: "0",
      cursor: "text",
      display: "flex",
      alignItems: "center",
      "&:hover": {
        borderBottom: "1px solid var(--ip-bodr-btm)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      height: "40px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      color: "var(--color-base-text-secondary)",
      margin: "0",
      padding: "0",
      height: "40px",
      display: "flex",
      alignItems: "center",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--color-base-text-secondary)",
      height: "40px",
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--color-base-bg)",
      border: "1px solid var(--ip-bodr-btm)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var(--color-base-primary)"
        : state.isFocused
        ? "var(--color-base-hover)"
        : "transparent",
      "&:hover": {
        backgroundColor: "var(--color-base-hover)",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--color-base-text-secondary)",
      padding: "0 8px",
    }),
  };

  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <Select
        key={`${label}-${value}`}
        value={selectedOption}
        onChange={(selectedOption) => {
          onChange(selectedOption?.value || "");
        }}
        options={options}
        components={{
          Option: customOption,
          SingleValue: customSingleValue,
        }}
        styles={customStyles}
        placeholder=""
        isSearchable={true}
        isClearable={false}
        blurInputOnSelect={false}
        openMenuOnClick={true}
        openMenuOnFocus={true}
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        controlShouldRenderValue={true}
        className={className}
      />
    </div>
  );
};

const PhoneInputComponent = ({ label, phoneNumber, onPhoneNumberChange }) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <PhoneInput
      country={"ae"}
      value={phoneNumber && phoneNumber.startsWith("971") ? phoneNumber : "971"}
      onChange={onPhoneNumberChange}
      inputClass="form-group__phone-input"
      containerClass="form-group__phone-container"
      buttonClass="form-group__phone-button"
      dropdownClass="form-group__phone-dropdown"
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
  </div>
);

export default function PersonalDetailsForm({ formData, setFormData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="payment-form__left">
      <div className="form-group-row">
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
      </div>

      <div className="form-group-row">
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
      </div>

      <div className="form-group-row">
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
                marginRight: "5px"
              }}
            >
              <FaEdit size={18} color="#666" />
            </button>
          }
        />
        <PhoneInputComponent
          label={t("payment.personalDetails.phoneNumber")}
          phoneNumber={formData.phoneNumber}
          onPhoneNumberChange={handleInputChange("phoneNumber")}
        />
      </div>
    </div>
  );
}
