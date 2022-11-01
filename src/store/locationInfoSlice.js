import { createSlice } from "@reduxjs/toolkit";

const locationInfoSlice = createSlice({
  name: "locationInfo",
  initialState: {
    startLat: null,
    startLng: null,
    destLat: null,
    destLng: null,
    totalDistance: 0,
    totalTime: 0,
    routeFound: false,
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
    setDistance: (state, action) => {
      state.totalDistance = action.payload;
    },
    setTime: (state, action) => {
      state.totalTime = action.payload;
    },
    setRouteFound: (state, action) => {
      state.routeFound = action.payload;
    },
  },
});

export const {
  setStartLat,
  setStartLng,
  setDestLat,
  setDestLng,
  setDistance,
  setTime,
  setRouteFound,
} = locationInfoSlice.actions;

export default locationInfoSlice.reducer;