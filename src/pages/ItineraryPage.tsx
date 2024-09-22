import Activity from '@/components/Activity';
import Map from '@/components/Map';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity as ActivityType } from '@/types/types';

type ItineraryPageProps = {
  currentDay: {
    day: number;
    activities: ActivityType[];
  };
};

function ItineraryPage({ currentDay }: ItineraryPageProps) {
  return (
    <div className="flex h-[800px] w-full flex-col gap-4 md:flex-row">
      <div className="h-full w-full md:w-1/2">
        <Map activities={currentDay.activities} />
      </div>
      <Card className="h-full overflow-auto md:w-auto">
        {' '}
        {/* Changed md:w-1/2 to md:w-auto */}
        <CardHeader>
          <CardTitle className="text-2xl">Activities for Day {currentDay.day}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="flex flex-col gap-4">
            {currentDay.activities.map((activity, index) => (
              <li key={index}>
                <Activity activity={activity} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default ItineraryPage;
