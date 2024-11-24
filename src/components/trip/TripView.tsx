import { useState } from 'react';
import { Trip, Destination } from '@/types';
import { TripHeader } from './TripHeader';
import { TripNavigation } from './TripNavigation';
import { TripContent } from './TripContext';
import { useShare } from '@/hooks/trip/useShare';
import { TripTab } from '@/types';

interface TripViewProps {
  trip: Trip;
  destination: Destination | undefined;
}

export function TripView({ trip, destination }: TripViewProps) {
  const [activeTab, setActiveTab] = useState<TripTab>('summary');
  const { shareTrip } = useShare();

  // Ensure we have the required data
  if (!trip || !trip.destination?.destinationName) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="text-muted-foreground">
          {!trip ? 'Loading trip...' : 'Loading trip details...'}
        </div>
      </div>
    );
  }

  const handleShare = () => shareTrip(trip.destination.destinationName, window.location.href);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-green-900/30">
      {/* Header Section */}
      <div className="bg-white shadow dark:bg-green-800/30 dark:shadow-green-900/20">
        <div className="mx-auto max-w-7xl px-3 py-2 text-green-700 dark:text-green-100 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8">
          <TripHeader destinationName={trip.destination.destinationName} onShare={handleShare} />
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white dark:border-green-700 dark:bg-green-800/30">
        <div className="mx-auto max-w-7xl px-4 text-gray-700 dark:text-green-100 sm:px-6 lg:px-8">
          <TripNavigation
            daysCount={trip.itinerary?.length ?? 0}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
          <TripContent trip={trip} destination={destination} activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
