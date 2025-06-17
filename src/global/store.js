import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: accessibilityReducer,
    language: languageReducer,
  },
});

export default store;
