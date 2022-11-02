import { createSlice } from "@reduxjs/toolkit";

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: {
    selectedItem: "regular",
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;
