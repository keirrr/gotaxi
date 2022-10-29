import { createSlice } from "@reduxjs/toolkit";

export const searchingSlice = createSlice({
  name: "searching",
  initialState: {
    isSearching: false,
  },
  reducers: {
    setSearchingTrue: (state) => {
      state.isSearching = true;
    },
    setSearchingFalse: (state) => {
      state.isSearching = false;
    },
  },
});

export const { setSearchingTrue, setSearchingFalse } = searchingSlice.actions;

export default searchingSlice.reducer;
