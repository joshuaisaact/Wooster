import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCreateDestination } from '../../../src/hooks/destination/useCreateDestination';
import { createDestination } from '@/services/apiService';
import { useAppContext } from '@/hooks/useAppContext';

type MockCreateDestination = typeof createDestination;

// Mock dependencies with types
vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

vi.mock('@/services/apiService', () => ({
  createDestination: vi.fn() as unknown as MockCreateDestination,
}));

describe('useCreateDestination', () => {
  const mockDispatch = vi.fn();
  const mockOnClose = vi.fn();
  const mockNewDestination = {
    id: '1',
    name: 'Tokyo',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    country: 'Japan',
    description: 'Capital of Japan',
    imageUrl: 'tokyo.jpg',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  test('successfully creates a destination', async () => {
    // Setup with proper typing
    (createDestination as jest.Mock).mockResolvedValueOnce(mockNewDestination);

    // Render hook
    const { result } = renderHook(() => useCreateDestination(mockOnClose));

    // Execute hook method
    await act(async () => {
      await result.current.handleCreateDestination({ destinationName: 'Tokyo' });
    });

    // Verify loading states
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });

    // Verify destination creation
    expect(createDestination).toHaveBeenCalledWith('Tokyo');
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_NEW_DESTINATION',
      payload: mockNewDestination,
    });

    // Verify callback
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('handles errors appropriately', async () => {
    // Setup with proper typing
    const mockError = new Error('Failed to create destination');
    (createDestination as jest.Mock).mockRejectedValueOnce(mockError);

    // Render hook
    const { result } = renderHook(() => useCreateDestination(mockOnClose));

    // Execute and verify error is thrown
    await expect(
      act(async () => {
        await result.current.handleCreateDestination({ destinationName: 'Tokyo' });
      }),
    ).rejects.toThrow('Failed to create destination');

    // Verify loading states
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: true });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_LOADING', payload: false });

    // Verify destination was not added
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: 'ADD_DESTINATION',
      payload: expect.anything(),
    });

    // Verify callback was not called
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
