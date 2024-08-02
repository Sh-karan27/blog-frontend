import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";

const initialState = {
  loading: null,
  comment: null,
  error: null,
};

export const getBlogComments = createAsyncThunk(
  "/blog/comments",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/${blogId}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogComments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comment = action.payload;
      });
  },
});

export default commentSlice.reducer;
