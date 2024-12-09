import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') || '', // Load username from localStorage
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload); // Save username to localStorage
    },
    clearUsername: (state) => {
      state.username = '';
      localStorage.removeItem('username'); // Remove username from localStorage
    },
  },
});

export const { setUsername, clearUsername } = authSlice.actions;

const UsernameStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default UsernameStore;
