import { useState } from 'react';
import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';
import { getSoonestTrip } from '@/utils/trips';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';
import { usePageAnimation } from '@/hooks/usePageAnimation';

function Dashboard() {
  const { state } = useAppContext();
  const { isLoading, trips, destinations } = state;
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const shouldAnimate = usePageAnimation('dashboard');

  const soonestTrip = !isLoading ? getSoonestTrip(trips) : null;
  const soonestTripDestination = soonestTrip
    ? (destinations.find(
        (destination) => destination.destinationName === soonestTrip.destinationName,
      ) ?? null)
    : null;

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-muted-foreground animate-pulse text-lg">
          Loading your adventures...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full ${
        shouldAnimate ? 'animate-fade-in opacity-0' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Welcome section with better spacing */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <h1
            className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white/95 md:text-3xl lg:text-4xl ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:200ms]' : ''
            }`}
          >
            Welcome Back!
          </h1>
          <p
            className={`mt-2 text-base text-gray-600 dark:text-green-100/80 md:text-lg ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:400ms]' : ''
            }`}
          >
            Let's plan your next adventure
          </p>
        </div>

        {/* Main grid with improved spacing */}
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Main content area */}
          <MainContent
            soonestTrip={soonestTrip}
            soonestTripDestination={soonestTripDestination}
            onDestinationClick={setSelectedDestination}
            className={`lg:col-span-2 ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:600ms]' : ''
            }`}
          />

          {/* Sidebar with better positioning */}
          <Sidebar
            selectedDestination={selectedDestination}
            className={`space-y-6 lg:sticky lg:top-8 ${
              shouldAnimate ? 'animate-fade-in-up opacity-0 [animation-delay:800ms]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
