import { describe, it, expect, vi } from 'vitest';
import { getSoonestTrip } from '../../src/utils/trips';
import { mockTrips } from '../__mocks__/mockTrips';
import { mockTokyoObj } from '../__mocks__/mockDestinations';

describe('getSoonestTrip', () => {
  const mockToday = new Date(2024, 4, 30); // Fixed date for testing (May 30, 2024)

  beforeAll(() => {
    // Mock Date to always return the same date for consistent test results
    vi.useFakeTimers();
    vi.setSystemTime(mockToday);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return the soonest trip from the mock data', () => {
    const soonestTrip = getSoonestTrip(mockTrips);
    expect(soonestTrip).toEqual({
      tripId: 'trip_1',
      destination: mockTokyoObj,
      numDays: 5,
      startDate: '2025-05-01',
      itinerary: [
        {
          day: 1,
          activities: expect.any(Array), // You can further assert the specific activities if necessary
        },
        {
          day: 2,
          activities: expect.any(Array),
        },
      ],
    });
  });

  it('should return null if there are no upcoming trips', () => {
    const trips = [
      {
        tripId: 'trip_3',
        destination: mockTokyoObj,
        numDays: 2,
        startDate: '2024-01-01',
        itinerary: [],
      },
    ];
    const soonestTrip = getSoonestTrip(trips);
    expect(soonestTrip).toBeNull();
  });
});
