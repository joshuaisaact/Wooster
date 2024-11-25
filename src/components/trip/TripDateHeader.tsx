import { addDays } from '@/utils/dates';
import { Trip } from '@/types';

export function TripDateHeader({ trip }: { trip: Trip }) {
  const startDate = new Date(trip.startDate);
  const endDate = addDays(startDate, trip.numDays - 1);

  return (
    <div className="mb-4 rounded-lg bg-white/50 dark:bg-green-900/20">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-medium text-gray-900 dark:text-white/95">
          {startDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
          {' → '}
          {endDate.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
        {trip.numDays} {trip.numDays === 1 ? 'day' : 'days'}
      </div>
    </div>
  );
}
