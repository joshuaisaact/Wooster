import { ItineraryItem } from '@/types/types';

interface DayNavProps {
  trip: {
    id: string;
    destination: string;
    num_days: number;
    date: string;
    itinerary: ItineraryItem[];
  };
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

function DayNav({ trip, currentDay, setCurrentDay }: DayNavProps) {
  return (
    <nav className="mb-4">
      <ul className="flex gap-4">
        {Array.from({ length: trip.num_days }, (_, index) => (
          <li key={index}>
            <button
              className={`flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
                currentDay === index + 1
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setCurrentDay(index + 1)}
            >
              Day {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default DayNav;
