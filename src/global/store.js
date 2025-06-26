import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";
import checkoutReducer from "./checkoutSlice";
import productReducer from "./productSlice";
import performanceReducer from "./performanceSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: accessibilityReducer,
    language: languageReducer,
    checkout: checkoutReducer,
    product: productReducer,
    performance: performanceReducer,
    cart: cartReducer,
  },
});

export default store;
