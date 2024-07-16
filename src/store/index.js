import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';
import followerReducer from './slices/followerSlice';
import blogReducer from './slices/blogSlice';
import playlistReducer from './slices/playlistSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: followerReducer,
    blog: blogReducer,
    playlist: playlistReducer,
  },
});

export default store;
