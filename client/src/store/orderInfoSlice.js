import { createSlice } from "@reduxjs/toolkit";

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: {
    selectedItem: "regular",
    isDiscountNow: false,
    discountValue: null,
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setIsDiscountNow: (state, action) => {
      state.isDiscountNow = action.payload;
    },
    setDiscountValue: (state, action) => {
      state.discountValue = action.payload;
    },
  },
});

export const { setSelectedItem, setIsDiscountNow, setDiscountValue } =
  orderInfoSlice.actions;

export default orderInfoSlice.reducer;
