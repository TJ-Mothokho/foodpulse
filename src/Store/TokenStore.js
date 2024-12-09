import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a single slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '', // Load token from localStorage
    userID: localStorage.getItem('userID') || '', 
    username: localStorage.getItem('username') || '', 
    role: localStorage.getItem('role') || '', 
    profilePicture: localStorage.getItem('profilePicture') || '', 
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
    setUserID: (state, action) => {
      state.userID = action.payload;
      localStorage.setItem('userID', action.payload); // Save userID to localStorage
    },
    clearUserID: (state) => {
      state.userID = '';
      localStorage.removeItem('userID'); // Remove userID from localStorage
    },
    setUsername: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload); // Save username to localStorage
    },
    clearUsername: (state) => {
      state.username = '';
      localStorage.removeItem('username'); // Remove username from localStorage
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem('role', action.payload); // Save role to localStorage
    },
    clearRole: (state) => {
      state.role = '';
      localStorage.removeItem('role'); // Remove role from localStorage
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
      localStorage.setItem('profilePicture', action.payload); // Save profilepicture to localStorage
    },
    clearProfilePicture: (state) => {
      state.profilePicture = '';
      localStorage.removeItem('profilePicture'); // Remove profilepicture from localStorage
    },
  },
});

// Export the actions
export const { setToken, clearToken, setUserID, clearUserID, setUsername, clearUsername, setRole, clearRole, setProfilePicture, clearProfilePicture } = authSlice.actions;

// Create and export the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
