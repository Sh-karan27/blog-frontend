import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      });
  },
});

export default playlistSlice.reducer;
