import { createSlice } from "@reduxjs/toolkit";

const locationInfoSlice = createSlice({
  name: "locationInfo",
  initialState: {
    startLat: null,
    startLng: null,
    startLocationName: null,
    destLat: null,
    destLng: null,
    destLocationName: null,
    totalDistance: 0,
    totalTime: 0,
    price: null,
    routeFound: false,
  },
  reducers: {
    setStartLat: (state, action) => {
      state.startLat = action.payload;
    },
    setStartLng: (state, action) => {
      state.startLng = action.payload;
    },
    setStartLocationName: (state, action) => {
      state.startLocationName = action.payload;
    },
    setDestLat: (state, action) => {
      state.destLat = action.payload;
    },
    setDestLng: (state, action) => {
      state.destLng = action.payload;
    },
    setDestLocationName: (state, action) => {
      state.destLocationName = action.payload;
    },
    setDistance: (state, action) => {
      state.totalDistance = action.payload;
    },
    setTime: (state, action) => {
      state.totalTime = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRouteFound: (state, action) => {
      state.routeFound = action.payload;
    },
  },
});

export const {
  setStartLat,
  setStartLng,
  setStartLocationName,
  setDestLat,
  setDestLng,
  setDestLocationName,
  setDistance,
  setTime,
  setPrice,
  setRouteFound,
} = locationInfoSlice.actions;

export default locationInfoSlice.reducer;
