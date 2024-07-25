import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axiosInstance';

const initialState = {
  user: null,
  token: localStorage.getItem('accessToken') || null,
  loading: false,
  error: null,
  watchHistory: [],
  bookmarks: [],
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      const { accessToken, user } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      console.log(response.data);

      return { user, token: accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userWatchHistory = createAsyncThunk(
  'user/watchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/history');
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userBookmarks = createAsyncThunk(
  '/user/bookmarks',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookmark/user/${userId}`);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userProfile = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/current-user');
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/users/logout');
      // localStorage.removeItem('accessToken');
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleBookmark = createAsyncThunk(
  '/toggle/:blogId',
  async ({ blogId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`bookmark/toggle/${blogId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(action.payload);
    }
  }
);

export const updateCoverImage = createAsyncThunk(
  'users/updateCoverImage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        'users/cover-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  'users/updateProfileImage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        'users/profile-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })

      .addCase(userWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.watchHistory = action.payload;
        state.error = null;
      })
      .addCase(userBookmarks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
        state.error = null;
      })
      .addCase(toggleBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
        state.error = null;
      })
      .addCase(updateCoverImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoverImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
