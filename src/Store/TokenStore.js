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
    website: localStorage.getItem('website') || '', 
    bio: localStorage.getItem('bio') || '', 
    email: localStorage.getItem('email') || '', 
    isVerified: localStorage.getItem('isVerified') || '', 
    createdAt: localStorage.getItem('createdAt') || '', 
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
    setWebsite: (state, action) => {
      state.website = action.payload;
      localStorage.setItem('website', action.payload); // Save website to localStorage
    },
    clearWebsite: (state) => {
      state.website = '';
      localStorage.removeItem('website'); // Remove website from localStorage
    },
    setBio: (state, action) => {
      state.bio = action.payload;
      localStorage.setItem('bio', action.payload); // Save bio to localStorage
    },
    clearBio: (state) => {
      state.bio = '';
      localStorage.removeItem('bio'); // Remove bio from localStorage
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem('email', action.payload); // Save email to localStorage
    },
    clearEmail: (state) => {
      state.email = '';
      localStorage.removeItem('email'); // Remove email from localStorage
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
      localStorage.setItem('isVerified', action.payload); // Save isVerified to localStorage
    },
    clearIsVerified: (state) => {
      state.isVerified = '';
      localStorage.removeItem('isVerified'); // Remove isVerified from localStorage
    },
    setCreatedAt: (state, action) => {
      state.createdAt = action.payload;
      localStorage.setItem('createdAt', action.payload); // Save createdAt to localStorage
    },
    clearCreatedAt: (state) => {
      state.createdAt = '';
      localStorage.removeItem('createdAt'); // Remove createdAt from localStorage
    },
  },
});

// Export the actions
export const { setToken, clearToken, setUserID, clearUserID, setUsername, clearUsername, setRole, clearRole, setProfilePicture, clearProfilePicture, setBio, clearBio, setEmail, clearEmail, setWebsite, clearWebsite, setCreatedAt, clearCreatedAt, setIsVerified, clearIsVerified } = authSlice.actions;

// Create and export the store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
