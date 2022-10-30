import { createSlice } from "@reduxjs/toolkit";

export const searchingSlice = createSlice({
  name: "searching",
  initialState: {
    isSearching: false,
    searchingType: "",
  },
  reducers: {
    setSearchingTrue: (state) => {
      state.isSearching = true;
    },
    setSearchingFalse: (state) => {
      state.isSearching = false;
    },
    setSearchingType: (state, action) => {
      state.searchingType = action.payload;
    },
  },
});

export const { setSearchingTrue, setSearchingFalse, setSearchingType } =
  searchingSlice.actions;

export default searchingSlice.reducer;
