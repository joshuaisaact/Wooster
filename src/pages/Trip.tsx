import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DayNav from '@/components/DayNav';
import { Destination, Trip as TripType } from '@/types/types';
import ItineraryPage from './ItineraryPage';
import DestinationDetail from '@/components/DestinationDetail';
import { Share2 } from 'lucide-react'; // Importing an icon for the share button
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { useAppContext } from '@/hooks/useAppContext';

function flattenItinerary(trip: TripType) {
  if (trip.itinerary && Array.isArray(trip.itinerary)) {
    return trip.itinerary;
  }
  return trip.itinerary;
}

function Trip() {
  const { state } = useAppContext();
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(0); // Start from day 1

  const { trips, destinations } = state;

  const trip = trips.find((t: TripType) => t.tripId === tripId);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my trip to ${trip?.destinationName}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  if (!trip) {
    return <p>Trip not found</p>;
  }

  const selectedDestination = destinations.find(
    (d: Destination) => d.destinationName === trip.destinationName,
  );

  const flattenedItinerary = flattenItinerary(trip);
  const currentDayItinerary = flattenedItinerary ? flattenedItinerary[currentDay - 1] : [];

  return (
    <div className="flex h-full w-full flex-col pt-10 text-text">
      <div className="mb-4 flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">{trip.destinationName} Trip</h1>
        <Button
          className="flex items-center bg-green-600 text-white hover:bg-blue-600"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Trip
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center">
        <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>

      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        selectedDestination ? (
          <DestinationDetail destination={selectedDestination} trip={trip} />
        ) : (
          <p>Destination not found.</p>
        )
      ) : (
        <div className="flex w-full">
          {currentDayItinerary && currentDayItinerary.activities.length > 0 ? (
            <ItineraryPage currentDay={currentDayItinerary} />
          ) : (
            <p>No activities for Day {currentDay}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Trip;
