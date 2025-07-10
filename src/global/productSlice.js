import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  allProducts: [],
  selectedProduct: {},
  parks: [],
  currentPark: "",
  currentSort: "",
  searchQuery: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearProducts: (state) => {
      state.allProducts = [];
      state.selectedProduct = {};
    },
    setParks: (state, action) => {
      state.parks = action.payload;
    },
    setCurrentPark: (state, action) => {
      state.currentPark = action.payload;
    },
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

const persistConfig = {
  key: 'yasIslandProduct',
  storage,
  whitelist: ['allProducts', 'parks', 'currentPark', 'currentSort'] // Only persist these fields
};

export const {
  setProducts,
  clearProducts,
  setSelectedProduct,
  setParks,
  setCurrentPark,
  setCurrentSort,
  setSearchQuery,
} = productSlice.actions;

const persistedProductReducer = persistReducer(persistConfig, productSlice.reducer);
export default persistedProductReducer;
