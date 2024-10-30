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
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 md:flex-row">
      <ItineraryMap
        activities={currentDay.activities}
        selectedActivityId={selectedActivityId}
        ref={mapRef}
      />
      <ItineraryList
        day={currentDay.day}
        activities={currentDay.activities}
        selectedActivityId={selectedActivityId}
        onActivitySelect={handleActivitySelect}
      />
    </div>
  );
}
