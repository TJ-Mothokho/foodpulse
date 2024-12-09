import { configureStore, createSlice } from '@reduxjs/toolkit';

// Step 1: Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    profilePicture: localStorage.getItem('profilePicture') || '', // Load profilePicture from localStorage
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
      localStorage.setItem('profilePicture', action.payload); // Save profilePicture to localStorage
    },
    clearProfilePicture: (state) => {
      state.profilePicture = '';
      localStorage.removeItem('profilePicture'); // Remove profilePicture from localStorage
    },
  },
});

export const { setProfilePicture, clearProfilePicture } = authSlice.actions;

const ProfilePictureStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default ProfilePictureStore;
