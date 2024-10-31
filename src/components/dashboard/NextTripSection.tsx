import { Trip, Destination } from '@/types/types';
import { TripCard } from '../trip/trip-card';

interface NextTripSectionProps {
  trip: Trip | null;
  destination: Destination | null;
}

function NextTripSection({ trip, destination }: NextTripSectionProps) {
  return (
    <>
      <h2>
        <strong>Next trip:</strong>
      </h2>
      {trip ? (
        <div className="flex w-full flex-row items-stretch gap-1">
          <TripCard trip={trip} destination={destination} />
        </div>
      ) : (
        <p>No upcoming trips found.</p>
      )}
    </>
  );
}

export default NextTripSection;
