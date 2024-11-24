import { Link } from 'react-router-dom';
import { Trip } from '@/types';

interface DayNavProps {
  trip: Trip;
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

function DayNav({ trip, currentDay, setCurrentDay }: DayNavProps) {
  return (
    <nav className="text-text mb-4">
      <ul className="flex gap-4">
        <Link to={`/trips/${trip.tripId}/summary/${trip.destination.destinationName}`}>
          <button
            className={`px-4 py-2 ${currentDay === 0 ? 'bg-gray-700 text-white' : 'text-text hover:bg-gray-700 hover:text-white'}`}
            onClick={() => {
              setCurrentDay(0); // 0 will represent the "Destination Summary"
            }}
          >
            Destination Summary
          </button>
        </Link>
        {Array.from({ length: trip.numDays }, (_, index) => (
          <li key={index}>
            <button
              className={`flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition-colors duration-200 ${
                currentDay === index + 1
                  ? 'bg-gray-700 text-white'
                  : 'text-text hover:bg-gray-700 hover:text-white'
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
