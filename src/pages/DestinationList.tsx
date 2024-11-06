import { DestinationResults } from '@/components/destination/DestinationResults';
import { DestinationSearchBar } from '@/components/destination/DestinationSearchBar';
import { PageHeader } from '@/components/shared/PageHeader';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDestinationSearch } from '@/hooks/destination/useDestinationSearch';
import { usePageAnimation } from '@/hooks/usePageAnimation';

export function DestinationListView() {
  const {
    destinations,
    isLoading,
    searchQuery,
    selectedCountry,
    setSearchQuery,
    setSelectedCountry,
  } = useDestinationSearch();

  const shouldAnimate = usePageAnimation('destinations');

  // Get unique countries from current destinations
  const countries = Array.from(
    new Set(
      destinations
        .map((d) => d.country)
        .filter(Boolean)
        .sort(),
    ),
  );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <PageHeader
        title="Explore Destinations"
        description="Discover amazing places around the world and start planning your next adventure"
        shouldAnimate={shouldAnimate}
        className="max-w-2xl px-1 sm:px-0"
      />

      <div
        className={`rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''
        }`}
      >
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <DestinationSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-white/50 dark:bg-green-800/30">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
        }`}
      >
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <h2 className="text-base font-semibold text-green-900 dark:text-white/95 sm:text-lg">
              Destinations
            </h2>
            {(searchQuery || selectedCountry !== 'all') && (
              <button
                className="text-xs text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-white sm:text-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('all');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="relative min-h-[300px]">
            <div className="relative">
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white opacity-75 dark:bg-green-900/50">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
                  </div>
                )}
                <DestinationResults isLoading={isLoading} filteredDestinations={destinations} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
