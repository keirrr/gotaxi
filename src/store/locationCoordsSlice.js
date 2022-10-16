import { createSlice } from "@reduxjs/toolkit";

const locationCoordsSlice = createSlice({
  name: "locationCoords",
  initialState: {
    startLat: null,
    startLng: null,
    destLat: null,
    destLng: null,
  },
  reducers: {
    setStartLat: (state, action) => {
      state.startLat = action.payload;
    },
    setStartLng: (state, action) => {
      state.startLng = action.payload;
    },
    setDestLat: (state, action) => {
      state.destLat = action.payload;
    },
    setDestLng: (state, action) => {
      state.destLng = action.payload;
    },
  },
});

export const { setStartLat, setStartLng, setDestLat, setDestLng } =
  locationCoordsSlice.actions;

export default locationCoordsSlice.reducer;
