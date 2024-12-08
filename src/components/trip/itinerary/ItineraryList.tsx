import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityCard } from '@/components/activities';
import { Activity as ActivityType } from '@/types';
import { Sunrise, Sun, Sunset } from 'lucide-react';
import { useState } from 'react';

interface TimeSlot {
  number: number;
  label: string;
  icon: React.ReactNode;
}

const TIME_SLOTS: TimeSlot[] = [
  {
    number: 1,
    label: 'Morning',
    icon: <Sunrise className="h-4 w-4 text-amber-500 dark:text-amber-400" />,
  },
  {
    number: 2,
    label: 'Afternoon',
    icon: <Sun className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />,
  },
  {
    number: 3,
    label: 'Evening',
    icon: <Sunset className="h-4 w-4 text-orange-500 dark:text-orange-400" />,
  },
];

interface ItineraryListProps {
  day: number;
  activities: ActivityType[];
  selectedActivityId: number | null;
  onActivitySelect: (id: number) => void;
  onSlotChange: (activityId: number, newSlot: number | null) => Promise<void>;
}

export function ItineraryList({
  day,
  activities,
  selectedActivityId,
  onActivitySelect,
  onSlotChange,
}: ItineraryListProps) {
  const [isReordering, setIsReordering] = useState(false);

  const handleSlotChange = async (activityId: number, newSlot: number | null) => {
    if (isReordering) return;
    setIsReordering(true);
    try {
      await onSlotChange(activityId, newSlot);
    } finally {
      setIsReordering(false);
    }
  };

  const getActivitiesForSlot = (slotNumber: number) =>
    activities.filter((activity) => activity.slotNumber === slotNumber);

  return (
    <>
      <CardHeader className="border-b border-gray-100 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-green-800/20 sm:px-6 sm:py-4">
        <CardTitle className="text-lg font-bold text-green-900 group-hover:text-green-800 dark:text-white/95 dark:group-hover:text-white sm:text-xl">
          Day {day}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-green-100/70">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'} planned
        </p>
      </CardHeader>

      <CardContent>
        <div className="divide-y divide-gray-100 dark:divide-green-700/30">
          {TIME_SLOTS.map((slot) => (
            <div key={slot.number} className="py-4 first:pt-0 last:pb-0">
              <div className="mb-3 flex items-center gap-2 py-2">
                {slot.icon}
                <h3 className="font-medium text-green-900 dark:text-white/90">{slot.label}</h3>
              </div>
              <div className="space-y-4">
                {getActivitiesForSlot(slot.number).map((activity) => (
                  <ActivityCard
                    key={activity.activityId}
                    activity={activity}
                    isSelected={selectedActivityId === activity.activityId}
                    onSelect={() => onActivitySelect(activity.activityId)}
                    onSlotChange={(newSlot) => handleSlotChange(activity.activityId, newSlot)}
                    disabled={isReordering}
                  />
                ))}
                {getActivitiesForSlot(slot.number).length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-200 p-4 text-center text-sm text-gray-500 dark:border-green-700/30 dark:text-green-100/50">
                    No activities planned for {slot.label.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
}
