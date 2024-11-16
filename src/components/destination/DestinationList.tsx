import { useState, useMemo, useEffect } from 'react';
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
import { useAppContext } from '@/hooks/useAppContext';
import { usePageAnimation } from '@/hooks/usePageAnimation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSavedDestinations } from '@/lib/query/destinations';

const ITEMS_PER_PAGE = 9;

export function DestinationListView() {
  const { state } = useAppContext();
  const { allDestinations, isLoading } = state;
  const { data: savedDestinations, isLoading: isLoadingSavedDestinations } = useSavedDestinations();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const shouldAnimate = usePageAnimation('destinations');

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    // First filter by saved if needed
    const baseDestinations = showSavedOnly
      ? allDestinations.filter((dest) =>
          savedDestinations.some(
            (saved: { destinationId: number }) => saved.destinationId === dest.destinationId,
          ),
        )
      : allDestinations;

    // Then apply search and country filters
    return baseDestinations.filter((dest) => {
      const matchesSearch =
        !searchQuery || dest.destinationName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === 'all' || dest.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [allDestinations, savedDestinations, showSavedOnly, searchQuery, selectedCountry]);

  // Get unique countries
  const countries = useMemo(
    () =>
      Array.from(
        new Set(
          allDestinations
            .map((d) => d.country)
            .filter(Boolean)
            .sort(),
        ),
      ),
    [allDestinations],
  );

  // Pagination
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountry]);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <PageHeader
        title="Explore Destinations"
        description="Discover amazing places around the world and start planning your next adventure"
        shouldAnimate={shouldAnimate}
        className="max-w-2xl px-1 sm:px-0"
      />

      <div className="flex gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSavedOnly(false)}
          className={cn(
            'h-auto p-0 !ring-0 !ring-offset-0 hover:!ring-0 hover:!ring-offset-0',
            !showSavedOnly
              ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
              : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white',
            shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:600ms]',
          )}
        >
          All ({allDestinations.length})
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSavedOnly(true)}
          className={cn(
            'h-auto p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
            showSavedOnly
              ? 'text-green-800 underline decoration-2 underline-offset-4 dark:text-green-100'
              : 'text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white',
            shouldAnimate && 'animate-fade-in-up opacity-0 [animation-delay:600ms]',
          )}
        >
          Saved ({savedDestinations.length})
        </Button>
      </div>

      {/* Search and Filters */}
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
                <SelectTrigger className="bg-white/50 text-green-900 dark:bg-green-800/30 dark:text-white/95">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-green-900">
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

      {/* Results */}
      <div
        className={`rounded-lg bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:rounded-xl ${
          shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
        }`}
      >
        <div className="p-4 sm:p-6 md:p-8">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <h2 className="text-base font-semibold text-green-900 dark:text-white/95 sm:text-lg">
              {filteredDestinations.length} Destinations
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
            {isLoading ? (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white opacity-75 dark:bg-green-900/50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
              </div>
            ) : (
              <>
                <DestinationResults
                  isLoading={isLoading}
                  filteredDestinations={paginatedDestinations}
                  searchQuery={searchQuery}
                />
                {totalPages > 1 && (
                  <div className="mt-6 flex flex-nowrap justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                      className="px-2 py-1 text-sm text-green-900 disabled:opacity-50 dark:text-white/95"
                    >
                      Previous
                    </button>
                    <span className="px-2 py-1 text-sm text-green-900 dark:text-white/95">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-2 py-1 text-sm text-green-900 disabled:opacity-50 dark:text-white/95"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
