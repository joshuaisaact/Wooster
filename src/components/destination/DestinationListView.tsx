// components/destination/DestinationListView.tsx
import { useState } from 'react';
import { DestinationSearchBar } from './DestinationSearchBar';
import { DestinationFilters } from './DestinationFilters';
import { DestinationResults } from './DestinationResults';
import { useDestinationFilters } from '@/hooks/destination/useDestinationFilters';
import { Destination } from '@/types/types';

interface DestinationListViewProps {
  destinations: Destination[];
  isLoading: boolean;
}

export function DestinationListView({ destinations, isLoading }: DestinationListViewProps) {
  const [showFilters, setShowFilters] = useState(false);
  const {
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
  } = useDestinationFilters(destinations);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Explore Destinations</h1>
        <p className="text-muted-foreground">
          Discover amazing places around the world and start planning your next adventure
        </p>
      </div>

      <DestinationSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {showFilters && (
        <DestinationFilters
          destinations={destinations}
          selectedCostLevel={selectedCostLevel}
          selectedSafetyRating={selectedSafetyRating}
          onCostLevelChange={setSelectedCostLevel}
          onSafetyRatingChange={setSelectedSafetyRating}
        />
      )}

      <DestinationResults
        isLoading={isLoading}
        filteredDestinations={filteredDestinations}
        onResetFilters={resetFilters}
      />
    </>
  );
}
