import { Share2, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trip } from '@/types';
import TripDates from './trip-card/TripDates';
import { useState } from 'react';
import { EditTripDialog } from './EditTripDialog';

interface TripHeaderProps {
  trip: Trip;
  onShare: () => void;
}

export function TripHeader({ trip, onShare }: TripHeaderProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 dark:text-green-100 sm:text-xl md:text-2xl">
          {!trip.title && <span>{trip.destination.destinationName} Trip</span>}
          {trip.title}
        </h1>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center"
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit2 className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Edit</span>
          </Button>

          <Button
            size="sm"
            className="flex items-center bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
            onClick={onShare}
          >
            <Share2 className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Share</span>
          </Button>
        </div>
      </div>

      <EditTripDialog trip={trip} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </>
  );
}
