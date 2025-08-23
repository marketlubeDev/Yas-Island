import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function GlobalThemeClass() {
  const theme = useSelector((state) => state.accessibility.theme);

  useEffect(() => {
    // Apply theme class to document element
    document.documentElement.className = theme;

    // Also apply color-scheme property for better browser integration
    if (theme === "theme-dark") {
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.style.colorScheme = "light";
    }
  }, [theme]);

  return null;
}
