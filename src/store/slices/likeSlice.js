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
      console.log(commentId);
      const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
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
      });
  },
});

export default likeSlice.reducer;
