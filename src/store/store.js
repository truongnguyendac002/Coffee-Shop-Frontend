import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',     
  storage,         
};


const persistedUserReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,           
    forgotPassword: forgotPasswordReducer 
  },
});

export const persistor = persistStore(store);
