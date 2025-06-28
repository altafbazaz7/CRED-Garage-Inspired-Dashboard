import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchUserProfile, updateUserProgress, clearError, updateStats } from '../../store/slices/userSlice';
import { apiService } from '../../services/api';

// Mock the API service
jest.mock('../../services/api');
const mockApiService = apiService as jest.Mocked<typeof apiService>;

describe('userSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    jest.clearAllMocks();
  });

  test('should have initial state', () => {
    const state = store.getState().user;
    expect(state).toEqual({
      profile: null,
      stats: {
        totalPoints: 0,
        redeemedPoints: 0,
        monthlyPoints: 0,
        progressPercent: 0,
      },
      isLoading: false,
      error: null,
    });
  });

  test('should handle clearError action', () => {
    // First set an error
    store.dispatch({ type: 'user/fetchProfile/rejected', payload: 'Test error' });
    
    // Then clear it
    store.dispatch(clearError());
    
    const state = store.getState().user;
    expect(state.error).toBeNull();
  });

  test('should handle updateStats action', () => {
    const newStats = {
      totalPoints: 1000,
      monthlyPoints: 200,
    };
    
    store.dispatch(updateStats(newStats));
    
    const state = store.getState().user;
    expect(state.stats).toEqual({
      totalPoints: 1000,
      redeemedPoints: 0,
      monthlyPoints: 200,
      progressPercent: 0,
    });
  });

  describe('fetchUserProfile', () => {
    test('should handle successful fetch', async () => {
      const mockProfile = {
        id: 1,
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
        level: 5,
        xp: 1500,
        progressPercent: 60,
        xpToNext: 400,
        totalPoints: 10000,
        redeemedPoints: 3000,
        monthlyPoints: 500,
      };

      mockApiService.getUserProfile.mockResolvedValue({
        data: mockProfile,
        success: true,
      });

      await store.dispatch(fetchUserProfile());

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.profile).toEqual(mockProfile);
      expect(state.stats).toEqual({
        totalPoints: 10000,
        redeemedPoints: 3000,
        monthlyPoints: 500,
        progressPercent: 60,
      });
      expect(state.error).toBeNull();
    });

    test('should handle fetch error', async () => {
      const errorMessage = 'Failed to fetch profile';
      mockApiService.getUserProfile.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(fetchUserProfile());

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.profile).toBeNull();
      expect(state.error).toBe(errorMessage);
    });

    test('should set loading state during fetch', () => {
      mockApiService.getUserProfile.mockReturnValue(new Promise(() => {})); // Never resolves
      
      store.dispatch(fetchUserProfile());
      
      const state = store.getState().user;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('updateUserProgress', () => {
    test('should handle successful progress update', async () => {
      const mockUpdates = {
        xp: 2000,
        level: 6,
        progressPercent: 40,
        xpToNext: 300,
      };

      mockApiService.updateUserXP.mockResolvedValue({
        data: mockUpdates,
        success: true,
      });

      // First set initial profile
      store.dispatch({
        type: 'user/fetchProfile/fulfilled',
        payload: {
          id: 1,
          name: 'John Doe',
          level: 5,
          xp: 1500,
          progressPercent: 60,
          xpToNext: 400,
          totalPoints: 10000,
          redeemedPoints: 3000,
          monthlyPoints: 500,
        },
      });

      await store.dispatch(updateUserProgress(500));

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.profile).toMatchObject(mockUpdates);
      expect(state.error).toBeNull();
    });

    test('should handle progress update error', async () => {
      const errorMessage = 'Failed to update progress';
      mockApiService.updateUserXP.mockRejectedValue(new Error(errorMessage));

      await store.dispatch(updateUserProgress(500));

      const state = store.getState().user;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
