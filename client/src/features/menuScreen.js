// Slice is a collection of reducers and actions for a single feature
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: "logout",
};

// Creating a slice requires a string name to identify the slice,
// an initial state value, and one or more reducer functions to define how the state can be updated.
export const menuScreen = createSlice({
  name: "menuScreen",
  initialState,
  reducers: {
    changeScreenTo: (state, action) => {
      state.screen = action.payload
    }
  },
});

export const { changeScreenTo } = menuScreen.actions

export default menuScreen.reducer
