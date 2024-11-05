import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import forgotPasswordReducer from "./forgotPasswordSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
  },
})