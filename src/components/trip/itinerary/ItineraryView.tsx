import { Activity as ActivityType } from '@/types/types';
import { ItineraryMap } from './ItineraryMap';
import { ItineraryList } from './ItineraryList';
import { useItinerarySelection } from '@/hooks/trip/useItinerarySelection';

interface ItineraryViewProps {
  currentDay: {
    day: number;
    activities: ActivityType[];
  };
}

export function ItineraryView({ currentDay }: ItineraryViewProps) {
  const { selectedActivityId, handleActivitySelect, mapRef } = useItinerarySelection(
    currentDay.activities,
  );

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      {/* Map Section */}
      <div className="relative h-80 w-full md:h-[800px] md:w-1/2">
        <ItineraryMap
          activities={currentDay.activities}
          selectedActivityId={selectedActivityId}
          ref={mapRef}
        />
      </div>

      {/* List Section */}
      <div className="h-full w-full overflow-auto md:w-1/2">
        <ItineraryList
          day={currentDay.day}
          activities={currentDay.activities}
          selectedActivityId={selectedActivityId}
          onActivitySelect={handleActivitySelect}
        />
      </div>
    </div>
  );
}
