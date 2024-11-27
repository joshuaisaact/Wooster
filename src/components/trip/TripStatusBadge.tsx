import { Badge } from '@/components/ui/badge';
import { TripStatus } from '@/types';

function TripStatusBadge({ status = 'PLANNING' }: { status: TripStatus }) {
  const colours = {
    PLANNING:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-200 dark:border-yellow-400/30',
    BOOKED:
      'bg-green-100 text-green-800 border-green-200 dark:bg-indigo-400/20 dark:text-indigo-200 dark:border-indigo-400/30',
    COMPLETED:
      'bg-gray-100 text-gray-800 border-gray-200 dark:bg-slate-400/20 dark:text-slate-200 dark:border-slate-400/30',
  };

  const labels = {
    PLANNING: 'Planning',
    BOOKED: 'Booked',
    COMPLETED: 'Completed',
  };

  return (
    <Badge variant="outline" className={colours[status]}>
      {labels[status]}
    </Badge>
  );
}

export default TripStatusBadge;
