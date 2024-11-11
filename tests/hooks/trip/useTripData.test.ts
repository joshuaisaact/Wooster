import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTripData } from '../../../src/hooks/trip/useTripData';
import { useAppContext } from '@/hooks/useAppContext';
import { mockTrips } from '../../__mocks__/mockTrips';

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
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
  });

  test('returns undefined when no tripId provided', () => {
    const { result } = renderHook(() => useTripData(undefined, mockTrips));

    expect(result.current.trip).toBeUndefined();
    expect(result.current.destination).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
