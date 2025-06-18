import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";
import checkoutReducer from "./checkoutSlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: accessibilityReducer,
    language: languageReducer,
    checkout: checkoutReducer,
  },
});

export default store;
