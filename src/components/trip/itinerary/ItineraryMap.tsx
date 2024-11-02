import { forwardRef } from 'react';
import { Activity } from '@/types/types';
import { Map, MapRef } from '@/components/shared/map';

interface ItineraryMapProps {
  activities: Activity[];
  selectedActivityId: number | null;
}

export const ItineraryMap = forwardRef<MapRef, ItineraryMapProps>(
  ({ activities, selectedActivityId }, ref) => (
    <div className="h-full w-full">
      <Map
        activities={activities}
        selectedActivityId={selectedActivityId}
        ref={ref}
        isInteractive={true}
        showZoomControls={true}
        className="h-full w-full"
      />
    </div>
  ),
);

ItineraryMap.displayName = 'ItineraryMap';
