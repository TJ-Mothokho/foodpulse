import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'https://localhost:7297/api'; //'https://recipesystemapi.azurewebsites.net/api';

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor (optional, for adding token or logging)
apiClient.interceptors.request.use(
  (config) => {
    // Optionally add a token if required
    const token = localStorage.getItem('token'); // Or retrieve from Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiEndpoints = {
    // Users
    login: '/Auth/Login',
    getUserByID: '/Users/Get/',
    getUsers: '/Users/GetAll',

    //Recipes
    viewRecipes: '/Recipes/GetAll',
    addRecipe: '/Recipes/Add',
    
    //Category
    getCategories: '/Categories/GetAll',
    
  //Like
  like: '/Like?',
  removeLike: '/RemoveLike?',
  getLikes: '/Likes/GetAll?userID=',
  getLikesCount: '/Likes/GetLikeCount',

  //Comment

  //Hashtag


};

export default apiClient;



// Centralized error handler
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access, like refreshing tokens or redirecting
      }
      return Promise.reject(error);
    }
  );
  
