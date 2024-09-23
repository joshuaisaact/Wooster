import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import DayNav from '@/components/DayNav';
import { Destination, Trip as TripType } from '@/types/types';
import ItineraryPage from './ItineraryPage';
import DestinationDetail from '@/components/DestinationDetail';

interface TripProps {
  trips: TripType[];
  destinations: Destination[];
}

function flattenItinerary(trip: { itinerary }) {
  if (trip.itinerary && Array.isArray(trip.itinerary.itinerary)) {
    // Itinerary is nested, flatten it
    return trip.itinerary.itinerary;
  }
  // Itinerary is already in the expected format
  return trip.itinerary;
}

function Trip({ trips, destinations }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(1); // Start from day 1

  // useEffect(() => {
  //   const fetchDestination = async () => {
  //     // Check if trip exists locally first

  //     const localTrip = trips.find((t) => t.trip_id === tripId);
  //     if (localTrip) {
  //       setDestination(localTrip.destination); // Set local destination
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`http://localhost:4000/trips/${tripId}`);
  //       const data = await response.json();
  //       setDestination(data.destination); // Assuming data has a destination property
  //     } catch (error) {
  //       console.error('Error fetching trip data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchDestination();
  // }, [tripId]);

  const trip = trips.find((t) => t.trip_id === tripId);
  const destination = destinations.find((d) => d.destination_name === trip.destination_name);

  if (!trip) return <p>Trip not found</p>;

  const flattenedItinerary = flattenItinerary(trip);

  const currentDayItinerary = flattenedItinerary[currentDay - 1];

  return (
    <div className="text-text flex h-full w-full flex-col pt-10">
      <div className="flex flex-col items-center justify-center">
        <Header>{trip.destination_name}</Header>
        <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>
      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        <DestinationDetail destination={destination} />
      ) : (
        <>
          <h2 className="flex justify-center py-10">{currentDayItinerary.date}</h2>
          <div className="flex w-full">
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
