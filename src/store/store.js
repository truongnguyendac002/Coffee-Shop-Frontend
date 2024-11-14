import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart : cartReducer
  },
});
