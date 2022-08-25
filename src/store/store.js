import { configureStore } from '@reduxjs/toolkit'

import menuScreenReducer from '../features/menuScreen'

export const store = configureStore({
  reducer: {
      menuScreen: menuScreenReducer
  },
})