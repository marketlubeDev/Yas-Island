import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../global/languageSlice";
import i18n from "../i18n";
import {
  getAvailableLanguages,
  getLanguageDisplayName,
  getLanguageDirection,
  displayNameToCode,
} from "../utils/languageUtils";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [language, setDisplayLanguage] = useState("");
  const [isRTL, setIsRTL] = useState(false);

  // Load available languages on component mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await getAvailableLanguages();
        setAvailableLanguages(languages);

        // Set initial display language
        const displayLanguage = getLanguageDisplayName(
          currentLanguage,
          languages
        );
        setDisplayLanguage(displayLanguage);

        // Set initial RTL state
        const direction = getLanguageDirection(currentLanguage, languages);
        setIsRTL(direction === "rtl");
      } catch (error) {
        console.error("Failed to load languages:", error);
        // Fallback to hardcoded values
        setAvailableLanguages([
          { code: "en", name: "English", direction: "ltr" },
          { code: "ar", name: "العربية", direction: "rtl" },
        ]);
        setDisplayLanguage(currentLanguage === "ar" ? "العربية" : "English");
        setIsRTL(currentLanguage === "ar");
      }
    };

    loadLanguages();
  }, []);

  useEffect(() => {
    if (availableLanguages.length > 0) {
      const displayLanguage = getLanguageDisplayName(
        currentLanguage,
        availableLanguages
      );
      setDisplayLanguage(displayLanguage);

      const direction = getLanguageDirection(
        currentLanguage,
        availableLanguages
      );
      setIsRTL(direction === "rtl");

      // Set document direction
      document.documentElement.dir = direction;
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage, availableLanguages]);

  const toggleLanguage = (newDisplayLanguage) => {
    const newLang = displayNameToCode(newDisplayLanguage, availableLanguages);
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, isRTL, availableLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
