import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export const useDynamicTitle = () => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  useEffect(() => {
    // Update document title when language changes
    const pageTitle = t("pageTitle.title");
    document.title = pageTitle;
  }, [currentLanguage, t]);
};
