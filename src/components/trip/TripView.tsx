import { useState } from 'react';
import { Trip, Destination } from '@/types';
import { TripHeader } from './TripHeader';
import { TripNavigation } from './TripNavigation';
import { TripContent } from './TripContext';
import { TripTab } from '@/types';

interface TripViewProps {
  trip: Trip;
  destination: Destination | undefined;
  isSharedView?: boolean;
}

export function TripView({ trip, destination, isSharedView }: TripViewProps) {
  const [activeTab, setActiveTab] = useState<TripTab>('summary');

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-green-900/30">
      {/* Header Section */}
      <div className="bg-white shadow dark:bg-green-800/30 dark:shadow-green-900/20">
        <div className="mx-auto max-w-7xl px-3 py-2 text-green-700 dark:text-green-100 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8">
          <TripHeader trip={trip} isSharedView={isSharedView} />
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white dark:border-green-700 dark:bg-green-800/30">
        <div className="mx-auto max-w-7xl px-4 text-gray-700 dark:text-green-100 sm:px-6 lg:px-8">
          <TripNavigation trip={trip} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
          <TripContent
            trip={trip}
            destination={destination}
            activeTab={activeTab}
            isSharedView={isSharedView}
          />
        </div>
      </main>
    </div>
  );
}
