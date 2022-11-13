import { createSlice } from "@reduxjs/toolkit";

export const searchingSlice = createSlice({
  name: "searching",
  initialState: {
    isSearching: false,
    searchingType: "",
    searchResults: null,
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
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const {
  setSearchingTrue,
  setSearchingFalse,
  setSearchingType,
  setSearchResults,
} = searchingSlice.actions;

export default searchingSlice.reducer;
