import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  selectedProduct: {},
  parks: [],
  currentPark: "",
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
  },
});

export const {
  setProducts,
  clearProducts,
  setSelectedProduct,
  setParks,
  setCurrentPark,
} = productSlice.actions;
export default productSlice.reducer;
