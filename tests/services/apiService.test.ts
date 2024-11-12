import { describe, it, expect } from 'vitest';
import {
  createDestination,
  createTrip,
  deleteDestination,
  deleteTrip,
  fetchAllDestinations,
  fetchDestinationActivities,
  fetchDestinations,
  fetchTrip,
  fetchTrips,
  saveDestination,
  unsaveDestination,
} from '../../src/services/apiService';

describe('API functions', () => {
  it('gets all trips', async () => {
    const response = await fetchTrips();
    expect(response.data).toEqual([
      { id: '1', location: 'Trip 1', days: 5, startDate: '2023-06-01' },
      { id: '2', location: 'Trip 2', days: 7, startDate: '2023-07-15' },
    ]);
  });

  it('gets saved destinations', async () => {
    const response = await fetchDestinations();
    expect(response.data).toEqual([
      { id: 1, name: 'Destination 1' },
      { id: 2, name: 'Destination 2' },
    ]);
  });

  it('gets all destinations', async () => {
    const response = await fetchAllDestinations();
    expect(response.data).toEqual([
      { id: 1, name: 'Destination 1' },
      { id: 2, name: 'Destination 2' },
      { id: 3, name: 'Destination 3' },
    ]);
  });

  it('gets activities for a destination', async () => {
    const response = await fetchDestinationActivities('Tokyo');
    expect(response.data).toEqual([
      { id: 1, name: 'Activity 1 in Tokyo' },
      { id: 2, name: 'Activity 2 in Tokyo' },
    ]);
  });

  it('saves a destination', async () => {
    const response = await saveDestination(1);
    expect(response.data).toEqual({
      message: 'Destination 1 saved',
    });
  });

  it('unsaves a destination', async () => {
    const response = await unsaveDestination(1);
    expect(response.data).toEqual({
      message: 'Destination 1 unsaved',
    });
  });

  it('creates a destination', async () => {
    const response = await createDestination('New Tokyo');
    expect(response.data).toEqual({
      id: 4,
      name: 'New Tokyo',
    });
  });

  it('deletes a destination', async () => {
    const response = await deleteDestination(1);
    expect(response.data).toEqual({
      message: 'Destination 1 deleted',
    });
  });

  it('gets a specific trip', async () => {
    const response = await fetchTrip('1');
    expect(response.data).toEqual({
      id: '1',
      location: 'Trip 1',
      days: 5,
      startDate: '2023-06-01',
    });
  });

  it('creates a trip', async () => {
    const tripData = {
      days: 5,
      location: 'New Tokyo',
      startDate: '2024-03-20',
      selectedCategories: ['Food', 'Culture'],
    };
    const response = await createTrip(tripData);
    expect(response.data).toEqual({
      trip: {
        tripId: '3',
        destination: {
          destinationId: 1,
          destinationName: 'New Tokyo',
          country: 'Japan',
          description: 'Capital of Japan',
        },
        numDays: 5,
        startDate: '2024-03-20',
      },
    });
  });

  it('deletes a trip', async () => {
    const response = await deleteTrip('1');
    expect(response.data).toEqual({
      message: 'Trip 1 deleted',
    });
  });

  describe('error handling', () => {
    it('handles 404 when fetching non-existent destination', async () => {
      await expect(fetchDestinationActivities('invalid')).rejects.toThrow();
    });

    it('handles 404 when fetching non-existent trip', async () => {
      await expect(fetchTrip('999')).rejects.toThrow();
    });

    it('handles 500 server error', async () => {
      await expect(fetchTrip('888')).rejects.toThrow();
    });

    it('handles 401 unauthorized error', async () => {
      await expect(fetchTrip('777')).rejects.toThrow();
    });

    it('handles validation error when creating trip with invalid days', async () => {
      const invalidTrip = {
        days: -1,
        location: 'Tokyo',
        startDate: '2024-03-20',
        selectedCategories: ['Food'],
      };

      await expect(createTrip(invalidTrip)).rejects.toThrow();
    });

    it('handles validation error when creating trip with empty location', async () => {
      const invalidTrip = {
        days: 5,
        location: '',
        startDate: '2024-03-20',
        selectedCategories: ['Food'],
      };

      await expect(createTrip(invalidTrip)).rejects.toThrow();
    });
  });
});
