import { forwardRef } from 'react';
import { Activity } from '@/types/types';
import Map from '@/components/Map';

interface ItineraryMapProps {
  activities: Activity[];
  selectedActivityId: number | null;
}

export const ItineraryMap = forwardRef<L.Map, ItineraryMapProps>(
  ({ activities, selectedActivityId }, ref) => (
    <div className="h-full w-full md:w-1/2">
      <Map activities={activities} selectedActivityId={selectedActivityId} ref={ref} />
    </div>
  ),
);
