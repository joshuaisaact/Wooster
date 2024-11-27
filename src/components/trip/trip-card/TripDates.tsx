import { Trip } from '@/types';
import { addDays, formatDateRange } from '@/utils/dates';

interface TripDatesProps {
  trip: Trip;
}

function TripDates({ trip }: TripDatesProps) {
  const startDate = new Date(trip.startDate);
  const endDate = addDays(startDate, trip.numDays - 1);

  return (
    <>
      <span>{formatDateRange(startDate, endDate)}</span>
      <span className="text-gray-400 dark:text-green-100/40">•</span>
      <span>
        {trip.numDays} {trip.numDays === 1 ? 'day' : 'days'}
      </span>
    </>
  );
}

export default TripDates;
