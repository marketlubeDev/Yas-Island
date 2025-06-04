import { configureStore } from "@reduxjs/toolkit";
import responsiveReducer from "./responsiveSlice";

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
  },
});

export default store;
