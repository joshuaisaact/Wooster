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
    <Card className="group h-full overflow-hidden border-none bg-white/70 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl dark:bg-green-800/30 dark:shadow-green-900/20 dark:hover:bg-green-800/40">
      <CardHeader className="border-b border-gray-100 bg-white/50 p-6 dark:border-white/10 dark:bg-green-800/20">
        <CardTitle className="text-xl font-bold text-green-900 group-hover:text-green-800 dark:text-white/95 dark:group-hover:text-white">
          Day {day}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-green-100/70">
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
