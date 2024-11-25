import { Trip, TripTab } from '@/types';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatItineraryDate } from '@/utils/dates';

interface TripNavigationProps {
  trip: Trip;
  activeTab: TripTab;
  onTabChange: (tab: TripTab) => void;
}

export function TripNavigation({ trip, activeTab, onTabChange }: TripNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActiveLabel = () => {
    if (activeTab === 'summary') return 'Summary';
    return `Day ${activeTab}`;
  };

  return (
    <div className="relative">
      {/* Desktop Navigation */}
      <nav className="hidden gap-2 md:flex">
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
        {Array.from({ length: trip.numDays }).map((_, i) => (
          <button
            key={i}
            onClick={() => onTabChange(i + 1)}
            className={`rounded px-4 py-2 transition-colors ${
              activeTab === i + 1
                ? 'bg-green-600 text-white dark:bg-green-700'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700'
            }`}
          >
            {formatItineraryDate(i + 1, new Date(trip.startDate))}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="py-2 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded bg-gray-100 px-4 py-2 text-gray-900 dark:bg-green-800 dark:text-green-100"
        >
          <span>{getActiveLabel()}</span>
          <ChevronDown
            className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 z-50 mt-1 grid gap-1 rounded-lg border bg-white p-1 shadow-lg dark:border-white/10 dark:bg-green-900">
            <button
              onClick={() => {
                onTabChange('summary');
                setIsOpen(false);
              }}
              className={`rounded px-4 py-2 text-left transition-colors ${
                activeTab === 'summary'
                  ? 'bg-green-600 text-white dark:bg-green-700'
                  : 'text-gray-900 hover:bg-gray-100 dark:text-green-100 dark:hover:bg-green-800'
              }`}
            >
              Summary
            </button>
            {Array.from({ length: trip.numDays }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  onTabChange(i + 1);
                  setIsOpen(false);
                }}
                className={`rounded px-4 py-2 text-left transition-colors ${
                  activeTab === i + 1
                    ? 'bg-green-600 text-white dark:bg-green-700'
                    : 'text-gray-900 hover:bg-gray-100 dark:text-green-100 dark:hover:bg-green-800'
                }`}
              >
                {formatItineraryDate(i + 1, new Date(trip.startDate))}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
