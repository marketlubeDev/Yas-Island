import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: accessibilityReducer,
  },
});

export default store;
