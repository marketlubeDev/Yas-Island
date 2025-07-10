import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../global/languageSlice";
import i18n from "../i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );
  const [language, setDisplayLanguage] = useState(
    currentLanguage === "ar" ? "العربية" : "English"
  );
  const [isRTL, setIsRTL] = useState(currentLanguage === "ar");

  useEffect(() => {
    const displayLanguage = currentLanguage === "ar" ? "العربية" : "English";
    setDisplayLanguage(displayLanguage);
    setIsRTL(currentLanguage === "ar");

    // Set document direction
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const toggleLanguage = (newDisplayLanguage) => {
    const newLang = newDisplayLanguage === "العربية" ? "ar" : "en";
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
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
