import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

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
      console.log(response.data.data);
      return response.data.data;
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

export const getBlogByID = createAsyncThunk(
  '/blog/:blogId',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blog/${blogId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBlogsByIDs = createAsyncThunk(
  'blog/getBlogsByIDs',
  async (blogIds, { dispatch, rejectWithValue }) => {
    try {
      const blogs = [];
      for (const blogId of blogIds) {
        const blog = await dispatch(getBlogByID({ blogId })).unwrap();
        blogs.push(blog);
      }
      console.log(blogs);
      return blogs;
    } catch (error) {
      return rejectWithValue(error);
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
      .addCase(getBlogByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogByID.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getBlogsByIDs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogsByIDs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlogsByIDs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default blogSlice.reducer;
