import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCreateDestination } from '../../../src/hooks/destination/useCreateDestination';
import { useAppContext } from '@/hooks/useAppContext';
import { server } from '../../__mocks__/server';
import { http, HttpResponse } from 'msw';
import { api } from '@/lib/axios';

interface CreateDestinationRequest {
  destination: string;
}

interface CreateDestinationResponse {
  id: number;
  name: string;
}

const BASE_URL = api.defaults.baseURL;

vi.mock('@/hooks/useAppContext', () => ({
  useAppContext: vi.fn(),
}));

describe('useCreateDestination', () => {
  const mockDispatch = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  test('successfully creates a destination', async () => {
    server.use(
      http.post(`${BASE_URL}/api/destinations`, async ({ request }) => {
        const { destination } = (await request.json()) as CreateDestinationRequest;
        const response: CreateDestinationResponse = {
          id: 4,
          name: destination,
        };
        return HttpResponse.json(response);
      }),
    );

    const { result } = renderHook(() => useCreateDestination(mockOnClose));

    await act(async () => {
      await result.current.handleCreateDestination({ destinationName: 'Tokyo' });
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(1, {
      type: 'SET_LOADING',
      payload: true,
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: 'ADD_NEW_DESTINATION',
      payload: {
        id: 4,
        name: 'Tokyo',
      } as CreateDestinationResponse,
    });

    expect(mockDispatch).toHaveBeenNthCalledWith(3, {
      type: 'SET_LOADING',
      payload: false,
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
