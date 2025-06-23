import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  productId: "",
  performanceData: [],
};

const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
        setPerformanceData: (state, action) => {
            state.performanceData = action.payload;
        },
        clearPerformance: (state) => {
            state.startDate = "";
            state.endDate = "";
            state.productId = "";
            state.performanceData = [];
        },
    },
});

export const { 
setStartDate, setEndDate, setProductId, clearPerformance, setPerformanceData } = performanceSlice.actions;
export default performanceSlice.reducer; 