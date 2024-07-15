import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { MdNature } from "react-icons/md";

const initialState = {
  loading: null,
  error: null,
  data: null,
};

export const userBlog = createAsyncThunk(
  "/blog/fetchUserBlog",
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

export const toggleBlogPublished = createAsyncThunk(
  "/blog/toogleBlogStatus",
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/blog/toggle/status/${blogId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
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
      })
      .addCase(toggleBlogPublished.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(toggleBlogPublished.rejected, (state, action) => {
        state.loading = null;
        state.error = action.payload;
      })
      .addCase(toggleBlogPublished.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default blogSlice.reducer;
