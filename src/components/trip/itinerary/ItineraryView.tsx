import { Activity as ActivityType } from '@/types';
import { ItineraryMap } from './ItineraryMap';
import { ItineraryList } from './ItineraryList';
import { useItinerarySelection } from '@/hooks/trip/useItinerarySelection';
import { tripService } from '@/services';
import { useTrip } from '@/hooks/trip/useTrip';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface ItineraryViewProps {
  tripId: string;
  currentDay: {
    day: number;
    activities: ActivityType[];
  };
}

export function ItineraryView({ tripId, currentDay }: ItineraryViewProps) {
  const { refetch } = useTrip(tripId);
  const { selectedActivityId, handleActivitySelect, mapRef } = useItinerarySelection(
    currentDay.activities,
  );

  const handleSlotChange = async (activityId: number, newSlot: number | null) => {
    try {
      const updates = currentDay.activities.map((activity) => {
        if (activity.activityId === activityId) {
          return {
            activityId: Number(activity.activityId),
            slotNumber: newSlot ?? activity.slotNumber,
          };
        } else if (activity.slotNumber === newSlot) {
          const movingActivity = currentDay.activities.find((a) => a.activityId === activityId);
          return {
            activityId: Number(activity.activityId),
            slotNumber: movingActivity?.slotNumber ?? activity.slotNumber,
          };
        } else {
          return {
            activityId: Number(activity.activityId),
            slotNumber: activity.slotNumber,
          };
        }
      });

      await tripService.reorderActivities(tripId, currentDay.day, updates);
      await refetch();
      toast.success('Activity moved successfully');
    } catch (error) {
      console.error('Failed to reorder activities:', error);
      toast.error('Failed to move activity', {
        description: 'There was a problem rescheduling the activity. Please try again.',
      });
    }
  };

  return (
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
      <div className="flex h-full w-full flex-col md:w-1/2">
        <Card className="h-full overflow-auto border-none bg-white shadow-lg dark:bg-green-800/30 dark:shadow-green-900/20">
          <ItineraryList
            day={currentDay.day}
            activities={currentDay.activities}
            selectedActivityId={selectedActivityId}
            onActivitySelect={handleActivitySelect}
            onSlotChange={handleSlotChange}
          />
        </Card>
      </div>
    </div>
  );
}
