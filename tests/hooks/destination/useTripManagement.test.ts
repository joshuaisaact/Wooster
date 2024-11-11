import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTripManagement } from '../../../src/hooks/destination/useDestinationManagement';
import { deleteTrip as apiDeleteTrip } from '@/services/apiService';
import { useAppContext } from '@/hooks/useAppContext';
import { useNavigate } from 'react-router-dom';

// Mock dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/services/apiService', () => ({
  deleteTrip: vi.fn(),
}));

describe('useTripManagement', () => {
  const mockDispatch = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('handles errors during trip deletion', async () => {
    // Setup
    const mockError = new Error('Failed to delete trip');
    (apiDeleteTrip as jest.Mock).mockRejectedValueOnce(mockError);
    const { result } = renderHook(() => useTripManagement());

    // Execute and verify error is thrown
    await expect(
      act(async () => {
        await result.current.deleteTrip('123');
      }),
    ).rejects.toThrow('Failed to delete trip');

    // Verify loading states
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });

    // Verify trip was not removed from state
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: 'REMOVE_TRIP',
      payload: expect.anything(),
    });

    // Verify no navigation occurred
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('does nothing when tripId is empty', async () => {
    const { result } = renderHook(() => useTripManagement());

    await act(async () => {
      await result.current.deleteTrip('');
    });

    expect(apiDeleteTrip).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
