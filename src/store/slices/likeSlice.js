import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  loading: null,
  data: null,
  error: null,
};

export const toggleCommentLike = createAsyncThunk(
  'likes/toggleComment',
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const toggleBlogLike = createAsyncThunk(
  'like/togglBlogLike',

  async ({ blogId }, { rejectWithValue }) => {
    try {
      console.log(blogId);
      const response = await axiosInstance.post(`/likes/toggle/v/${blogId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleCommentLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCommentLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(toggleBlogLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBlogLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleBlogLike.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      });
  },
});

export default likeSlice.reducer;
