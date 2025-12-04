import React from "react";
import Loader from "../Loading/Loader";
import { useLanguage } from "../../context/LanguageContext";
import "./TranslationSkeleton.css";

const TranslationSkeleton = () => {
  const { isRTL } = useLanguage();

  return (
    <div className="translation-skeleton-wrapper" dir={isRTL ? "rtl" : "ltr"}>
      <div className="translation-skeleton-container">
        <Loader />
      </div>
    </div>
  );
};

export default TranslationSkeleton;
