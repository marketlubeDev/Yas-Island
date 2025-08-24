import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColorMode } from "../global/accessibilitySlice";

export default function GlobalThemeClass() {
  const dispatch = useDispatch();
  const { theme, isDarkMode } = useSelector((state) => state.accessibility);

  // Ensure theme stays in sync with isDarkMode after persist rehydration
  useEffect(() => {
    if (isDarkMode && theme !== "theme-dark") {
      dispatch(setColorMode("invert"));
    } else if (!isDarkMode && theme !== "theme-light") {
      dispatch(setColorMode("normal"));
    }
  }, [dispatch, isDarkMode, theme]);

  useEffect(() => {
    const root = document.documentElement;
    // Keep any other existing classes; only manage theme classes
    root.classList.remove("theme-light", "theme-dark");
    root.classList.add(theme);
    root.style.colorScheme = theme === "theme-dark" ? "dark" : "light";
  }, [theme]);

  return null;
}
