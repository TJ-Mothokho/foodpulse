import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    role: localStorage.getItem('role') || '', // Load role from localStorage
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('role', action.payload); // Save role to localStorage
    },
    clearRole: (state) => {
      state.role = '';
      localStorage.removeItem('role'); // Remove role from localStorage
    },
  },
});

export const { setRole, clearRole } = authSlice.actions;

const RoleStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default RoleStore;
