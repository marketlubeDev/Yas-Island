import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <p className="footer__text">
          {t("footer.copyright", { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}
