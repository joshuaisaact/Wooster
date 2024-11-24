import { Trip, Destination } from '@/types';
import { getFirstSentence } from '@/utils/text';
import { addDays, formatDateRange } from '@/utils/dates';

interface TripDetailsProps {
  trip: Trip;
  destination: Destination;
}

export function TripDetails({ trip, destination }: TripDetailsProps) {
  const startDate = new Date(trip.startDate);
  const endDate = addDays(startDate, trip.numDays - 1);
  const description = destination.description ? getFirstSentence(destination.description) : null;

  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white/95 sm:text-xl">
          {destination.destinationName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-green-100/70">{destination.country}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-green-100/70">
        <span>{formatDateRange(startDate, endDate)}</span>
        <span className="text-gray-400 dark:text-green-100/40">•</span>
        <span>
          {trip.numDays} {trip.numDays === 1 ? 'day' : 'days'}
        </span>
      </div>
      {description && (
        <p className="line-clamp-2 text-sm text-gray-600 dark:text-green-100/70">{description}</p>
      )}
    </div>
  );
}
