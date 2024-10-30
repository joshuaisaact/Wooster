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
    <div className="flex h-full w-full flex-col pt-10 text-text">
      <TripHeader destinationName={trip.destinationName} onShare={handleShare} />
      <div className="flex flex-col items-center justify-center">
        <TripNavigation
          daysCount={trip.itinerary.length}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <TripContent trip={trip} destination={destination} activeTab={activeTab} />
    </div>
  );
}
