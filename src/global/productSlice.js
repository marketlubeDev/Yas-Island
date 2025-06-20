import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  selectedProduct: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log(action.payload);
            state.allProducts = action.payload;
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearProducts: (state) => {
            state.allProducts = [];
            state.selectedProduct = null;
        },  
            
    },
});

export const { 
    setProducts, clearProducts, setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;