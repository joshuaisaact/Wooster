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
    id: number;
    destination: string;
    num_days: number;
    date: string;
    itinerary: ItineraryItem[];
  }[];
}

function flattenItinerary(trip) {
  if (trip.itinerary && Array.isArray(trip.itinerary.itinerary)) {
    // Itinerary is nested, flatten it
    return trip.itinerary.itinerary;
  }
  // Itinerary is already in the expected format
  return trip.itinerary;
}

function Trip({ trips }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(0);

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) return <p>Trip not found</p>;

  const flattenedItinerary = flattenItinerary(trip);

  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>{trip.destination}</Header>
      <h2>{trip.num_days} days</h2>
      <ul>
        {flattenedItinerary.map((item) => (
          <li key={item.day}>
            <h2 className="flex justify-center py-10">Day {item.day}</h2>
            <ul className="flex gap-5">
              {item.activities.map((activity, index) => (
                <li key={index}>
                  <Activity activity={activity} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trip;
