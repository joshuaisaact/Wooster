import { TripTab } from '@/types/types';

interface TripNavigationProps {
  daysCount: number;
  activeTab: TripTab;
  onTabChange: (tab: TripTab) => void;
}

export function TripNavigation({ daysCount, activeTab, onTabChange }: TripNavigationProps) {
  return (
    <nav className="flex gap-2">
      <button
        onClick={() => onTabChange('summary')}
        className={`rounded px-4 py-2 transition-colors ${
          activeTab === 'summary'
            ? 'bg-green-600 text-white dark:bg-green-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700'
        }`}
      >
        Summary
      </button>
      {Array.from({ length: daysCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => onTabChange(i + 1)}
          className={`rounded px-4 py-2 transition-colors ${
            activeTab === i + 1
              ? 'bg-green-600 text-white dark:bg-green-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700'
          }`}
        >
          Day {i + 1}
        </button>
      ))}
    </nav>
  );
}
