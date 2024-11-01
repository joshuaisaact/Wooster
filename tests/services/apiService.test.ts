import { describe, expect, vi, beforeEach } from 'vitest';
import {
  BASE_URL,
  fetchTrips,
  fetchDestinations,
  createDestination,
  deleteTrip,
  deleteDestination,
} from '../../src/services/apiService';
import { mockSupabase } from '../__mocks__/mockSupabase';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('API functions', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  // Test fetchTrips (now requires auth)
  test('fetchTrips - should fetch trips successfully', async () => {
    const mockTrips = [{ id: 1, name: 'Trip to Paris' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTrips,
    });

    const trips = await fetchTrips(mockSupabase);
    expect(trips).toEqual(mockTrips);
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/trips`, {
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });

  test('fetchTrips - should throw error on failed fetch', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchTrips(mockSupabase)).rejects.toThrow('Failed to fetch trips');
    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/trips`, {
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });

  // Test fetchDestinations (public route - no auth needed)
  test('fetchDestinations - should fetch destinations successfully', async () => {
    const mockDestinations = [{ id: 1, name: 'Paris' }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDestinations,
    });

    const destinations = await fetchDestinations();
    expect(destinations).toEqual(mockDestinations);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destinations`);
  });

  test('fetchDestinations - should throw error on failed fetch', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchDestinations()).rejects.toThrow('Failed to fetch destinations');
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destinations`);
  });

  // Test createDestination (now requires auth)
  test('createDestination - should create a new destination successfully', async () => {
    const mockResponse = { destination: 'New York' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const destination = await createDestination(mockSupabase, 'New York');
    expect(destination).toEqual('New York');
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destination`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination: 'New York' }),
    });
  });

  test('createDestination - should throw error on failed creation', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(createDestination(mockSupabase, 'InvalidDestination')).rejects.toThrow(
      'Failed to create destination',
    );
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destination`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination: 'InvalidDestination' }),
    });
  });

  // Test deleteTrip (now requires auth)
  test('deleteTrip - should delete a trip successfully', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await deleteTrip(mockSupabase, '1');
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/trips/1`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });

  test('deleteTrip - should throw error on failed deletion', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, statusText: 'Not Found' });

    await expect(deleteTrip(mockSupabase, 'invalidId')).rejects.toThrow(
      'Failed to delete trip: Not Found',
    );
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/trips/invalidId`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });

  // Test deleteDestination (now requires auth)
  test('deleteDestination - should delete a destination successfully', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    await deleteDestination(mockSupabase, 1);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destinations/1`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });

  test('deleteDestination - should throw error on failed deletion', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, statusText: 'Unauthorized' });

    await expect(deleteDestination(mockSupabase, 999)).rejects.toThrow(
      'Failed to delete destination: Unauthorized',
    );
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/destinations/999`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer fake-token',
        'Content-Type': 'application/json',
      },
    });
  });
});
