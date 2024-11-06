import { useState } from 'react';
import { ActivityCard } from '../activities';
import { Button } from '@/components/ui/button';
import { Activity } from '@/types/types';

interface DestinationActivitiesProps {
  destinationName: string;
  activities: Activity[];
}

const DestinationActivities = ({ destinationName, activities }: DestinationActivitiesProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 6;

  // Get unique categories from activities
  const categories = [...new Set(activities.map((a) => a.category))];

  // Filter activities by selected category
  const filteredActivities = selectedCategory
    ? activities.filter((a) => a.category === selectedCategory)
    : activities;

  // Paginate the filtered results
  const paginatedActivities = filteredActivities.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage(0);
          }}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-green-800 text-white dark:bg-green-700'
              : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
          }`}
        >
          All Activities
        </button>
        <div className="flex space-x-2">
          {categories
            .filter((category) => category !== null)
            .map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0);
                }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      {/* Activities grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {paginatedActivities.map((activity) => (
          <ActivityCard
            key={activity.activityId}
            activity={activity}
            isSelected={false}
            onSelect={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`,
                '_blank',
              );
            }}
          />
        ))}
      </div>

      {/* Empty state */}
      {paginatedActivities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-gray-600 dark:text-green-100/70">
            No activities found {selectedCategory ? `in category "${selectedCategory}"` : ''} for{' '}
            {destinationName}.
          </p>
          {selectedCategory && (
            <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory(null)}>
              Show all activities
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-green-700/30">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-green-100/70">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DestinationActivities;
