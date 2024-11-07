import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AppProvider, AppContext } from '@/context/AppContext';
import { fetchTrips, fetchDestinations } from '@/services/apiService';
import { ReactNode } from 'react';
import { useContext } from 'react';

// Mock dependencies
vi.mock('@/services/apiService', () => ({
  fetchTrips: vi.fn(),
  fetchDestinations: vi.fn(),
}));

// Create a mock auth context
const mockAuthContext = {
  session: { user: { id: '123' } },
  user: { id: '123' },
};

// Mock the AuthContext module
vi.mock('@/context/AuthContext', () => ({
  AuthContext: {
    Provider: ({ children }: { children: ReactNode }) => children,
  },
  useContext: () => mockAuthContext,
}));

// Helper hook to access AppContext
const useTestHook = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('AppContext not found');
  return context;
};

function Wrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe('AppProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchTrips as Mock).mockReset();
    (fetchDestinations as Mock).mockReset();
  });

  test('provides initial state', () => {
    const { result } = renderHook(() => useTestHook(), { wrapper: Wrapper });

    expect(result.current.state).toEqual({
      trips: [],
      savedDestinations: [],
      allDestinations: [],
      activities: {},
      isLoading: false,
      pageAnimationStates: {
        dashboard: false,
        trips: false,
        destinations: false,
        explore: false,
      },
    });
  });

  test('handles fetch error gracefully', async () => {
    const error = new Error('API Error');
    (fetchTrips as Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useTestHook(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.state.isLoading).toBe(false);
    });

    expect(result.current.state.trips).toEqual([]);
    expect(result.current.state.savedDestinations).toEqual([]);
    expect(fetchDestinations).not.toHaveBeenCalled(); // Because fetchTrips failed first
  });

  test('dispatch updates state correctly', () => {
    const { result } = renderHook(() => useTestHook(), { wrapper: Wrapper });

    act(() => {
      result.current.dispatch({ type: 'SET_LOADING', payload: true });
    });

    expect(result.current.state.isLoading).toBe(true);
  });
});
