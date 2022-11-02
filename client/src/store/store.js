// Create Redux store
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./notificationSlice";
import locationInfoSlice from "./locationInfoSlice";
import searchingSlice from "./searchingSlice";
import orderInfoSlice from "./orderInfoSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    locationInfo: locationInfoSlice,
    searching: searchingSlice,
    orderInfo: orderInfoSlice,
  },
});
