import { useState } from 'react';
import { DestinationSearchBar } from './DestinationSearchBar';
import { DestinationFilters } from './DestinationFilters';
import { DestinationResults } from './DestinationResults';
import { useDestinationFilters } from '@/hooks/destination/useDestinationFilters';
import { Destination } from '@/types';
import { Button } from '../ui/button';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import { PageHeader } from '../shared/PageHeader';

interface DestinationListViewProps {
  destinations: Destination[];
  isLoading: boolean;
}

export function DestinationListView({ destinations, isLoading }: DestinationListViewProps) {
  const [showFilters] = useState(false);
  const {
    searchQuery,

    selectedCostLevel,
    selectedSafetyRating,
    selectedCountry,
    filteredDestinations,
    setSearchQuery,
    setSelectedCostLevel,
    setSelectedSafetyRating,
    setSelectedCountry,
    resetFilters,
  } = useDestinationFilters(destinations);
  const shouldAnimate = usePageAnimation('destinations');

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header Section - Reduced spacing and text size on mobile */}
      <PageHeader
        title="Explore Destinations"
        description="Discover amazing places around the world and start planning your next adventure"
        shouldAnimate={shouldAnimate}
        className="max-w-2xl px-1 sm:px-0"
      />

      {/* Search and Filters Section  */}
      <div
        className={`rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''
        }`}
      >
        <div className="p-4 sm:p-6 md:p-8">
          <DestinationSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

          {showFilters && (
            <div className="mt-4 border-t border-gray-100/30 pt-4 dark:border-white/10 sm:mt-6 sm:pt-6">
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
        className={`rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
        }`}
      >
        <div className="divide-y divide-gray-100/30 dark:divide-white/10">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <h2 className="text-base font-semibold text-green-900 dark:text-white/95 sm:text-lg">
                {filteredDestinations.length} Destinations
              </h2>
              {(searchQuery ||
                selectedCostLevel ||
                selectedSafetyRating ||
                selectedCountry !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-white sm:text-sm"
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
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
