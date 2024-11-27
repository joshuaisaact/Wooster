import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateTrip } from '@/hooks/trip/useUpdateTrip';
import { Trip, TripStatus } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import TripStatusBadge from './TripStatusBadge';

interface TripStatusSelectProps {
  trip: Trip;
}

export function TripStatusSelect({ trip }: TripStatusSelectProps) {
  const { mutate } = useUpdateTrip(trip.tripId);

  const handleStatusUpdate = (newStatus: TripStatus) => {
    mutate({
      status: newStatus,
      title: trip.title,
      startDate: trip.startDate,
      description: trip.description,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="flex items-center">
          <CheckCircle2 className="h-4 w-4 md:mr-2" />

          <TripStatusBadge status={trip.status} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px]">
        {(['PLANNING', 'BOOKED', 'COMPLETED'] as const).map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleStatusUpdate(status)}
            className={trip.status === status ? 'bg-green-50 dark:bg-green-900/50' : ''}
          >
            <TripStatusBadge status={status} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
