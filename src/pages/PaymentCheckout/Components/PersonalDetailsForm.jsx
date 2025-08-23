import React, { useState, useEffect } from "react";
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
import {
  updateTermsAcceptance,
  updatePersonalDetails,
} from "../../../global/checkoutSlice";
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
  hasError = false,
  placeholder = "",
  isRTL = false,
  readOnly = false,
  onFocus,
}) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        className={`form-group__input ${hasError ? "error" : ""} ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        readOnly={readOnly}
        style={{
          width: "100%",
          paddingRight: !isRTL && button ? "28px" : undefined,
          paddingLeft: isRTL && button ? "28px" : undefined,
        }}
        placeholder={hasError ? placeholder : ""}
      />
      {button && (
        <div
          className="form-group__button"
          style={{
            position: "absolute",
            [isRTL ? "left" : "right"]: "0",
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
  hasError = false,
  placeholder = "",
  onClearError,
}) => {
  const selectedOption =
    value && value !== ""
      ? options.find((option) => option.value === value)
      : null;

  const handleInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      return inputValue.replace(/[0-9]/g, ""); // remove digits
    }
    return inputValue;
  };

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
      borderBottom: hasError
        ? "2px solid var(--color-error-text, #ff4d4f)"
        : "1px solid var(--ip-bodr-btm)",
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
        borderBottom: hasError
          ? "2px solid var(--color-error-text, #ff4d4f)"
          : "1px solid var(--ip-bodr-btm)",
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
      color: hasError
        ? "var(--color-error-text, #ff4d4f)"
        : "var(--color-base-text-secondary)",
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
        onFocus={onClearError}
        onMenuOpen={onClearError}
        onChange={(selectedOption) => {
          onChange(selectedOption?.value || "");
          if (onClearError) onClearError();
        }}
        options={options}
        onInputChange={handleInputChange}
        components={{
          Option: customOption,
          SingleValue: customSingleValue,
        }}
        styles={customStyles}
        placeholder={hasError ? placeholder || label : ""}
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

const PhoneInputComponent = ({
  label,
  phoneNumber,
  onPhoneNumberChange,
  hasError = false,
  countryIso = "ae",
  isRTL = false,
  onFocus,
}) => (
  <div className="form-group">
    <label className="form-group__label">{label}</label>
    <PhoneInput
      country={countryIso || "ae"}
      value={phoneNumber || ""}
      onChange={onPhoneNumberChange}
      inputClass={`form-group__phone-input${hasError ? " error" : ""}`}
      containerClass="form-group__phone-container"
      buttonClass="form-group__phone-button"
      dropdownClass="form-group__phone-dropdown"
      enableSearch={false}
      disableDropdown={true}
      countryCodeEditable={false}
      inputProps={{ onFocus }}
      /* allow full dataset so library can resolve dial codes reliably */
      containerStyle={{
        width: "100%",
        position: "relative",
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
        paddingLeft: isRTL ? "8px" : "44px",
        paddingRight: isRTL ? "44px" : "8px",
        direction: "ltr",
        textAlign: isRTL ? "right" : "left",
      }}
      buttonStyle={{
        border: "none",
        borderBottom: "1px solid var(--ip-bodr-btm)",
        borderRadius: "0",
        background: "transparent",
        height: "40px",
        padding: "8px 2px",
        width: "40px",
        position: isRTL ? "absolute" : undefined,
        right: isRTL ? 0 : undefined,
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
  const isRTL = currentLanguage === "ar";
  const [termsAndConditions, setTermsAndConditions] = useState(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // Some ISO codes from the country list are not present in react-phone-input-2 dataset.
  // Provide sensible fallbacks so dial codes render instead of defaulting to US.
  const normalizeIsoForDialCode = (iso) => {
    const m = {
      ax: "fi", // Åland → Finland
      gg: "gb", // Guernsey → UK
      je: "gb", // Jersey → UK
      im: "gb", // Isle of Man → UK
      sj: "no", // Svalbard → Norway
      bq: "nl", // Caribbean Netherlands → Netherlands
      gf: "fr", // French Guiana → France
      gp: "fr", // Guadeloupe → France
      mq: "fr", // Martinique → France
      yt: "fr", // Mayotte → France
      re: "fr", // Réunion → France
      pm: "fr", // Saint Pierre & Miquelon → France
      bl: "fr", // Saint Barthélemy → France
      mf: "fr", // Saint Martin → France
      fo: "dk", // Faroe Islands → Denmark
      gi: "gb", // Gibraltar → UK
      as: "us", // American Samoa → US (+1 684)
      ai: "gb", // Anguilla → UK plan (+1 264)
      vi: "us", // US Virgin Islands → US (+1 340)
      pr: "us", // Puerto Rico → US (+1 787 / 939)
      ms: "gb", // Montserrat → UK plan (+1 664)
      ky: "gb", // Cayman Islands → UK plan (+1 345)
      bm: "gb", // Bermuda → UK plan (+1 441)
      // etc — all NANP (North American Numbering Plan) territories can map to "us" or "gb"
    };
    return m[iso] || iso || "ae";
  };

  // Exclude territories that don't reliably map to dial codes in react-phone-input-2
  const EXCLUDED_RESIDENCE_ISOS = new Set([
    "AX", // Åland Islands
    "CC", // Cocos (Keeling) Islands
    "GG", // Guernsey
    "JE", // Jersey
    "IM", // Isle of Man
    "SJ", // Svalbard and Jan Mayen
    "BQ", // Caribbean Netherlands
    "GF", // French Guiana
    "GP", // Guadeloupe
    "MQ", // Martinique
    "YT", // Mayotte
    "RE", // Réunion
    "PM", // Saint Pierre and Miquelon
    "BL", // Saint Barthélemy
    "MF", // Saint Martin
    "AS", // American Samoa
    "AI", // Anguilla
    "VI", // US Virgin Islands
    "PR", // Puerto Rico
    "MS", // Montserrat
    "KY", // Cayman Islands
    "BM", // Bermuda
    "AQ", // Antarctica
  ]);

  // Name must be 2-50 characters, only letters, spaces, apostrophes, hyphens
  const nameRegex = /^[a-zA-Z\s'-]{2,50}$/;
  // Inputs below bind directly to Redux `checkout` state

  // Generate countries list based on current language
  const countryCodes = countries.getAlpha2Codes();
  const ALL_COUNTRIES = Object.keys(countryCodes)
    .map((code) => ({
      value: code,
      label: countries.getName(code, currentLanguage === "ar" ? "ar" : "en"),
      code: code.toLowerCase(),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const RESIDENCE_COUNTRIES = ALL_COUNTRIES.filter(
    (c) => !EXCLUDED_RESIDENCE_ISOS.has(c.value)
  );

  const handleInputChange = (field) => (value) => {
    const updateData = {};
    switch (field) {
      case "firstName":
      case "lastName":
        // Strip out invalid characters while typing
        const cleaned = value.replace(/[^a-zA-Z\s'-]/g, "");
        updateData[field] = cleaned;
        break;

      case "email":
        updateData.emailId = value;
        break;

      case "phoneNumber":
        updateData.phoneNumber = value;
        break;

      case "country":
        updateData.country = value;
        updateData.phoneNumber = "";
        break;

      case "nationality":
        updateData.nationality = value;
        break;

      default:
        updateData[field] = value;
    }
    dispatch(updatePersonalDetails(updateData));
    // Clear error on interaction
    const fieldMap = {
      email: "email",
      phoneNumber: "phoneNumber",
      firstName: "firstName",
      lastName: "lastName",
      country: "country",
      nationality: "nationality",
    };
    const key = fieldMap[field] || field;
    setFieldErrors((prev) => ({ ...prev, [key]: false }));
  };

  // Country change handled in handleInputChange("country")

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
    e.stopPropagation(); // prevent label from toggling checkbox when link is clicked

    try {
      // Get the first productId from checkout items, or use a default value
      const productId = checkout?.items?.[0]?.productMasterid;
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
      toast.error(t("toastMessages.failedToLoadTermsAndConditions"), {
        position: "top-center",
      });
    }
  };

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false);
  };

  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    country: false,
    nationality: false,
  });

  // Ensure default nationality is UAE if missing
  useEffect(() => {
    if (!checkout.nationality || checkout.nationality.trim() === "") {
      dispatch(updatePersonalDetails({ nationality: "AE" }));
    }
  }, [checkout.nationality, dispatch]);

  const validateFieldsForPlaceholders = () => {
    const phoneDigits = String(checkout.phoneNumber || "").replace(/\D/g, "");
    const next = {
      firstName:
        !checkout.firstName ||
        checkout.firstName.trim().length < 2 ||
        !nameRegex.test(checkout.firstName),
      lastName:
        !checkout.lastName ||
        checkout.lastName.trim().length < 1 ||
        !nameRegex.test(checkout.lastName),
      email:
        !checkout.emailId ||
        !String(checkout.emailId).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      phoneNumber: phoneDigits.length <= 3,
      country: !checkout.country,
      nationality: !checkout.nationality,
    };
    setFieldErrors(next);
    return next;
  };

  useEffect(() => {
    const showErrors = () => {
      const phoneDigits = String(checkout.phoneNumber || "").replace(/\D/g, "");
      const next = {
        firstName: !checkout.firstName || checkout.firstName.trim().length < 2,
        lastName: !checkout.lastName || checkout.lastName.trim().length < 1,
        email:
          !checkout.emailId ||
          !String(checkout.emailId).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        phoneNumber: phoneDigits.length <= 3,
        country: !checkout.country,
        nationality: !checkout.nationality,
      };
      setFieldErrors(next);
    };
    window.addEventListener("paymentForm:showFieldErrors", showErrors);
    return () =>
      window.removeEventListener("paymentForm:showFieldErrors", showErrors);
  }, [checkout]);

  return (
    <div className="payment-form__left">
      <div className="form-group-row">
        <FormInput
          label={t("payment.personalDetails.firstName")}
          value={checkout.firstName || ""}
          onChange={handleInputChange("firstName")}
          hasError={fieldErrors.firstName}
          placeholder={t("payment.personalDetails.firstName")}
          onFocus={() =>
            setFieldErrors((prev) => ({ ...prev, firstName: false }))
          }
        />
        <FormInput
          label={t("payment.personalDetails.lastName")}
          value={checkout.lastName || ""}
          onChange={handleInputChange("lastName")}
          hasError={fieldErrors.lastName}
          placeholder={t("payment.personalDetails.lastName")}
          onFocus={() =>
            setFieldErrors((prev) => ({ ...prev, lastName: false }))
          }
        />
      </div>

      <div className="form-group-row">
        <FormSelectWithSearch
          label={t("payment.personalDetails.countryOfResidence")}
          value={checkout.country || ""}
          onChange={handleInputChange("country")}
          options={RESIDENCE_COUNTRIES}
          hasError={fieldErrors.country}
          placeholder={t("payment.personalDetails.countryOfResidence")}
          onClearError={() =>
            setFieldErrors((prev) => ({ ...prev, country: false }))
          }
        />
        <FormSelectWithSearch
          label={t("payment.personalDetails.nationality")}
          value={checkout.nationality || "AE"}
          onChange={handleInputChange("nationality")}
          options={ALL_COUNTRIES}
          hasError={fieldErrors.nationality}
          placeholder={t("payment.personalDetails.nationality")}
          onClearError={() =>
            setFieldErrors((prev) => ({ ...prev, nationality: false }))
          }
        />
      </div>

      <div className="form-group-row">
        <FormInput
          label={t("payment.personalDetails.email")}
          value={checkout.emailId || ""}
          onChange={handleInputChange("email")}
          type="email"
          readOnly
          hasError={fieldErrors.email}
          placeholder={t("payment.personalDetails.email")}
          isRTL={isRTL}
          onFocus={() => setFieldErrors((prev) => ({ ...prev, email: false }))}
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
                marginRight: isRTL ? 0 : "5px",
                marginLeft: isRTL ? "5px" : 0,
              }}
            >
              <FaEdit size={18} color="#666" />
            </button>
          }
        />
        <PhoneInputComponent
          key={normalizeIsoForDialCode(
            (checkout.country || "AE").toLowerCase()
          )}
          label={t("payment.personalDetails.phoneNumber")}
          phoneNumber={checkout.phoneNumber || ""}
          onPhoneNumberChange={handleInputChange("phoneNumber")}
          hasError={fieldErrors.phoneNumber}
          countryIso={normalizeIsoForDialCode(
            (checkout.country || "AE").toLowerCase()
          )}
          isRTL={isRTL}
          onFocus={() =>
            setFieldErrors((prev) => ({ ...prev, phoneNumber: false }))
          }
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
            <a
              href="#"
              className="terms-link"
              role="button"
              tabIndex={0}
              onMouseDown={(e) => {
                // avoid label click triggering checkbox toggle before click fires
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleTermsClick(e);
                }
              }}
              onClick={handleTermsClick}
            >
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
        onClick={() => {
          const errs = validateFieldsForPlaceholders();
          if (
            errs.firstName ||
            errs.lastName ||
            errs.email ||
            errs.phoneNumber ||
            errs.country ||
            errs.nationality
          ) {
            // do nothing, PaymentDetails.validate will also toast; placeholders will show
          }
          handleProceedToPayment();
        }}
        disabled={isPending}
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
