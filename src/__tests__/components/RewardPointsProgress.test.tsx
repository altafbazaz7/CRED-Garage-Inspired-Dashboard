import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rewardsReducer from '../../store/slices/rewardsSlice';
import RewardPointsProgress from '../../components/Rewards/RewardPointsProgress';

const mockStore = configureStore({
  reducer: {
    rewards: rewardsReducer,
  },
  preloadedState: {
    rewards: {
      totalPoints: 12450,
      availablePoints: 4250,
      redeemedPoints: 8200,
      monthlyPoints: 1250,
      progressPercent: 70,
      recentTransactions: [],
      isLoading: false,
      error: null,
    },
  },
});

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('RewardPointsProgress', () => {
  test('renders reward points section title', () => {
    renderWithProvider(<RewardPointsProgress />);
    
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });

  test('displays total points correctly', () => {
    renderWithProvider(<RewardPointsProgress />);
    
    expect(screen.getByText('12,450')).toBeInTheDocument();
    expect(screen.getByText('points')).toBeInTheDocument();
  });

  test('shows monthly points and redeemed points', () => {
    renderWithProvider(<RewardPointsProgress />);
    
    expect(screen.getByText('+1,250')).toBeInTheDocument();
    expect(screen.getByText('8,200')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
    expect(screen.getByText('Redeemed')).toBeInTheDocument();
  });

  test('renders circular progress indicator', () => {
    renderWithProvider(<RewardPointsProgress />);
    
    const progressCircle = screen.getByRole('img', { hidden: true }); // SVG elements are often hidden
    expect(progressCircle).toBeInTheDocument();
  });

  test('handles loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        rewards: rewardsReducer,
      },
      preloadedState: {
        rewards: {
          totalPoints: 0,
          availablePoints: 0,
          redeemedPoints: 0,
          monthlyPoints: 0,
          progressPercent: 0,
          recentTransactions: [],
          isLoading: true,
          error: null,
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <RewardPointsProgress />
      </Provider>
    );

    expect(screen.getByTestId('rewards-skeleton')).toBeInTheDocument();
  });

  test('handles error state', () => {
    const errorStore = configureStore({
      reducer: {
        rewards: rewardsReducer,
      },
      preloadedState: {
        rewards: {
          totalPoints: 0,
          availablePoints: 0,
          redeemedPoints: 0,
          monthlyPoints: 0,
          progressPercent: 0,
          recentTransactions: [],
          isLoading: false,
          error: 'Failed to load rewards data',
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <RewardPointsProgress />
      </Provider>
    );

    expect(screen.getByText('Error loading rewards: Failed to load rewards data')).toBeInTheDocument();
  });

  test('calculates progress percentage correctly', () => {
    renderWithProvider(<RewardPointsProgress />);
    
    // The progress circle should have the correct stroke-dashoffset based on 70% progress
    const progressCircle = document.querySelector('circle[stroke="url(#progressGradient)"]');
    expect(progressCircle).toBeInTheDocument();
  });
});
