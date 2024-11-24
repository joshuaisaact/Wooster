import { useState, useMemo } from 'react';
import { Destination, SortOption } from '@/types';

export function useDestinationFilters(destinations: Destination[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCostLevel, setSelectedCostLevel] = useState('all');
  const [selectedSafetyRating, setSelectedSafetyRating] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((destination) => {
        const matchesSearch = destination.destinationName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCost =
          selectedCostLevel === 'all' || destination.costLevel === selectedCostLevel;
        const matchesSafety =
          selectedSafetyRating === 'all' || destination.safetyRating === selectedSafetyRating;
        const matchesCountry = selectedCountry === 'all' || destination.country === selectedCountry;

        return matchesSearch && matchesCost && matchesSafety && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.destinationName.localeCompare(b.destinationName);
        } else if (sortBy === 'costLevel') {
          return a.costLevel.localeCompare(b.costLevel);
        } else if (sortBy === 'safetyRating') {
          return a.safetyRating.localeCompare(b.safetyRating);
        }
        return 0;
      });
  }, [destinations, searchQuery, sortBy, selectedCostLevel, selectedSafetyRating, selectedCountry]);

  const resetFilters = () => {
    setSearchQuery('');
    setSortBy('name');
    setSelectedCostLevel('all');
    setSelectedSafetyRating('all');
    setSelectedCountry('all');
  };

  return {
    searchQuery,
    sortBy,
    selectedCostLevel,
    selectedSafetyRating,
    selectedCountry,
    filteredDestinations,
    setSearchQuery,
    setSortBy,
    setSelectedCostLevel,
    setSelectedSafetyRating,
    setSelectedCountry,
    resetFilters,
  };
}
