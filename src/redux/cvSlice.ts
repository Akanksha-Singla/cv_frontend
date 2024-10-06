// features/cvSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cvId: null,  // Initial state, can be null or some default value
};

const cvSlice = createSlice({
  name: 'cvSlice',
  initialState,
  reducers: {
    setCvId: (state, action) => {
      state.cvId = action.payload;  // Updates the cvId in state
    },
    clearCvId: (state) => {
      state.cvId = null;  // Optional: clear the CV ID when necessary
    },
  },
});

// Export the actions
export const { setCvId, clearCvId } = cvSlice.actions;
const cvReducer = cvSlice.reducer;
export default cvReducer

