import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  loading: null,
  comment: [],
  error: null,
};

export const getBlogComments = createAsyncThunk(
  '/blog/comments',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/${blogId}`);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  '/comment/delete',
  async ({ commentId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`comments/c/${commentId}`);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const editCommentById = createAsyncThunk(
  '/comment/update',
  async ({ editContent, editCommentId }, { rejectWithValue }) => {
    try {
      console.log(editContent);
      console.log(editCommentId);
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.patch(
        `/comments/c/${editCommentId}`,
        editContent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addComment = createAsyncThunk(
  '/comment/add',
  async ({ formData, blogId }, { rejectWithValue }) => {
    try {
      console.log(formData);
      console.log(blogId);
      const token = localStorage.getItem('accessToken');
      const response = await axiosInstance.post(
        `/comments/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
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
      })
      .addCase(deleteCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.loading = false;

        state.comment = action.payload;
        state.error = null;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
        state.error = null;
      })
      .addCase(editCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
        state.error = null;
      });
  },
});

export default commentSlice.reducer;
