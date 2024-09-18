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
    itinerary: ItineraryItem[];
  }[];
}

function Trip({ trips }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const trip = trips.find((t) => t.id === Number(tripId));

  if (!trip) return <p>Trip not found</p>;

  const { itinerary } = trip;

  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>Trip to {trip.destination}</Header>
      <h2>{trip.num_days} days</h2>
      <ul>
        {itinerary.map((item) => (
          <li key={item.day}>
            <h3>Day {item.day}</h3>
            <ul>
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
