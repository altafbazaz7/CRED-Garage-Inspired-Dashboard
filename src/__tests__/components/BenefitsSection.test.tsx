import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import benefitsReducer from '../../store/slices/benefitsSlice';
import rewardsReducer from '../../store/slices/rewardsSlice';
import BenefitsSection from '../../components/Benefits/BenefitsSection';

const mockBenefits = [
  {
    id: 1,
    title: '20% Cashback',
    description: 'Get 20% cashback on all online purchases',
    icon: 'fas fa-percentage',
    status: 'active',
    ctaText: 'Claim Now',
    category: 'cashback',
    value: '20%',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    isClaimed: false,
  },
  {
    id: 2,
    title: 'Travel Discounts',
    description: 'Exclusive 15% off on flight bookings',
    icon: 'fas fa-plane',
    status: 'premium',
    ctaText: 'View Offers',
    category: 'travel',
    value: '15%',
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    isClaimed: false,
  },
];

const mockStore = configureStore({
  reducer: {
    benefits: benefitsReducer,
    rewards: rewardsReducer,
  },
  preloadedState: {
    benefits: {
      benefits: mockBenefits,
      userBenefits: [],
      filterStatus: 'all',
      isLoading: false,
      error: null,
    },
    rewards: {
      totalPoints: 0,
      availablePoints: 0,
      redeemedPoints: 0,
      monthlyPoints: 0,
      progressPercent: 0,
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

describe('BenefitsSection', () => {
  test('renders benefits section title', () => {
    renderWithProvider(<BenefitsSection />);
    
    expect(screen.getByText('Your Benefits')).toBeInTheDocument();
  });

  test('displays benefit cards correctly', () => {
    renderWithProvider(<BenefitsSection />);
    
    expect(screen.getByText('20% Cashback')).toBeInTheDocument();
    expect(screen.getByText('Travel Discounts')).toBeInTheDocument();
    expect(screen.getByText('Get 20% cashback on all online purchases')).toBeInTheDocument();
    expect(screen.getByText('Exclusive 15% off on flight bookings')).toBeInTheDocument();
  });

  test('shows correct benefit status badges', () => {
    renderWithProvider(<BenefitsSection />);
    
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  test('renders CTA buttons for benefits', () => {
    renderWithProvider(<BenefitsSection />);
    
    expect(screen.getByText('Claim Now')).toBeInTheDocument();
    expect(screen.getByText('View Offers')).toBeInTheDocument();
  });

  test('handles filter dropdown', async () => {
    renderWithProvider(<BenefitsSection />);
    
    const filterDropdown = screen.getByRole('combobox');
    expect(filterDropdown).toBeInTheDocument();
    
    fireEvent.click(filterDropdown);
    
    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('Premium')).toBeInTheDocument();
    });
  });

  test('handles show all/show less toggle', () => {
    renderWithProvider(<BenefitsSection />);
    
    const viewAllButton = screen.getByText('View All');
    expect(viewAllButton).toBeInTheDocument();
    
    fireEvent.click(viewAllButton);
    
    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    const loadingStore = configureStore({
      reducer: {
        benefits: benefitsReducer,
        rewards: rewardsReducer,
      },
      preloadedState: {
        benefits: {
          benefits: [],
          userBenefits: [],
          filterStatus: 'all',
          isLoading: true,
          error: null,
        },
        rewards: {
          totalPoints: 0,
          availablePoints: 0,
          redeemedPoints: 0,
          monthlyPoints: 0,
          progressPercent: 0,
          recentTransactions: [],
          isLoading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={loadingStore}>
        <BenefitsSection />
      </Provider>
    );

    // Should show loading skeletons
    expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(6);
  });

  test('handles error state', () => {
    const errorStore = configureStore({
      reducer: {
        benefits: benefitsReducer,
        rewards: rewardsReducer,
      },
      preloadedState: {
        benefits: {
          benefits: [],
          userBenefits: [],
          filterStatus: 'all',
          isLoading: false,
          error: 'Failed to load benefits',
        },
        rewards: {
          totalPoints: 0,
          availablePoints: 0,
          redeemedPoints: 0,
          monthlyPoints: 0,
          progressPercent: 0,
          recentTransactions: [],
          isLoading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={errorStore}>
        <BenefitsSection />
      </Provider>
    );

    expect(screen.getByText('Error loading benefits: Failed to load benefits')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });
});
