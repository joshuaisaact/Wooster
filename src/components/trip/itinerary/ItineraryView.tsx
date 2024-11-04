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
    <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
      <div className="flex min-h-screen flex-col gap-4 p-4 md:h-[800px] md:flex-row md:gap-6">
        {/* Map Section */}
        <div className="relative h-64 w-full md:h-full md:w-1/2">
          <ItineraryMap
            activities={currentDay.activities}
            selectedActivityId={selectedActivityId}
            ref={mapRef}
          />
        </div>

        {/* List Section */}
        <div className="h-[600px] w-full md:h-full md:w-1/2">
          <ItineraryList
            day={currentDay.day}
            activities={currentDay.activities}
            selectedActivityId={selectedActivityId}
            onActivitySelect={handleActivitySelect}
          />
        </div>
      </div>
    </div>
  );
}
