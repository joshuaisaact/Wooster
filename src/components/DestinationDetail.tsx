import React, { useState } from 'react';
import { Destination } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer, Globe, Info } from 'lucide-react';
import Map from './Map';
import CreateTrip from './CreateTrip';
import { Button } from './ui/button';
import { Trip as TripType } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ui/ConfirmModal';

interface DestinationDetailProps {
  destination: Destination;
  addNewTrip?: (trip: TripType) => void;
  onDeleteDestination?: (destinationId: number) => void;
  trip?: TripType;
  onDeleteTrip?: (tripId: string) => void;
}

function DestinationDetail({
  destination,
  addNewTrip,
  onDeleteDestination,
  trip,
  onDeleteTrip,
}: DestinationDetailProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Control the confirm modal

  const navigate = useNavigate();

  const handleDeleteTrip = async () => {
    if (!trip) return;

    try {
      const response = await fetch(`http://localhost:4000/trips/${trip.trip_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from server:', errorDetails);
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('Trip deleted successfully');

      if (onDeleteTrip) {
        onDeleteTrip(trip.trip_id);
        console.log('onDeleteTrip called with:', trip.trip_id); // Add this log
      }

      navigate('/trips');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting trip:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  // Move handleDeleteDestination here, outside of handleDeleteTrip
  const handleDeleteDestination = async () => {
    const destination_id = destination?.destination_id;
    if (!destination_id) {
      console.error('No destination ID found');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this destination? This action is not reversible.',
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/destinations/${destination_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error response from server:', errorDetails);
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log('Destination deleted successfully');

      // Optionally, redirect to another page (e.g., back to the list of destinations)
      navigate('/destination-list');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error deleting destination:', error.message);
      } else {
        console.error('Unknown error occurred:', error);
      }
    }
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const confirmDeleteTrip = () => {
    closeConfirmModal();
    handleDeleteTrip();
  };

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="md:w-1/2">
        {/* Ensure Map always renders */}
        {destination.latitude && destination.longitude ? (
          <Map
            latitude={destination.latitude}
            longitude={destination.longitude}
            className="h-full w-full"
          />
        ) : (
          <p>No map available for this destination.</p>
        )}
      </div>

      {/* Right Side - Destination Details */}
      <div
        className={`flex h-full w-full flex-col md:w-1/2 ${tripCreationOpen ? 'flex-grow' : ''}`}
      >
        <Card className="h-full overflow-auto">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-2xl">{destination.destination_name}</CardTitle>
              {addNewTrip && (
                <button
                  className="bg-green-500 text-white"
                  onClick={() => setTripCreationOpen(!tripCreationOpen)}
                >
                  {tripCreationOpen ? 'Cancel' : 'Plan Trip'}
                </button>
              )}
            </div>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPinIcon className="h-3 w-3" />
                <span>{destination.country}</span>
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                💰 {destination.cost_level}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                🛡️ {destination.safety_rating}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{destination.description}</p>

            {/* Information Items */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Best Time to Visit"
                value={destination.best_time_to_visit}
              />
              <InfoItem
                icon={<Thermometer className="h-4 w-4" />}
                label="Avg. Temperature"
                value={`${destination.average_temperature_low}°F - ${destination.average_temperature_high}°F`}
              />
              <InfoItem
                icon={<Globe className="h-4 w-4" />}
                label="Language"
                value={destination.official_language}
              />
              <InfoItem
                icon={<Info className="h-4 w-4" />}
                label="Currency"
                value={destination.currency}
              />
            </div>

            {/* Other Information Sections */}
            <div>
              <h3 className="mb-2 font-semibold">Popular Activities</h3>
              <p className="text-muted-foreground text-sm">{destination.popular_activities}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Travel Tips</h3>
              <p className="text-muted-foreground text-sm">{destination.travel_tips}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Local Cuisine</h3>
              <p className="text-muted-foreground text-sm">{destination.local_cuisine}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Cultural Significance</h3>
              <p className="text-muted-foreground text-sm">{destination.cultural_significance}</p>
            </div>

            {/* Buttons */}
            {trip && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={openConfirmModal}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete Trip
                </Button>
              </div>
            )}
            {onDeleteDestination && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={handleDeleteDestination}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Delete Destination
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Create Trip Section (appears when button is clicked) */}
      {tripCreationOpen && (
        <div className="flex h-full flex-col justify-between">
          <CreateTrip
            location={destination.destination_name}
            addNewTrip={addNewTrip}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <img src="/Wooster-map-planning.png" className="mt-4 h-auto" alt="Map Planning" />
        </div>
      )}

      <ConfirmModal
        title="Confirm Trip Deletion"
        description="Are you sure you want to delete this trip? This action is irreversible."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isOpen={isConfirmModalOpen}
        onConfirm={confirmDeleteTrip}
        onCancel={closeConfirmModal}
      />
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-sm">{value}</p>
      </div>
    </div>
  );
}

export default DestinationDetail;
