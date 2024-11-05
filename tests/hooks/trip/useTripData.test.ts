import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTripData } from '../../../src/hooks/trip/useTripData';
import { fetchTrip } from '@/services/apiService';
import { useAppContext } from '@/hooks/useAppContext';
import { mockTrips } from '../../__mocks__/mockTrips';
import { mockTokyoObj } from '../../__mocks__/mockDestinations';
import type { Destination, Trip } from '@/types/types';

// Mock dependencies
vi.mock('@/services/apiService', () => ({
  fetchTrip: vi.fn(),
}));

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

describe('useTripData Hook', () => {
  const mockDispatch = vi.fn();

  const mockFetchedTrip: Trip = {
    tripId: 'new-trip',
    destination: mockTokyoObj,
    numDays: 7,
    startDate: '2024-04-01',
    itinerary: [],
  };

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

  test('fetches trip if not in state', async () => {
    (fetchTrip as Mock).mockResolvedValueOnce(mockFetchedTrip);

    const { result } = renderHook(() => useTripData('new-trip', mockTrips));

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.trip).toBeUndefined();
    expect(result.current.destination).toBeNull();

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchTrip).toHaveBeenCalledWith(expect.anything(), 'new-trip');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TRIP',
      payload: mockFetchedTrip,
    });
  });

  test('handles fetch error', async () => {
    const mockError = new Error('Failed to fetch trip');
    (fetchTrip as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useTripData('new-trip', mockTrips));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch trip');
    expect(result.current.trip).toBeUndefined();
    expect(result.current.destination).toBeNull();
  });

  test('returns undefined when no tripId provided', () => {
    const { result } = renderHook(() => useTripData(undefined, mockTrips));

    expect(result.current.trip).toBeUndefined();
    expect(result.current.destination).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetchTrip).not.toHaveBeenCalled();
  });

  test('attempts to fetch trip if found in state but missing destination', async () => {
    const tripsWithoutDestination: Trip[] = [
      {
        ...mockTrips[0],
        tripId: 'incomplete-trip',
        destination: null as unknown as Destination,
      },
    ];

    (fetchTrip as Mock).mockResolvedValueOnce({
      ...tripsWithoutDestination[0],
      destination: mockTokyoObj,
    });

    const { result } = renderHook(() => useTripData('incomplete-trip', tripsWithoutDestination));

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);

    // Should attempt to fetch the trip
    expect(fetchTrip).toHaveBeenCalledWith(expect.anything(), 'incomplete-trip');

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have dispatched the fetched trip
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TRIP',
      payload: expect.objectContaining({
        tripId: 'incomplete-trip',
        destination: mockTokyoObj,
      }),
    });
  });

  test('handles null error message', async () => {
    (fetchTrip as Mock).mockRejectedValueOnce(null);

    const { result } = renderHook(() => useTripData('new-trip', mockTrips));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load trip');
  });

  test('updates loading state correctly', async () => {
    (fetchTrip as Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockFetchedTrip), 100)),
    );

    const { result } = renderHook(() => useTripData('new-trip', mockTrips));

    // Initial loading state
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
