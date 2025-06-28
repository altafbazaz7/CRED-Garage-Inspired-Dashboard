import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BenefitWithStatus } from '@shared/schema';
import { LoadingState } from '../../types';
import { apiService } from '../../services/api';

interface BenefitsState extends LoadingState {
  benefits: BenefitWithStatus[];
  userBenefits: BenefitWithStatus[];
  filterStatus: string;
}

const initialState: BenefitsState = {
  benefits: [],
  userBenefits: [],
  filterStatus: 'all',
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchBenefits = createAsyncThunk(
  'benefits/fetchBenefits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getBenefits();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch benefits');
    }
  }
);

export const claimBenefit = createAsyncThunk(
  'benefits/claimBenefit',
  async (benefitId: number, { rejectWithValue }) => {
    try {
      const response = await apiService.claimBenefit(benefitId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to claim benefit');
    }
  }
);

export const fetchUserBenefits = createAsyncThunk(
  'benefits/fetchUserBenefits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserBenefits();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user benefits');
    }
  }
);

const benefitsSlice = createSlice({
  name: 'benefits',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    updateBenefitStatus: (state, action: PayloadAction<{ id: number; isClaimed: boolean }>) => {
      const { id, isClaimed } = action.payload;
      const benefit = state.benefits.find(b => b.id === id);
      if (benefit) {
        benefit.isClaimed = isClaimed;
        benefit.claimedAt = isClaimed ? new Date().toISOString() : undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch benefits
      .addCase(fetchBenefits.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBenefits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.benefits = action.payload;
      })
      .addCase(fetchBenefits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Claim benefit
      .addCase(claimBenefit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(claimBenefit.fulfilled, (state, action) => {
        state.isLoading = false;
        const claimedBenefit = action.payload;
        const benefit = state.benefits.find(b => b.id === claimedBenefit.id);
        if (benefit) {
          benefit.isClaimed = true;
          benefit.claimedAt = claimedBenefit.claimedAt;
        }
        state.userBenefits.push(claimedBenefit);
      })
      .addCase(claimBenefit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch user benefits
      .addCase(fetchUserBenefits.fulfilled, (state, action) => {
        state.userBenefits = action.payload;
      });
  },
});

export const { clearError, setFilterStatus, updateBenefitStatus } = benefitsSlice.actions;
export default benefitsSlice.reducer;
