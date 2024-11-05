import { Trip, Destination } from '@/types/types';
import { TripCard } from '../trip/trip-card';

interface NextTripSectionProps {
  trip: Trip | null;
  destination: Destination | null;
}

function NextTripSection({ trip, destination }: NextTripSectionProps) {
  return (
    <div className="rounded-lg bg-white/70 p-4 dark:bg-green-800/30">
      <h2 className="text-gray-900 dark:text-white/95">
        <strong>Next trip:</strong>
      </h2>
      {trip ? (
        <div className="mt-3 flex w-full flex-row items-stretch gap-1">
          <TripCard trip={trip} destination={destination} />
        </div>
      ) : (
        <p className="mt-2 text-gray-900 dark:text-white/95">No upcoming trips found.</p>
      )}
    </div>
  );
}

export default NextTripSection;
