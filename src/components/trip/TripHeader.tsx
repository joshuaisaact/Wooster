import { Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Trip } from '@/types';
import { useState } from 'react';
import { EditTripDialog } from './EditTripDialog';
import { TripShareButton } from './TripShareButton';

interface TripHeaderProps {
  trip: Trip;

  isSharedView?: boolean;
}

export function TripHeader({ trip, isSharedView }: TripHeaderProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="flex flex-row text-lg font-bold text-gray-900 dark:text-green-100 sm:text-xl md:text-2xl">
          {!trip.title && <span>{trip.destination.destinationName} Trip</span>}
          {trip.title}
        </h1>

        {!isSharedView && (
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
            <TripShareButton trip={trip} />
          </div>
        )}
      </div>

      <EditTripDialog trip={trip} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
    </>
  );
}
