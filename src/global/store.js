import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";
import checkoutReducer from "./checkoutSlice";
import productReducer from "./productSlice";
import perfomanceReducer from "./perfomanceSlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: accessibilityReducer,
    language: languageReducer,
    checkout: checkoutReducer,
    product: productReducer,
    perfomance: perfomanceReducer,
  },
});

export default store;
