import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { data } from 'autoprefixer';

const initialState = {
  loading: null,
  error: null,
  data: null,
};

export const userBlog = createAsyncThunk(
  '/blog/fetchUserBlog',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blog/u/${userId}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ blogId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/blog/${blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleBlogPublished = createAsyncThunk(
  '/blog/toggleBlogStatus',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/blog/toggle/status/${blogId}`
      );
      return { blogId, published: response.data.published };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBlogById = createAsyncThunk(
  '/blog/:blogId',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blog/${blogId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBlogById = createAsyncThunk(
  'delete/:blodId',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`blog/${blogId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      })
      .addCase(toggleBlogPublished.fulfilled, (state, action) => {
        const { blogId, published } = action.payload;
        const blog = state.data.find((blog) => blog._id === blogId);
        if (blog) {
          blog.published = published;
        }
      })
      .addCase(toggleBlogPublished.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(deleteBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        state.loading = null;
        const { blogId } = action.payload;
        state.data = state.data.find((blog) => blog._id !== blogId);
        state.error = null;
      });
  },
});

export default blogSlice.reducer;
