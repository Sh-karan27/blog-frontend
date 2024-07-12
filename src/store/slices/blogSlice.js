import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { build } from 'vite';

const initialState = {
  loading: null,
  error: null,
  data: null,
};

const userBlog = createAsyncThunk(
  '/blog/fetchUserBlog',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blog/u/${userId}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBlog.fulfilled, (state, action) => {
        state.loading = null;
        state.data = action.payload;
      })
      .addCase(userBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
