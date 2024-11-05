import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState : {
        email : ""
    }, 
    reducers : {
        setEmail(state , action) {
            state.email = action.payload;
        },
        clearEmail(state) {
            state.email = '';
          },
    }
})

export const { setEmail, clearEmail } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;