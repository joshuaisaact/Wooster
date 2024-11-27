import { Trip, Destination } from '@/types';
import DestinationDetail from '../DestinationDetail';
import { TripTab } from '@/types';
import { ItineraryView } from './itinerary/ItineraryView';

interface TripContentProps {
  trip: Trip;
  destination: Destination | undefined;
  activeTab: TripTab;
  isSharedView?: boolean;
}

export function TripContent({ trip, destination, activeTab, isSharedView }: TripContentProps) {
  if (activeTab === 'summary') {
    return destination ? (
      <DestinationDetail destination={destination} trip={trip} isSharedView={isSharedView} />
    ) : (
      <p>Destination not found.</p>
    );
  }

  const currentDayItinerary = trip.itinerary[Number(activeTab) - 1];
  return currentDayItinerary?.activities?.length > 0 ? (
    <ItineraryView currentDay={currentDayItinerary} />
  ) : (
    <p>No activities for Day {activeTab}</p>
  );
}
