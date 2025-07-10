import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: null,
  isOrderCreated: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderData: (state, action) => {
      state.orderData = action.payload;
      state.isOrderCreated = true;
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.isOrderCreated = false;
    },
  },
});

export const { setOrderData, clearOrderData } = orderSlice.actions;
export default orderSlice.reducer; 