import { useState } from 'react';
import { Trip, Destination } from '@/types/types';
import { TripHeader } from './TripHeader';
import { TripNavigation } from './TripNavigation';
import { TripContent } from './TripContext';
import { useShare } from '@/hooks/trip/useTripData';
import { TripTab } from '@/types/types';

interface TripViewProps {
  trip: Trip;
  destination: Destination | undefined;
}

export function TripView({ trip, destination }: TripViewProps) {
  const [activeTab, setActiveTab] = useState<TripTab>('summary');
  const { shareTrip } = useShare();

  const handleShare = () => shareTrip(trip.destinationName, window.location.href);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 text-green-700 sm:px-6 lg:px-8">
          <TripHeader destinationName={trip.destinationName} onShare={handleShare} />
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 text-gray-700 sm:px-6 lg:px-8">
          <TripNavigation
            daysCount={trip.itinerary.length}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <TripContent trip={trip} destination={destination} activeTab={activeTab} />
        </div>
      </main>
    </div>
  );
}
