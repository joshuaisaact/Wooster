import { describe, test, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItinerarySelection } from '../../../src/hooks/trip/useItinerarySelection';
import { mockActivities } from '../../__mocks__/mockActivities';

// Mock Leaflet Map
class MockMap {
  flyTo = vi.fn();
}

describe('useItinerarySelection Hook', () => {
  test('initializes with null selection', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    expect(result.current.selectedActivityId).toBeNull();
    expect(result.current.mapRef.current).toBeNull();
  });

  test('selects activity and updates map view', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    // Set up mock map
    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    // Select Eiffel Tower activity
    act(() => {
      result.current.handleActivitySelect(1);
    });

    // Verify selection
    expect(result.current.selectedActivityId).toBe(1);

    // Verify map interaction with Eiffel Tower coordinates
    expect(mockMap.flyTo).toHaveBeenCalledWith(
      [mockActivities[0].latitude, mockActivities[0].longitude],
      15,
    );
  });

  test('updates selection without map if map ref is null', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    // Select Eiffel Tower activity without setting up map
    act(() => {
      result.current.handleActivitySelect(1);
    });

    // Verify selection still works
    expect(result.current.selectedActivityId).toBe(1);
  });

  test('handles selection of non-existent activity', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    // Select non-existent activity
    act(() => {
      result.current.handleActivitySelect(999);
    });

    // Verify selection updated but map not called
    expect(result.current.selectedActivityId).toBe(999);
    expect(mockMap.flyTo).not.toHaveBeenCalled();
  });

  test('handles multiple selections', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    // Select Eiffel Tower
    act(() => {
      result.current.handleActivitySelect(1);
    });

    expect(result.current.selectedActivityId).toBe(1);
    expect(mockMap.flyTo).toHaveBeenCalledWith(
      [mockActivities[0].latitude, mockActivities[0].longitude],
      15,
    );

    // Select Le Jules Verne Restaurant
    act(() => {
      result.current.handleActivitySelect(2);
    });

    expect(result.current.selectedActivityId).toBe(2);
    expect(mockMap.flyTo).toHaveBeenLastCalledWith(
      [mockActivities[1].latitude, mockActivities[1].longitude],
      15,
    );
  });

  test('persists map reference across rerenders', () => {
    const { result, rerender } = renderHook(() => useItinerarySelection(mockActivities));

    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    // Rerender the hook
    rerender();

    // Verify map reference is maintained
    expect(result.current.mapRef.current).toBe(mockMap);
  });

  test('maintains selection when activities update', () => {
    const { result, rerender } = renderHook(({ activities }) => useItinerarySelection(activities), {
      initialProps: { activities: mockActivities },
    });

    // Select Eiffel Tower
    act(() => {
      result.current.handleActivitySelect(1);
    });

    // Update activities
    const updatedActivities = [...mockActivities];
    rerender({ activities: updatedActivities });

    // Verify selection is maintained
    expect(result.current.selectedActivityId).toBe(1);
  });

  test('handles selection with empty activities array', () => {
    const { result } = renderHook(() => useItinerarySelection([]));

    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    act(() => {
      result.current.handleActivitySelect(1);
    });

    expect(result.current.selectedActivityId).toBe(1);
    expect(mockMap.flyTo).not.toHaveBeenCalled();
  });

  test('handles same location activities', () => {
    const { result } = renderHook(() => useItinerarySelection(mockActivities));

    const mockMap = new MockMap();
    result.current.mapRef.current = mockMap as unknown as L.Map;

    // Select first activity at Eiffel Tower
    act(() => {
      result.current.handleActivitySelect(1);
    });

    // Select second activity at same location
    act(() => {
      result.current.handleActivitySelect(2);
    });

    // Should call flyTo with same coordinates both times
    expect(mockMap.flyTo).toHaveBeenCalledTimes(2);
    expect(mockMap.flyTo).toHaveBeenLastCalledWith([48.8584, 2.2941], 15);
  });
});
