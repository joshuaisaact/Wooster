import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDestinationFilters } from '../../../src/hooks/destination/useDestinationFilters';
import { mockDestinations } from '../../__mocks__/mockDestinations';

describe('useDestinationFilters', () => {
  test('initial state returns all destinations sorted by name', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    expect(result.current.filteredDestinations).toHaveLength(2);
    expect(result.current.filteredDestinations[0].destinationName).toBe('New York');
    expect(result.current.filteredDestinations[1].destinationName).toBe('Paris');
  });

  test('filters by search query', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSearchQuery('paris');
    });

    expect(result.current.filteredDestinations).toHaveLength(1);
    expect(result.current.filteredDestinations[0].destinationName).toBe('Paris');
  });

  test('filters by cost level', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSelectedCostLevel('High');
    });

    expect(result.current.filteredDestinations).toHaveLength(2);
    expect(result.current.filteredDestinations.every((d) => d.costLevel === 'High')).toBe(true);
  });

  test('filters by safety rating', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSelectedSafetyRating('Medium');
    });

    expect(result.current.filteredDestinations).toHaveLength(2);
    expect(result.current.filteredDestinations.every((d) => d.safetyRating === 'Medium')).toBe(
      true,
    );
  });

  test('filters by country', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSelectedCountry('France');
    });

    expect(result.current.filteredDestinations).toHaveLength(1);
    expect(result.current.filteredDestinations[0].destinationName).toBe('Paris');
  });

  test('sorts by different criteria', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    // First test name sorting
    act(() => {
      result.current.setSortBy('name');
    });
    expect(result.current.filteredDestinations[0].destinationName).toBe('New York');
    expect(result.current.filteredDestinations[1].destinationName).toBe('Paris');

    // Test costLevel sorting (though both are 'High' in this case)
    act(() => {
      result.current.setSortBy('costLevel');
    });
    expect(result.current.filteredDestinations.every((d) => d.costLevel === 'High')).toBe(true);

    // Test safetyRating sorting (both are 'Medium' in this case)
    act(() => {
      result.current.setSortBy('safetyRating');
    });
    expect(result.current.filteredDestinations.every((d) => d.safetyRating === 'Medium')).toBe(
      true,
    );
  });

  test('combines multiple filters', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSelectedCostLevel('High');
      result.current.setSelectedSafetyRating('Medium');
      result.current.setSelectedCountry('France');
    });

    expect(result.current.filteredDestinations).toHaveLength(1);
    const filteredDestination = result.current.filteredDestinations[0];
    expect(filteredDestination.destinationName).toBe('Paris');
    expect(filteredDestination.costLevel).toBe('High');
    expect(filteredDestination.safetyRating).toBe('Medium');
    expect(filteredDestination.country).toBe('France');
  });

  test('reset filters returns to initial state', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSearchQuery('paris');
      result.current.setSelectedCostLevel('High');
      result.current.setSelectedSafetyRating('Medium');
      result.current.setSelectedCountry('France');
      result.current.resetFilters();
    });

    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedCostLevel).toBe('all');
    expect(result.current.selectedSafetyRating).toBe('all');
    expect(result.current.selectedCountry).toBe('all');
    expect(result.current.sortBy).toBe('name');
    expect(result.current.filteredDestinations).toHaveLength(2);
  });

  test('handles case-insensitive search', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSearchQuery('PARIS');
    });

    expect(result.current.filteredDestinations).toHaveLength(1);
    expect(result.current.filteredDestinations[0].destinationName).toBe('Paris');
  });

  test('returns empty array when no matches found', () => {
    const { result } = renderHook(() => useDestinationFilters(mockDestinations));

    act(() => {
      result.current.setSearchQuery('Tokyo');
    });

    expect(result.current.filteredDestinations).toHaveLength(0);
  });
});
