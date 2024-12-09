import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userID: localStorage.getItem('userID') || '', // Load userID from localStorage
  },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
      localStorage.setItem('userID', action.payload); // Save userID to localStorage
    },
    clearUserID: (state) => {
      state.userID = '';
      localStorage.removeItem('userID'); // Remove userID from localStorage
    },
  },
});

export const { setUserID, clearUserID } = authSlice.actions;

const UserIDStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default UserIDStore;
