import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';
import GlobeSection from '@/components/explore/GlobeSection';
import DestinationPanel from '@/components/explore/DestinationPanel';
import ExplorationSection from '@/components/explore/ExplorationSection';
import { usePageAnimation } from '@/hooks/usePageAnimation';

export function Explore() {
  const { state } = useAppContext();
  const { destinations, isLoading } = state;
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);
  const shouldAnimate = usePageAnimation('explore');

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
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${shouldAnimate ? 'animate-fade-in opacity-0' : ''}`}
    >
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1
            className={`text-xl font-bold tracking-tight text-green-900 dark:text-white/95 sm:text-2xl md:text-3xl lg:text-4xl ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:200ms]' : ''
            }`}
          >
            Explore the World
          </h1>
          <p
            className={`mt-1 text-sm text-gray-600 dark:text-green-100/70 sm:text-base md:text-lg ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:400ms]' : ''
            }`}
          >
            Discover amazing destinations and plan your next adventure
          </p>
        </div>

        {/* Mobile Experience */}
        <div className="lg:hidden">
          {/* Globe Container - No longer sticky */}
          <div
            className={`mb-4 ${shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''}`}
          >
            <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30">
              <GlobeSection
                destinations={destinations}
                focusedDestination={focusedDestination}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Content Below Globe */}
          <div className="space-y-4">
            {focusedDestination && (
              <div className="rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30">
                <div className="p-4">
                  <button
                    onClick={() => setFocusedDestination(null)}
                    className="mb-4 text-sm text-green-900 dark:text-green-100/70"
                  >
                    ← Back to destinations
                  </button>
                  <DestinationPanel focusedDestination={focusedDestination} />
                </div>
              </div>
            )}
            {!focusedDestination && (
              <div className="rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30">
                <div className="p-4">
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-green-900 dark:text-white/95">
                      Popular Destinations
                    </h2>
                    <p className="mt-1 text-xs text-gray-600 dark:text-green-100/70">
                      Tap on a destination to see it on the globe
                    </p>
                  </div>
                  <ExplorationSection
                    onDestinationClick={handleDestinationClick}
                    focusedDestinationId={null}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="space-y-8 lg:col-span-2">
            <div
              className={`overflow-hidden rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 ${
                shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''
              }`}
            >
              <GlobeSection
                destinations={destinations}
                focusedDestination={focusedDestination}
                isLoading={isLoading}
              />
            </div>

            <div
              className={`rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 ${
                shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:700ms]' : ''
              }`}
            >
              <div className="p-8">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-green-900 dark:text-white/95">
                    Popular Destinations
                  </h2>
                  <p className="mt-1 text-sm text-gray-600 dark:text-green-100/70">
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

          <div className="lg:sticky lg:top-8">
            <div
              className={`rounded-lg bg-white/70 shadow-md backdrop-blur-sm dark:bg-green-800/30 ${
                shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:500ms]' : ''
              }`}
            >
              <div className="p-8">
                <DestinationPanel focusedDestination={focusedDestination} />
              </div>
            </div>

            {!focusedDestination && (
              <div className="hidden text-center lg:block">
                <img
                  src="/wooster-on-maps-no-bg.png"
                  alt="Wooster"
                  className="mx-auto w-48 opacity-80 transition-opacity duration-200 hover:opacity-100 dark:opacity-60 dark:hover:opacity-80"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
