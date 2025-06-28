import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../store/slices/userSlice';
import UserProfileSummary from '../../components/Profile/UserProfileSummary';

const mockStore = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      profile: {
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
      },
      stats: {
        totalPoints: 10000,
        redeemedPoints: 3000,
        monthlyPoints: 500,
        progressPercent: 60,
      },
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

describe('UserProfileSummary', () => {
  test('renders user profile information correctly', () => {
    renderWithProvider(<UserProfileSummary />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Level 5 Member')).toBeInTheDocument();
    expect(screen.getByText('1,500 XP')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('400 XP needed for next level')).toBeInTheDocument();
  });

  test('displays progress bar with correct percentage', () => {
    renderWithProvider(<UserProfileSummary />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
  });

  test('shows avatar with correct alt text', () => {
    renderWithProvider(<UserProfileSummary />);
    
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
  });

  test('handles loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          profile: null,
          stats: {
            totalPoints: 0,
            redeemedPoints: 0,
            monthlyPoints: 0,
            progressPercent: 0,
          },
          isLoading: true,
          error: null,
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <UserProfileSummary />
      </Provider>
    );

    // Should show loading skeleton
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('handles error state', () => {
    const errorStore = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          profile: null,
          stats: {
            totalPoints: 0,
            redeemedPoints: 0,
            monthlyPoints: 0,
            progressPercent: 0,
          },
          isLoading: false,
          error: 'Failed to load profile',
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <UserProfileSummary />
      </Provider>
    );

    expect(screen.getByText('Error loading profile: Failed to load profile')).toBeInTheDocument();
  });
});
