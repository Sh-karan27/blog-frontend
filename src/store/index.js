import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice';
import followerReducer from './slices/followerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: followerReducer,
  },
});

export default store;
