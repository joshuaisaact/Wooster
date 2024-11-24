import { Link } from 'react-router-dom';
import { Trip, Destination } from '@/types';
import { TripPreviewMap } from './TripPreviewMap';
import { TripDetails } from './TripDetails';

interface TripCardProps {
  trip: Trip;
  destination?: Destination | null | undefined;
}

export function TripCard({ trip, destination }: TripCardProps) {
  if (!destination || !destination.latitude || !destination.longitude) {
    return null;
  }

  return (
    <Link to={`/trips/${trip.tripId}`} className="block">
      <div className="group relative flex flex-col overflow-hidden rounded-lg transition-all hover:shadow-md md:flex-row">
        <div className="flex-1 py-4 md:px-4">
          <TripDetails trip={trip} destination={destination} />
        </div>
        <TripPreviewMap destination={destination} />
      </div>
    </Link>
  );
}
