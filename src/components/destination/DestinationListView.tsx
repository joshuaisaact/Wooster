import { useState } from 'react';
import { DestinationSearchBar } from './DestinationSearchBar';
import { DestinationFilters } from './DestinationFilters';
import { DestinationResults } from './DestinationResults';
import { useDestinationFilters } from '@/hooks/destination/useDestinationFilters';
import { Destination, SortOption } from '@/types/types';
import { Button } from '../ui/button';
import { usePageAnimation } from '@/hooks/usePageAnimation';

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
    selectedCountry,
    filteredDestinations,
    setSearchQuery,
    setSortBy,
    setSelectedCostLevel,
    setSelectedSafetyRating,
    setSelectedCountry,
    resetFilters,
  } = useDestinationFilters(destinations);
  const shouldAnimate = usePageAnimation('destinations');

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="max-w-2xl">
        <h1
          className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white/95 md:text-3xl lg:text-4xl ${
            shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:200ms]' : ''
          }`}
        >
          Explore Destinations
        </h1>
        <p
          className={`mt-2 text-base text-gray-600 dark:text-green-100/80 md:text-lg ${
            shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:400ms]' : ''
          }`}
        >
          Discover amazing places around the world and start planning your next adventure
        </p>
      </div>

      {/* Search and Filters Section */}
      <div
        className={`rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''
        }`}
      >
        <div className="p-6 md:p-8">
          <DestinationSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <div className="mt-6 border-t border-gray-100/30 pt-6 dark:border-white/10">
              <DestinationFilters
                destinations={destinations}
                selectedCostLevel={selectedCostLevel}
                selectedSafetyRating={selectedSafetyRating}
                selectedCountry={selectedCountry}
                onCostLevelChange={setSelectedCostLevel}
                onSafetyRatingChange={setSelectedSafetyRating}
                onCountryChange={setSelectedCountry}
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div
        className={`rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
        }`}
      >
        <div className="divide-y divide-gray-100/30 dark:divide-white/10">
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-900 dark:text-white/95">
                {filteredDestinations.length} Destinations
              </h2>
              {(searchQuery ||
                selectedCostLevel ||
                selectedSafetyRating ||
                selectedCountry !== 'all') && (
                <Button
                  variant="ghost"
                  className="text-sm text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-white"
                  onClick={resetFilters}
                >
                  Clear Filters
                </Button>
              )}
            </div>
            <DestinationResults
              isLoading={isLoading}
              filteredDestinations={filteredDestinations}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
