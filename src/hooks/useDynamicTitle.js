import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getRouteConfig } from "../config/routeConfig";

export const useDynamicTitle = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    // Get route-specific configuration
    const routeConfig = getRouteConfig(location.pathname);
    
    // Update document title based on route
    const pageTitle = t(routeConfig.titleKey);
    document.title = pageTitle;
    
    // Update favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon && routeConfig.favicon) {
      favicon.href = routeConfig.favicon;
    }
  }, [currentLanguage, t, location.pathname]);
};
