import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '', // Load token from localStorage
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = '';
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

const TokenStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default TokenStore;
