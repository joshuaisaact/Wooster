import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Activity from '../components/Activity';
import Header from '../components/Header';

interface ActivityProps {
  name: string;
  description: string;
  location: string;
  price: string;
}

interface ItineraryItem {
  day: number;
  activities: ActivityProps[];
}

interface TripProps {
  trips: {
    id: string; // Ensure this is a string if using tripId from params
    destination: string;
    num_days: number;
    date: string;
    itinerary: ItineraryItem[];
  }[];
}

function flattenItinerary(trip: { itinerary: any }) {
  if (trip.itinerary && Array.isArray(trip.itinerary.itinerary)) {
    // Itinerary is nested, flatten it
    return trip.itinerary.itinerary;
  }
  // Itinerary is already in the expected format
  return trip.itinerary;
}

function Trip({ trips }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(1); // Start from day 1

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) return <p>Trip not found</p>;

  // Debugging: Check trip and flattened itinerary
  console.log('Trip:', trip);
  const flattenedItinerary = flattenItinerary(trip);
  console.log('Flattened Itinerary:', flattenedItinerary);

  const currentDayItinerary = flattenedItinerary[currentDay - 1];

  // Debugging: Check current day and filtered itinerary
  console.log('Current Day:', currentDay);
  console.log('Current Day Itinerary:', currentDayItinerary);

  const handlePrevDay = () => {
    setCurrentDay((prevDay) => Math.max(prevDay - 1, 1));
  };

  const handleNextDay = () => {
    setCurrentDay((prevDay) => Math.min(prevDay + 1, trip.num_days));
  };

  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>{trip.destination}</Header>
      <h2>{trip.num_days} days</h2>
      <div className="mb-4 flex gap-4">
        <button onClick={handlePrevDay} disabled={currentDay === 1}>
          Previous Day
        </button>
        <button onClick={handleNextDay} disabled={currentDay === trip.num_days}>
          Next Day
        </button>
      </div>
      <ul>
        {currentDayItinerary && currentDayItinerary.activities.length > 0 ? (
          <ul>
            <h2 className="flex justify-center py-10">Day {currentDay}</h2>
            {currentDayItinerary.activities.map((activity, index) => (
              <li key={index}>
                <Activity activity={activity} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities for Day {currentDay}</p>
        )}
      </ul>
    </div>
  );
}

export default Trip;
