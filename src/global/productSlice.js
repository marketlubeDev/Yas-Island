import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  selectedProduct: {},
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
        
            
    },
});

export const { 
    setProducts, clearProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;