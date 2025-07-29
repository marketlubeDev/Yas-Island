import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import countries from "i18n-iso-countries";
import ReactCountryFlag from "react-country-flag";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonLoading from "../../../components/Loading/ButtonLoading";
import { useSelector, useDispatch } from "react-redux";
import { updateTermsAcceptance } from "../../../global/checkoutSlice";
import getTermsAndCondition from "../../../serivces/termsandconditon/termsandconditionon";
import { toast } from "sonner";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

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
            border: "none",
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
    control: (provided) => ({
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

export default function PersonalDetailsForm({
  formData,
  setFormData,
  handleProceedToPayment,
  isPending,
  checkout,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

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

  // Set UAE as default country when component mounts
  useEffect(() => {
    if (!formData.country) {
      setFormData((prev) => ({ ...prev, country: "AE" }));
    }
  }, [formData.country, setFormData]);

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTermsChange = (type, checked) => {
    if (type === "terms") {
      dispatch(
        updateTermsAcceptance({
          isTnCAgrred: checked,
          isConsentAgreed: checkout.isConsentAgreed,
        })
      );
    } else if (type === "consent") {
      dispatch(
        updateTermsAcceptance({
          isTnCAgrred: checkout.isTnCAgrred,
          isConsentAgreed: checked,
        })
      );
    }
  };

  const handleTermsClick = async (e) => {
    e.preventDefault();

    try {
      // Get the first productId from checkout items, or use a default value
      const productId = checkout?.items?.[0]?.productMasterid || "69";
      const source = "web";

      const response = await getTermsAndCondition(
        `${currentLanguage}-AE`,
        productId,
        source
      );
      console.log("Terms and Conditions:", response);
      setTermsAndConditions(response);
      setIsTermsModalOpen(true);
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      toast.error("Failed to load terms and conditions");
    }
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
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
                marginRight: "5px",
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

      <div className="terms">
        <label
          className={`checkbox-container ${
            currentLanguage === "ar" ? "rtl" : ""
          }`}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={checkout.isTnCAgrred}
            onChange={(e) => handleTermsChange("terms", e.target.checked)}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.acceptTerms")}{" "}
            <a href="#" className="terms-link" onClick={handleTermsClick}>
              {t("payment.orderSummary.terms.termsAndConditions")}
            </a>
          </span>
        </label>

        <label
          className={`checkbox-container ${
            currentLanguage === "ar" ? "rtl" : ""
          }`}
        >
          <input
            type="checkbox"
            className="checkbox-input"
            checked={checkout.isConsentAgreed}
            onChange={(e) => handleTermsChange("consent", e.target.checked)}
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">
            {t("payment.orderSummary.terms.receiveCommunications")}
          </span>
        </label>
      </div>

      <button
        className="proceedbtn"
        onClick={handleProceedToPayment}
        disabled={isPending || !checkout.isTnCAgrred}
        style={{
          opacity: isPending || !checkout.isTnCAgrred ? 0.5 : 1,
          cursor:
            isPending || !checkout.isTnCAgrred ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? (
          <ButtonLoading />
        ) : (
          t("payment.paymentDetails.proceedToPayment")
        )}
      </button>

      <TermsAndConditionsModal
        isOpen={isTermsModalOpen}
        onClose={handleCloseTermsModal}
        termsAndConditions={termsAndConditions}
      />
    </div>
  );
}
