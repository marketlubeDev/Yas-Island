import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getRouteConfig } from "../config/routeConfig";

export const useDynamicTitle = () => {
  const { t, ready, i18n } = useTranslation();
  const location = useLocation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    const updateTitle = () => {
      // Get route-specific configuration
      const routeConfig = getRouteConfig(location.pathname);

      // Update document title based on route
      const pageTitle = t(routeConfig.titleKey);

      // Only update if we got a translated value (not the key itself)
      if (pageTitle && pageTitle !== routeConfig.titleKey) {
        document.title = pageTitle;
      }

      // Update favicon
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon && routeConfig.favicon) {
        favicon.href = routeConfig.favicon;
      }
    };

    // Update title immediately if translations are ready
    if (ready && i18n.hasResourceBundle(currentLanguage, "translation")) {
      updateTitle();
    }

    // Also listen for language changes
    const handleLanguageChanged = () => {
      setTimeout(updateTitle, 100); // Small delay to ensure translations are loaded
    };

    i18n.on("languageChanged", handleLanguageChanged);
    i18n.on("loaded", updateTitle);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
      i18n.off("loaded", updateTitle);
    };
  }, [currentLanguage, t, location.pathname, ready, i18n]);
};
