import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "./global/store";

// Import translations
import { en } from "./translations/en";
import { ar } from "./translations/ar";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ar: {
      translation: ar,
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Subscribe to Redux store changes
store.subscribe(() => {
  const currentLanguage = store.getState().language.currentLanguage;
  if (i18n.language !== currentLanguage) {
    i18n.changeLanguage(currentLanguage);
  }
});

export default i18n;
