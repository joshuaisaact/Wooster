import { useShareTrip } from '@/hooks/trip/useShare';
import { Trip } from '@/types';
import { Button } from '../ui/button';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  trip: Trip;
}

export function TripShareButton({ trip }: ShareButtonProps) {
  const { mutate, isPending } = useShareTrip();

  return (
    <Button
      size="sm"
      className="flex items-center bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
      onClick={() => mutate(trip.tripId)}
      disabled={isPending}
    >
      <Share2 className="h-4 w-4 md:mr-2" />
      <span className="hidden md:inline">{isPending ? 'Sharing...' : 'Share'}</span>
    </Button>
  );
}
