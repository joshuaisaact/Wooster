import { describe, test, expect } from 'vitest';
import { reducer, initialState } from '../../src/store/reducer';
import { State, Action, Destination, Trip as Triptype } from '@/types/types';
import { mockDestinations, mockTokyo, mockTokyoObj } from '../__mocks__/mockDestinations';
import { mockTrips, mockItineraryNYC } from '../__mocks__/mockTrips';

describe('reducer', () => {
  // Test initial state
  test('should return the initial state', () => {
    const newState = reducer(undefined, {} as Action);
    expect(newState).toEqual(initialState);
  });

  // Test SET_DESTINATIONS action
  test('should handle getting saved destinations from the DB', () => {
    const action: Action = { type: 'SET_SAVED_DESTINATIONS', payload: mockDestinations };
    const expectedState: State = { ...initialState, savedDestinations: mockDestinations };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test SET_TRIPS action
  test('should handle getting trips from the DB', () => {
    const action: Action = { type: 'SET_TRIPS', payload: mockTrips };
    const expectedState: State = { ...initialState, trips: mockTrips };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test ADD_TRIP action
  test('should handle adding a trip', () => {
    const newTrip: Triptype = {
      tripId: '3',
      destination: mockTokyoObj,
      numDays: 7,
      startDate: '2024-08-10',
      itinerary: mockItineraryNYC, // Itinerary for the trip
    };
    const action: Action = { type: 'ADD_TRIP', payload: newTrip };
    const expectedState: State = { ...initialState, trips: [...initialState.trips, newTrip] };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test REMOVE_TRIP action
  test('should handle removing a trip', () => {
    const currentState: State = { ...initialState, trips: mockTrips };
    const action: Action = { type: 'REMOVE_TRIP', payload: '1' };
    const expectedState: State = {
      ...initialState,
      trips: mockTrips.filter((trip) => trip.tripId !== '1'),
    };

    const newState = reducer(currentState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test SET_LOADING action
  test('should handle loading states', () => {
    const action: Action = { type: 'SET_LOADING', payload: true };
    const expectedState: State = { ...initialState, isLoading: true };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test ADD_DESTINATION action
  test('should handle adding a saved destination', () => {
    const newDestination: Destination = mockTokyo[0];
    const action: Action = { type: 'ADD_SAVED_DESTINATION', payload: newDestination };
    const expectedState: State = {
      ...initialState,
      savedDestinations: [...initialState.savedDestinations, newDestination],
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  // Test default case (unknown action)
  test('should return the current state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const newState = reducer(initialState, unknownAction as Action);
    expect(newState).toEqual(initialState);
  });
});
