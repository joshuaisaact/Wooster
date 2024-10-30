import { Activity as ActivityType } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Activity from '@/components/Activity';

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
    <Card className="h-full overflow-auto md:w-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Activities for Day {day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="flex flex-col gap-4">
          {activities.map((activity) => (
            <li key={activity.activityId}>
              <Activity
                activity={activity}
                isSelected={selectedActivityId === activity.activityId}
                onSelect={() => onActivitySelect(activity.activityId)}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
