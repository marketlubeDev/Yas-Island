import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import responsiveReducer from "./responsiveSlice";
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";
import checkoutReducer from "./checkoutSlice";
import productReducer from "./productSlice";
import performanceReducer from "./performanceSlice";
import cartReducer from "./cartSlice";
import otpReducer from "./otpSlice";


const cartPersistConfig = {
  key: "yasIslandCart",
  storage,
  whitelist: ["cartItems", "subtotal", "vatAndTax", "total", "isEmailVerification", "verificationEmail"], // persist only these fields
};

const languagePersistConfig = {
  key: "yasIslandLanguage",
  storage,
  whitelist: ["currentLanguage"], // persist only the current language
};

const accessibilityPersistConfig = {
  key: "yasIslandAccessibility",
  storage,
  whitelist: ["zoomLevel", "isDarkMode", "isHighContrast"], // persist accessibility settings
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedLanguageReducer = persistReducer(languagePersistConfig, languageReducer);
const persistedAccessibilityReducer = persistReducer(accessibilityPersistConfig, accessibilityReducer);

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: persistedAccessibilityReducer,
    language: persistedLanguageReducer,
    checkout: checkoutReducer,
    product: productReducer,
    performance: performanceReducer,
    cart: persistedCartReducer,
    otp: otpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
