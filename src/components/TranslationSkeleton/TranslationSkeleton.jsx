import React from "react";
import Loader from "../Loading/Loader";
import "./TranslationSkeleton.css";

const TranslationSkeleton = () => {
  return (
    <div className="translation-skeleton-wrapper">
      <div className="translation-skeleton-container">
        <Loader />
      </div>
    </div>
  );
};

export default TranslationSkeleton;
