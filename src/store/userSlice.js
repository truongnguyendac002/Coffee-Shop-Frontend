import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, 
  status: 'idle', 
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; 
      // console.log("user" ,action.payload )
    },
    clearUser: (state) => {
      state.user = null;
    },
    setStatus: (state, action) => {
      state.status = action.payload; 
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});


export const { setUser, clearUser, setStatus, setError } = userSlice.actions;


export default userSlice.reducer;
