import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCreateTrip } from '../../../src/hooks/trip/useCreateTrip';
import { createTrip } from '@/services/apiService';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/services/apiService', () => ({
  createTrip: vi.fn(),
}));

describe('useCreateTrip Hook', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();
  const mockOnClose = vi.fn();

  const mockTripResponse = {
    trip: {
      tripId: '123',
      destination: {
        destinationId: 1,
        destinationName: 'Tokyo',
        country: 'Japan',
        description: 'Capital of Japan',
      },
      numDays: 5,
      startDate: '2024-03-20',
      itinerary: [],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as Mock).mockReturnValue({ dispatch: mockDispatch });
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  // test('successfully creates a trip', async () => {
  //   // Setup
  //   (createTrip as Mock).mockResolvedValueOnce(mockTripResponse);

  //   const { result } = renderHook(() => useCreateTrip(mockOnClose));

  //   // Create trip data
  //   const tripData = {
  //     days: 5,
  //     location: 'Tokyo',
  //     startDate: new Date('2024-03-20'),
  //     selectedCategories: [],
  //   };

  //   // Execute hook method
  //   await act(async () => {
  //     await result.current.handleCreateTrip(tripData);
  //   });

  //   // Verify loading states
  //   expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
  //   expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });

  //   // Verify trip creation
  //   expect(createTrip).toHaveBeenCalledWith(expect.anything(), {
  //     days: 5,
  //     location: 'Tokyo',
  //     startDate: tripData.startDate.toISOString(),
  //     selectedCategories: [],
  //   });

  //   // Verify trip was added to state
  //   expect(mockDispatch).toHaveBeenCalledWith({
  //     type: 'ADD_TRIP',
  //     payload: expect.objectContaining({
  //       tripId: '123',
  //       numDays: 5,
  //       selectedCategories: [],
  //       destination: expect.objectContaining({
  //         destinationName: 'Tokyo',
  //       }),
  //     }),
  //   });

  //   // Verify navigation and modal close
  //   expect(mockNavigate).toHaveBeenCalledWith('/trips/123', { replace: true });
  //   expect(mockOnClose).toHaveBeenCalled();
  // });

  test('handles missing location', async () => {
    const { result } = renderHook(() => useCreateTrip(mockOnClose));

    const invalidTripData = {
      days: 5,
      location: '',
      startDate: new Date('2024-03-20'),
      selectedCategories: [],
    };

    await expect(
      act(async () => {
        await result.current.handleCreateTrip(invalidTripData);
      }),
    ).rejects.toThrow('Location is required');

    expect(createTrip).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('handles API error', async () => {
    // Setup
    const mockError = new Error('API Error');
    (createTrip as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useCreateTrip(mockOnClose));

    const tripData = {
      days: 5,
      location: 'Tokyo',
      startDate: new Date('2024-03-20'),
      selectedCategories: [],
    };

    await expect(
      act(async () => {
        await result.current.handleCreateTrip(tripData);
      }),
    ).rejects.toThrow('API Error');

    // Verify loading states
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });

    // Verify no state changes or navigation occurred
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: 'ADD_TRIP',
      payload: expect.anything(),
    });
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('works without onClose callback', async () => {
    (createTrip as Mock).mockResolvedValueOnce(mockTripResponse);

    const { result } = renderHook(() => useCreateTrip()); // No onClose callback

    const tripData = {
      days: 5,
      location: 'Tokyo',
      startDate: new Date('2024-03-20'),
      selectedCategories: [],
    };

    await act(async () => {
      await result.current.handleCreateTrip(tripData);
    });

    // Verify core functionality still works
    expect(createTrip).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/trips/123', { replace: true });
  });
});
