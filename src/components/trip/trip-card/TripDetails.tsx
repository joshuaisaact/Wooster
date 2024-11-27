import { Trip, Destination } from '@/types';
import { getFirstSentence } from '@/utils/text';

import TripDates from './TripDates';
import TripStatusBadge from '../TripStatusBadge';

interface TripDetailsProps {
  trip: Trip;
  destination: Destination;
}

export function TripDetails({ trip, destination }: TripDetailsProps) {
  const description = destination.description ? getFirstSentence(destination.description) : null;

  return (
    <div className="space-y-2">
      <div>
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white/95 sm:text-xl">
            {!trip.title && <span>{trip.destination.destinationName} Trip</span>}
            {trip.title}
          </h3>
          <TripStatusBadge status={trip.status} />
        </div>
        <p className="text-sm text-gray-600 dark:text-green-100/70">{destination.country}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-green-100/70">
        <TripDates trip={trip} />
      </div>
      {description && (
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-green-100/70">{description}</p>
      )}
    </div>
  );
}
