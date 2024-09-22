import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  watchHistory: [],
  bookmarks: [],
};
// In your registerUser asyncThunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formData }, { rejectWithValue }) => {
    try {
      // const multipartFormData = new FormData();
      // multipartFormData.append("username", formData.username);
      // multipartFormData.append("email", formData.email);
      // multipartFormData.append("password", formData.password);
      // multipartFormData.append("bio", formData.bio);
      // if (formData.coverImage)
      //   multipartFormData.append("coverImage", formData.coverImage);
      // if (formData.profileImage)
      //   multipartFormData.append("profileImage", formData.profileImage);

      const response = await axiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { accessToken, user } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      console.log(user, accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Fix: correct error access and return
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      const { accessToken, user, refreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      

      return { user, token: accessToken };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (oldRefreshToken, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token", {
        refreshToken: oldRefreshToken,
      });
      const { accessToken, refreshToken } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userWatchHistory = createAsyncThunk(
  "user/watchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/history");
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userBookmarks = createAsyncThunk(
  "/user/bookmarks",
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
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/users/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const toggleBookmark = createAsyncThunk(
  "/toggle/:blogId",
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
  "users/updateCoverImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/users/cover-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  "users/updateProfileImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "users/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const updateAccountDetails = createAsyncThunk(
  "user/updateDetails",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "users/update-account",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(formData);
      console.log(response);
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "/user/channel",

  async ({ username }, { rejectWithValue }) => {
    console.log(username);
    try {
      const response = await axiosInstance.get(`/users/c/${username}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "/user/password",
  async ({ formData }, { rejectWithValue }) => {
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        "/users/change-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
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
  name: "auth",
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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = null;
        state.error = null;
        toast.success("User registered!Login with your credentials");
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Ensure this sets the user data properly
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logoutUser.rejected, (action, state) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = null;
        state.error = false;
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
        toast.success("Blog Update Cover Image!");
      })
      .addCase(updateCoverImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to Update Cover Image!");
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
      })
      .addCase(updateAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      });
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
