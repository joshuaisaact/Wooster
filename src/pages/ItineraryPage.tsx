import Activity from '@/components/Activity';
import Map from '@/components/Map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity as ActivityType } from '@/types/types';
import { useState, useRef } from 'react';

type ItineraryPageProps = {
  currentDay: {
    day: number;
    activities: ActivityType[];
  };
};

function ItineraryPage({ currentDay }: ItineraryPageProps) {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleActivitySelect = (activityId: number) => {
    setSelectedActivityId(activityId);

    const selectedActivity = currentDay.activities.find(
      (activity) => activity.activityId === activityId,
    );

    // If the activity is found and the map ref is available, move the map
    if (selectedActivity && mapRef.current) {
      mapRef.current.flyTo([selectedActivity.latitude, selectedActivity.longitude], 15);
    }
  };

  return (
    <div className="flex h-[800px] w-full flex-col items-center justify-center gap-4 md:flex-row">
      <div className="h-full w-full md:w-1/2">
        <Map
          activities={currentDay.activities}
          selectedActivityId={selectedActivityId} // Pass the selected activity ID directly
          ref={mapRef}
        />
      </div>
      <Card className="h-full overflow-auto md:w-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Activities for Day {currentDay.day}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="flex flex-col gap-4">
            {currentDay.activities.map((activity) => (
              <li key={activity.activityId}>
                <Activity
                  activity={activity}
                  isSelected={selectedActivityId === activity.activityId}
                  onSelect={() => handleActivitySelect(activity.activityId)}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ItineraryPage;
