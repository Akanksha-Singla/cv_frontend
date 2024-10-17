// features/cvSlice.js
import { createSlice } from '@reduxjs/toolkit';


const isAuthenticated = !!localStorage.getItem("access_token");
console.log("isAuthenticated",isAuthenticated)

const initialState = {
  isLogin: isAuthenticated,  // Initial state, can be null or some default value
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin =  action.payload ;  // Updates the cvId in state
    },
   
  },
});

// Export the actions
export const { setIsLogin } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer

