import { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Activity from '../components/Activity';
import Header from '../components/Header';
import DayNav from '@/components/DayNav';
import DestinationDetail from '@/components/DestinationDetail';
import { ActivityProps, Destination, ItineraryItem, Trip as TripType } from '@/types/types';
import ItineraryPage from './ItineraryPage';

interface TripProps {
  trips: TripType[];
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
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`http://localhost:4000/trips/${tripId}`);
        const data = await response.json();
        setDestination(data.destination); // Assuming data has a destination property
      } catch (error) {
        console.error('Error fetching trip data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestination();
  }, [tripId]);

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) return <p>Trip not found</p>;

  const flattenedItinerary = flattenItinerary(trip);

  const currentDayItinerary = flattenedItinerary[currentDay - 1];

  return (
    <div className="flex h-full w-full flex-col pt-10">
      <div className="flex flex-col items-center justify-center">
        <Header>{trip.destination_name}</Header>
        <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>
      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        <Outlet />
      ) : (
        <>
          <h2 className="flex justify-center py-10">{currentDayItinerary.date}</h2>
          <div className="flex w-full">
            {' '}
            {/* Added a div to ensure full width for the itinerary */}
            {currentDayItinerary && currentDayItinerary.activities.length > 0 ? (
              <ItineraryPage currentDay={currentDayItinerary} />
            ) : (
              <p>No activities for Day {currentDay}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default Trip;
