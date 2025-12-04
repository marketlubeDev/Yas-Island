import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
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
  // Initialize isRTL immediately based on currentLanguage (ar = rtl, others = ltr)
  const [isRTL, setIsRTL] = useState(currentLanguage === "ar");
  // Always start with loading true to prevent any content from showing
  // We'll check and update this immediately in useEffect
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);

  // Use useLayoutEffect for synchronous check before first paint
  useLayoutEffect(() => {
    const direction = currentLanguage === "ar" ? "rtl" : "ltr";
    setIsRTL(direction === "rtl");

    // Set document direction immediately
    if (typeof document !== "undefined") {
      document.documentElement.dir = direction;
      document.documentElement.lang = currentLanguage;
    }

    // Set i18n language immediately to prevent fallback to English
    // This ensures that even if translations aren't loaded, i18n knows the correct language
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }

    // Check if translations are loaded for this language
    const hasTranslations = i18n.hasResourceBundle(
      currentLanguage,
      "translation"
    );

    // If translations are not loaded, show loader
    // If translations are loaded, still show loader briefly (300ms) for better UX
    if (!hasTranslations) {
      setIsLoadingTranslations(true);
    } else {
      // Keep loader visible for at least 300ms even if translations are cached
      setTimeout(() => {
        setIsLoadingTranslations(false);
      }, 300);
    }
  }, [currentLanguage]);

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

        // Update RTL state based on loaded languages (more accurate)
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

      // Update document direction (already set in first useEffect, but update for accuracy)
      if (typeof document !== "undefined") {
        document.documentElement.dir = direction;
        document.documentElement.lang = currentLanguage;
      }
    }
  }, [currentLanguage, availableLanguages]);

  // Check if translations are loaded for the current language
  useEffect(() => {
    let timeoutId;
    let intervalId;
    let minimumDisplayTime = false;

    const checkTranslationsLoaded = () => {
      const hasTranslations = i18n.hasResourceBundle(
        currentLanguage,
        "translation"
      );

      // Only set to false if translations are loaded AND minimum display time has passed
      if (hasTranslations && minimumDisplayTime) {
        setIsLoadingTranslations(false);
      } else if (!hasTranslations) {
        setIsLoadingTranslations(true);
      }

      return hasTranslations;
    };

    // Ensure loader shows for at least 300ms for visibility
    setTimeout(() => {
      minimumDisplayTime = true;
      checkTranslationsLoaded();
    }, 300);

    // Check immediately
    const isLoaded = checkTranslationsLoaded();

    // If already loaded, wait for minimum display time then set to false
    if (isLoaded) {
      return;
    }

    // If not loaded, ensure loading state is true
    setIsLoadingTranslations(true);

    // Set up interval to check periodically (translations load asynchronously)
    intervalId = setInterval(() => {
      const loaded = checkTranslationsLoaded();
      if (loaded) {
        clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
      }
    }, 100);

    // Safety timeout: stop polling after 5 seconds
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsLoadingTranslations(false); // Assume loaded after timeout
    }, 5000);

    // Also listen to i18n events
    const handleLoaded = () => {
      if (checkTranslationsLoaded()) {
        clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
      }
    };

    const handleInitialized = () => {
      checkTranslationsLoaded();
    };

    i18n.on("loaded", handleLoaded);
    i18n.on("languageChanged", handleLoaded);
    i18n.on("initialized", handleInitialized);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      i18n.off("loaded", handleLoaded);
      i18n.off("languageChanged", handleLoaded);
      i18n.off("initialized", handleInitialized);
    };
  }, [currentLanguage]);

  const toggleLanguage = (newDisplayLanguage) => {
    const newLang = displayNameToCode(newDisplayLanguage, availableLanguages);
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        isRTL,
        availableLanguages,
        isLoadingTranslations,
      }}
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
