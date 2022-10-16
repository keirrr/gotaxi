// Create Redux store
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationSlice";
import locationCoordsSlice from "./locationCoordsSlice";

export const store = configureStore({
  reducer: {
    // Add notificationSlice to the Store
    notification: notificationReducer,
    locationCoords: locationCoordsSlice,
  },
});
