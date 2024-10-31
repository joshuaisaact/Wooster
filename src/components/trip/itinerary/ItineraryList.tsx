import { Activity as ActivityType } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityCard } from '@/components/activities';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ItineraryListProps {
  day: number;
  activities: ActivityType[];
  selectedActivityId: number | null;
  onActivitySelect: (id: number) => void;
}

export function ItineraryList({
  day,
  activities,
  selectedActivityId,
  onActivitySelect,
}: ItineraryListProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="border-b bg-white/50 pb-4">
        <CardTitle className="text-xl font-semibold text-green-900">Day {day}</CardTitle>
        <p className="text-sm text-gray-600">
          {activities.length} {activities.length === 1 ? 'activity' : 'activities'} planned
        </p>
      </CardHeader>

      <ScrollArea className="flex-1 px-6">
        <CardContent className="py-6">
          {activities.length > 0 ? (
            <ul className="space-y-4">
              {activities.map((activity) => (
                <li key={activity.activityId}>
                  <ActivityCard
                    activity={activity}
                    isSelected={selectedActivityId === activity.activityId}
                    onSelect={() => onActivitySelect(activity.activityId)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-32 items-center justify-center text-gray-500">
              No activities planned for this day yet
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
