import { createSlice } from "@reduxjs/toolkit";

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

export const {
  setProducts,
  clearProducts,
  setSelectedProduct,
  setParks,
  setCurrentPark,
  setCurrentSort,
  setSearchQuery,
} = productSlice.actions;
export default productSlice.reducer;
