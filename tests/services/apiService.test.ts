import { describe, it, expect } from 'vitest';
import { fetchTrips } from '../../src/services/apiService';

describe('API functions', () => {
  it('fetchTrips - should fetch trips successfully', async () => {
    const response = await fetchTrips();
    expect(response.data).toEqual([
      { id: '1', location: 'Trip 1', days: 5, startDate: '2023-06-01' },
      { id: '2', location: 'Trip 2', days: 7, startDate: '2023-07-15' },
    ]);
  });
});
