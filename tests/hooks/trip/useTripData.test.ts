import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTripData } from '../../../src/hooks/trip/useTripData';
import { fetchTrip } from '@/services/apiService';
import { useAppContext } from '@/hooks/useAppContext';
import { mockTrips } from '../../__mocks__/mockTrips';
import { mockTokyoObj } from '../../__mocks__/mockDestinations';

// Mock dependencies
vi.mock('@/services/apiService', () => ({
  fetchTrip: vi.fn(),
}));

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {},
}));

describe('useTripData Hook', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  test('returns trip from state if it exists', () => {
    const { result } = renderHook(() => useTripData('trip_1', mockTrips));

    expect(result.current.trip).toBe(mockTrips[0]);
    expect(result.current.destination).toBe(mockTrips[0].destination);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetchTrip).not.toHaveBeenCalled();
  });

  test('returns undefined when no tripId provided', () => {
    const { result } = renderHook(() => useTripData(undefined, mockTrips));

    expect(result.current.trip).toBeUndefined();
    expect(result.current.destination).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetchTrip).not.toHaveBeenCalled();
  });

  test('initiates fetch when trip not in state', () => {
    (fetchTrip as Mock).mockResolvedValue(mockTokyoObj);

    const { result } = renderHook(() => useTripData('new-trip', mockTrips));

    expect(result.current.isLoading).toBe(true);
    expect(fetchTrip).toHaveBeenCalledWith({}, 'new-trip');
  });
});
