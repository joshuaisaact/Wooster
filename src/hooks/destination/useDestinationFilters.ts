import { useState, useMemo } from 'react';
import { Destination } from '@/types/types';
import { type SortOption } from '@/components/destination/DestinationSearchBar';

export function useDestinationFilters(destinations: Destination[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCostLevel, setSelectedCostLevel] = useState('all');
  const [selectedSafetyRating, setSelectedSafetyRating] = useState('all');

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((destination) => {
        const matchesSearch =
          destination.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          destination.country.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCost =
          selectedCostLevel === 'all' ? true : destination.costLevel === selectedCostLevel;
        const matchesSafety =
          selectedSafetyRating === 'all' ? true : destination.safetyRating === selectedSafetyRating;

        return matchesSearch && matchesCost && matchesSafety;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.destinationName.localeCompare(b.destinationName);
          case 'cost':
            return a.costLevel.localeCompare(b.costLevel);
          case 'safety':
            return b.safetyRating.localeCompare(a.safetyRating);
          default:
            return 0;
        }
      });
  }, [destinations, searchQuery, sortBy, selectedCostLevel, selectedSafetyRating]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCostLevel('all');
    setSelectedSafetyRating('all');
  };

  return {
    searchQuery,
    sortBy,
    selectedCostLevel,
    selectedSafetyRating,
    filteredDestinations,
    setSearchQuery,
    setSortBy,
    setSelectedCostLevel,
    setSelectedSafetyRating,
    resetFilters,
  };
}
