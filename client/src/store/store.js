// Create Redux store
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationSlice";
import locationInfoSlice from "./locationInfoSlice";

export const store = configureStore({
  reducer: {
    // Add notificationSlice to the Store
    notification: notificationReducer,
    locationInfo: locationInfoSlice,
  },
});
