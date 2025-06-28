// @ts-nocheck

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../types';
import { apiService } from '../../services/api';

interface RewardsState extends LoadingState {
  totalPoints: number;
  availablePoints: number;
  redeemedPoints: number;
  monthlyPoints: number;
  progressPercent: number;
  recentTransactions: Array<{
    id: number;
    type: 'earned' | 'redeemed';
    amount: number;
    description: string;
    date: string;
  }>;
}

const initialState: RewardsState = {
  totalPoints: 0,
  availablePoints: 0,
  redeemedPoints: 0,
  monthlyPoints: 0,
  progressPercent: 0,
  recentTransactions: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchRewardsData = createAsyncThunk(
  'rewards/fetchRewardsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getRewardsData();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch rewards data');
    }
  }
);

export const redeemPoints = createAsyncThunk(
  'rewards/redeemPoints',
  async (amount: number, { rejectWithValue }) => {
    try {
      const response = await apiService.redeemPoints(amount);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to redeem points');
    }
  }
);

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addPoints: (state, action: PayloadAction<{ amount: number; description: string }>) => {
      const { amount, description } = action.payload;
      state.availablePoints += amount;
      state.totalPoints += amount;
      state.monthlyPoints += amount;
      
      // Update progress percent (assuming 15000 is max for current level)
      state.progressPercent = Math.min((state.totalPoints / 15000) * 100, 100);
      
      // Add transaction
      state.recentTransactions.unshift({
        id: Date.now(),
        type: 'earned',
        amount,
        description,
        date: new Date().toISOString(),
      });
      
      // Keep only last 10 transactions
      if (state.recentTransactions.length > 10) {
        state.recentTransactions = state.recentTransactions.slice(0, 10);
      }
    },
    updateProgressPercent: (state, action: PayloadAction<number>) => {
      state.progressPercent = Math.min(Math.max(action.payload, 0), 100);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch rewards data
      .addCase(fetchRewardsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRewardsData.fulfilled, (state, action) => {
        state.isLoading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchRewardsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Redeem points
      .addCase(redeemPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(redeemPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        const { amount } = action.payload;
        state.availablePoints -= amount;
        state.redeemedPoints += amount;
        
        // Add transaction
        state.recentTransactions.unshift({
          id: Date.now(),
          type: 'redeemed',
          amount,
          description: 'Points redeemed',
          date: new Date().toISOString(),
        });
      })
      .addCase(redeemPoints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, addPoints, updateProgressPercent } = rewardsSlice.actions;
export default rewardsSlice.reducer;
