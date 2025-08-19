import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoomLevel: 1,
  isDarkMode: false,
  theme: "theme-light",
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (state.isDarkMode) {
        state.theme = "theme-dark";
      } else {
        state.theme = "theme-light";
      }
    },
    setColorMode: (state, action) => {
      const mode = action.payload;
      if (mode === "normal") {
        state.isDarkMode = false;
        state.theme = "theme-dark";
      } else if (mode === "invert") {
        state.isDarkMode = true;
        state.theme = "theme-light";
      }
    },
  },
});

export const { setZoomLevel, toggleDarkMode, setColorMode } =
  accessibilitySlice.actions;
export default accessibilitySlice.reducer;
