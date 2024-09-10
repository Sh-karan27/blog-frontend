import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const initialState = {
  loading: null,
  error: null,
  data: null,
};

export const getUserPlaylist = createAsyncThunk(
  '/playlist/fetchUserPlaylists',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/playlist/user/${userId}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPlaylistById = createAsyncThunk(
  '/playlist/fetchUserPlaylist',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/playlist/${id}`);
      console.log(response.data.data.playlist);
      return response.data.data.playlist;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPlaylist = createAsyncThunk(
  '/playlist/editPlaylist',
  async ({ formData, playlistId }, { rejectWithValue }) => {
    console.log(formData);
    try {
      const response = await axiosInstance.patch(
        `/playlist/${playlistId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deletePLaylist = createAsyncThunk(
  '/playlist/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/playlist/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const createPlaylist = createAsyncThunk(
  '/playlist/',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/playlist/`, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const addBlogToPlaylist = createAsyncThunk(
  '/playlist/blog/add',

  async ({ playlistId, blogId }, { rejectWithValue }) => {
    console.log(playlistId, blogId);
    try {
      const response = await axiosInstance.patch(
        `/playlist/add/${playlistId}/${blogId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const removeBlogToPlaylist = createAsyncThunk(
  '/playlist/blog/remove',

  async ({ playlistId, blogId }, { rejectWithValue }) => {
    console.log(playlistId, blogId);
    try {
      const response = await axiosInstance.patch(
        `/playlist/remove/${playlistId}/${blogId}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserPlaylist.fulfilled, (state, action) => {
        state.loading = null;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(editPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePLaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePLaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePLaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addBlogToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlogToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBlogToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        toast.success('Blog added to playlist');
      })
      .addCase(removeBlogToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBlogToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeBlogToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        toast.success('Blog removed from playlist');
      });
  },
});

export default playlistSlice.reducer;
