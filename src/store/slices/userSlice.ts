// @ts-nocheck
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, LoadingState } from '../../types';
import { apiService } from '../../services/api';

interface UserState extends LoadingState {
  profile: UserProfile | null;
  stats: {
    totalPoints: number;
    redeemedPoints: number;
    monthlyPoints: number;
    progressPercent: number;
  };
}

const initialState: UserState = {
  profile: null,
  stats: {
    totalPoints: 0,
    redeemedPoints: 0,
    monthlyPoints: 0,
    progressPercent: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserProfile();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
    }
  }
);

export const updateUserProgress = createAsyncThunk(
  'user/updateProgress',
  async (xpGained: number, { rejectWithValue }) => {
    try {
      const response = await apiService.updateUserXP(xpGained);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update progress');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateStats: (state, action: PayloadAction<Partial<UserState['stats']>>) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.stats = {
          totalPoints: action.payload.totalPoints,
          redeemedPoints: action.payload.redeemedPoints,
          monthlyPoints: action.payload.monthlyPoints,
          progressPercent: action.payload.progressPercent,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update user progress
      .addCase(updateUserProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(updateUserProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateStats } = userSlice.actions;
export default userSlice.reducer;
