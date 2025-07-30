import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import responsiveReducer from "./responsiveSlice";

// Create a fallback storage for mobile browsers
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Mobile-friendly storage with better error handling
const createMobileStorage = () => {
  let storage;
  try {
    storage =
      typeof window !== "undefined" ? window.localStorage : createNoopStorage();
    // Test if localStorage actually works (some mobile browsers block it)
    const testKey = "__localStorage_test__";
    storage.setItem(testKey, "test");
    storage.removeItem(testKey);
  } catch (e) {
    console.warn("localStorage not available, using fallback storage");
    storage = createNoopStorage();
  }

  return createWebStorage("local");
};

const mobileStorage = createMobileStorage();
import accessibilityReducer from "./accessibilitySlice";
import languageReducer from "./languageSlice";
import checkoutReducer from "./checkoutSlice";
import productReducer from "./productSlice";
import performanceReducer from "./performanceSlice";
import cartReducer, { recalculateTotals } from "./cartSlice";
import otpReducer from "./otpSlice";
import orderReducer from "./orderSlice";
import qrCodeReducer from "./qrCodeSlice";

const cartPersistConfig = {
  key: "yasIslandCart",
  storage,
  whitelist: [
    "cartItems",
    "subtotal",
    "vatAndTax",
    "total",
    "isEmailVerification",
    "verificationEmail",
  ], // persist only these fields
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

const otpPersistConfig = {
  key: "yasIslandOTP",
  storage: mobileStorage, // Use mobile-friendly storage
  whitelist: ["email", "OTP"], // persist email and OTP data
  debug: process.env.NODE_ENV === "development", // Add debugging for persistence
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedLanguageReducer = persistReducer(
  languagePersistConfig,
  languageReducer
);
const persistedAccessibilityReducer = persistReducer(
  accessibilityPersistConfig,
  accessibilityReducer
);
const persistedOtpReducer = persistReducer(otpPersistConfig, otpReducer);

// Middleware to automatically recalculate cart totals
const cartRecalculationMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Check if this is a cart action that needs recalculation
  if (
    action.type?.startsWith("cart/") &&
    (action.type.includes("addToCart") ||
      action.type.includes("removeFromCart") ||
      action.type.includes("removeItemFromCart") ||
      action.type.includes("updateQuantity"))
  ) {
    // Get current state
    const state = store.getState();

    // Only recalculate if we have cart items and product list
    if (
      state.cart.cartItems.length > 0 &&
      state.product.allProducts.length > 0
    ) {
      // Dispatch recalculation after a short delay to ensure state is updated
      setTimeout(() => {
        store.dispatch(recalculateTotals());
      }, 0);
    }
  }

  return result;
};

const store = configureStore({
  reducer: {
    responsive: responsiveReducer,
    accessibility: persistedAccessibilityReducer,
    language: persistedLanguageReducer,
    checkout: checkoutReducer,
    product: productReducer,
    performance: performanceReducer,
    cart: persistedCartReducer,
    otp: persistedOtpReducer,
    order: orderReducer,
    qrCode: qrCodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }).concat(cartRecalculationMiddleware),
});

export const persistor = persistStore(store);
export default store;
