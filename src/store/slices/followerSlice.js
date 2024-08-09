import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  loading: null,
  error: null,
  follower: null,
  following: null,
};

export const userProfileFollower = createAsyncThunk(
  'userProfile/fetchProfileFollowers',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/follow/u/${id}`);
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const userProfileFollowing = createAsyncThunk(
  'userProfile/fetchProfileFollowing',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/follow/p/${id}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const toggleFollow = createAsyncThunk(
  'user/toggleFollow',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/follow/p/${id}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle userProfileFollowers actions
      .addCase(userProfileFollower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfileFollower.fulfilled, (state, action) => {
        state.loading = false;
        state.follower = action.payload;
      })
      .addCase(userProfileFollower.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle userProfileFollowing actions
      .addCase(userProfileFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfileFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(userProfileFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      });
  },
});

export default userProfileSlice.reducer;
