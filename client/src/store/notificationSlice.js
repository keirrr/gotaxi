// Create slice
// Slice is a collection of Redux reducers for a single feature in app (here - notifications)
import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    content: "",
  },
  // Reducer is pure function that takes an action and prev state and returns new state
  reducers: {
    clearContent: (state) => {
      state.content = "";
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { clearContent, setContent } = notificationSlice.actions;

export default notificationSlice.reducer;
