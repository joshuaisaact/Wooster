import { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Activity from '../components/Activity';
import Header from '../components/Header';
import DayNav from '@/components/DayNav';
import DestinationDetail from '@/components/DestinationDetail';

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
    destination_name: string;
    num_days: number;
    date: string;
    itinerary: ItineraryItem[];
  }[];
}

function flattenItinerary(trip: { itinerary }) {
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

  const flattenedItinerary = flattenItinerary(trip);

  const currentDayItinerary = flattenedItinerary[currentDay - 1];

  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>{trip.destination_name}</Header>

      <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />

      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        <Outlet />
      ) : (
        <>
          <h2 className="flex justify-center py-10">{currentDayItinerary.date}</h2>
          <ul className="flex">
            {currentDayItinerary && currentDayItinerary.activities.length > 0 ? (
              <ul className="flex flex-row gap-10">
                {currentDayItinerary.activities.map((activity: ActivityProps, index: number) => (
                  <li key={index}>
                    <Activity activity={activity} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activities for Day {currentDay}</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default Trip;
