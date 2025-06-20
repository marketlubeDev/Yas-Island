import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
  productId: "",
};

const perfomanceSlice = createSlice({
    name: "perfomance",
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
        clearPerfomance: (state) => {
            state.startDate = "";
            state.endDate = "";
            state.productId = "";
        },  
            
    },
});

export const { 
    setStartDate, setEndDate, setProductId, clearPerfomance } = perfomanceSlice.actions;
export default perfomanceSlice.reducer; 