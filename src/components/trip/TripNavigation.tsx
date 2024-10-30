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
        className={`rounded px-4 py-2 ${
          activeTab === 'summary' ? 'bg-green-600 text-white' : 'bg-gray-100'
        }`}
      >
        Summary
      </button>
      {Array.from({ length: daysCount }).map((_, i) => (
        <button
          key={i}
          onClick={() => onTabChange(i + 1)}
          className={`rounded px-4 py-2 ${
            activeTab === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-100'
          }`}
        >
          Day {i + 1}
        </button>
      ))}
    </nav>
  );
}
