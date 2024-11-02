import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';
import GlobeSection from '@/components/explore/GlobeSection';
import DestinationPanel from '@/components/explore/DestinationPanel';
import ExplorationSection from '@/components/explore/ExplorationSection';

function Explore() {
  const { state } = useAppContext();
  const { destinations, isLoading } = state;
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);

  const handleDestinationClick = (destination: Destination) => {
    setFocusedDestination((prev) =>
      prev?.destinationId === destination.destinationId ? null : destination,
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
          Loading your world of adventures...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-xl font-bold tracking-tight text-green-900 dark:text-white/95 sm:text-2xl md:text-3xl lg:text-4xl">
            Explore the World
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-green-100/70 sm:text-base md:text-lg">
            Discover amazing destinations and plan your next adventure
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Column - Globe and Exploration */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:col-span-2">
            {/* Globe Section */}
            <div className="overflow-hidden rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
              <div className="aspect-[16/9] w-full">
                <GlobeSection
                  destinations={destinations}
                  focusedDestination={focusedDestination}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Exploration Section */}
            <div className="rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="mb-2 sm:mb-4">
                  <h2 className="text-lg font-semibold text-green-900 dark:text-white/95 sm:text-xl">
                    Popular Destinations
                  </h2>
                  <p className="mt-1 text-xs text-gray-600 dark:text-green-100/70 sm:text-sm">
                    Click on a destination to learn more
                  </p>
                </div>
                <ExplorationSection
                  onDestinationClick={handleDestinationClick}
                  focusedDestinationId={focusedDestination?.destinationId || null}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Destination Details */}
          <div className="w-full lg:col-span-1">
            <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-8">
              <div className="rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
                <div className="p-4 sm:p-6 md:p-8">
                  <DestinationPanel focusedDestination={focusedDestination} />
                </div>
              </div>

              {/* Optional: Add Wooster mascot when no destination is selected */}
              {!focusedDestination && (
                <div className="hidden text-center lg:block">
                  <img
                    src="/wooster-on-maps-no-bg.png"
                    alt="Wooster"
                    className="mx-auto w-24 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:opacity-60 dark:hover:opacity-80 sm:w-32 lg:w-48"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
