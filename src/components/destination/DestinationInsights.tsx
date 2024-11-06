import { Activity } from '@/types/types';
import { LineChart, Clock, DollarSign, Star, Tag, Gauge } from 'lucide-react';

interface DestinationInsightsProps {
  destinationName: string;
  activities: Activity[];
}

const DestinationInsights = ({ destinationName, activities }: DestinationInsightsProps) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-green-100/50 p-3 dark:bg-green-800/30">
          <LineChart className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white/90">
          No Activity Data Available
        </h3>
        <p className="mt-2 max-w-sm text-sm text-gray-600 dark:text-green-100/70">
          Once activities are added for {destinationName}, you'll see insights here.
        </p>
      </div>
    );
  }

  const avgPrice = Math.round(
    activities.reduce((sum, act) => {
      const price = parseInt(act.price.replace(/[^0-9]/g, '')) || 0;
      return sum + price;
    }, 0) / activities.length,
  );

  const bestValue = activities.reduce(
    (best, act) => {
      const price = parseInt(act.price.replace(/[^0-9]/g, '')) || 0;
      const duration = parseInt(act.duration) || 0;
      const valueRatio = duration / (price || 1);
      return valueRatio > best.ratio ? { activity: act, ratio: valueRatio } : best;
    },
    { activity: activities[0], ratio: 0 },
  );

  const popularTimes = {
    Morning: activities.filter((a) => a.bestTime?.toLowerCase().includes('morning')).length,
    Afternoon: activities.filter((a) => a.bestTime?.toLowerCase().includes('afternoon')).length,
    Evening: activities.filter((a) => a.bestTime?.toLowerCase().includes('evening')).length,
  };

  const mostPopularTime = Object.entries(popularTimes).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

  const categories = [...new Set(activities.map((a) => a.category))];

  return (
    <div className="space-y-6">
      {/* Key stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white/80 p-6 shadow-sm dark:bg-green-800/40">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-medium text-gray-900 dark:text-white/90">Best Time</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
            Most activities are best in the {mostPopularTime.toLowerCase()}
          </p>
        </div>

        <div className="rounded-lg bg-white/80 p-6 shadow-sm dark:bg-green-800/40">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-medium text-gray-900 dark:text-white/90">Average Cost</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
            Activities typically cost around ${avgPrice}
          </p>
        </div>

        <div className="rounded-lg bg-white/80 p-6 shadow-sm dark:bg-green-800/40">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-medium text-gray-900 dark:text-white/90">Best Value</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
            Try {bestValue.activity.activityName}
          </p>
        </div>
      </div>

      {/* Additional insights in a 2-column grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Popular categories */}
        <div className="rounded-lg bg-white/80 p-6 shadow-sm dark:bg-green-800/40">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-medium text-gray-900 dark:text-white/90">Popular Activities</h3>
          </div>
          <div className="space-y-2">
            {categories.slice(0, 3).map((category) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-green-100/70">{category}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white/90">
                  {activities.filter((a) => a.category === category).length} activities
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty distribution */}
        <div className="rounded-lg bg-white/80 p-6 shadow-sm dark:bg-green-800/40">
          <div className="mb-4 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-medium text-gray-900 dark:text-white/90">Activity Levels</h3>
          </div>
          <div className="space-y-2">
            {['Easy', 'Moderate', 'Challenging'].map((level) => (
              <div key={level} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-green-100/70">{level}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white/90">
                  {
                    activities.filter((a) =>
                      a.difficulty?.toLowerCase().includes(level.toLowerCase()),
                    ).length
                  }{' '}
                  activities
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationInsights;
