import React, { useState } from 'react';
import { Destination } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer, Globe, Info } from 'lucide-react';
import { Map } from './shared/map';
import CreateTrip from './shared/CreateTrip';
import { Trip as TripType } from '@/types/types';
import DeleteTripButton from './trip/DeleteTripButton';
import DeleteDestinationButton from './destination/DeleteDestinationButton';

interface DestinationDetailProps {
  destination: Destination;
  trip?: TripType;
  onDeleteTrip?: (tripId: string) => void;
}

function DestinationDetail({ destination, trip }: DestinationDetailProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      {/* Map Section */}
      <div className="h-80 md:h-[800px] md:w-1/2">
        {' '}
        {/* Ensure the height matches the itinerary map */}
        {/* Ensure Map always renders */}
        {destination.latitude && destination.longitude ? (
          <Map
            latitude={destination.latitude}
            longitude={destination.longitude}
            className="h-full w-full" // Ensure map fills the container
          />
        ) : (
          <p className="text-gray-700 dark:text-green-100">
            No map available for this destination.
          </p>
        )}
      </div>

      {/* Right Side - Destination Details */}
      <div
        className={`flex h-full w-full flex-col md:w-1/2 ${tripCreationOpen ? 'flex-grow' : ''}`}
      >
        <Card className="h-full overflow-auto border-none bg-white shadow-lg dark:bg-green-800/30 dark:shadow-green-900/20">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                {destination.destinationName}
              </CardTitle>
              <button
                className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                onClick={() => setTripCreationOpen(!tripCreationOpen)}
              >
                {tripCreationOpen ? 'Cancel' : 'Plan Trip'}
              </button>
            </div>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900 dark:text-green-100"
              >
                <MapPinIcon className="h-3 w-3" />
                <span>{destination.country}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900 dark:text-green-100"
              >
                💰 {destination.costLevel}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900 dark:text-green-100"
              >
                🛡️ {destination.safetyRating}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 text-gray-700 dark:text-green-100">
            <p className="text-muted-foreground">{destination.description}</p>

            {/* Information Items */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Best Time to Visit"
                value={destination.bestTimeToVisit}
              />
              <InfoItem
                icon={<Thermometer className="h-4 w-4" />}
                label="Avg. Temperature"
                value={`${destination.averageTemperatureLow}°F - ${destination.averageTemperatureHigh}°F`}
              />
              <InfoItem
                icon={<Globe className="h-4 w-4" />}
                label="Language"
                value={destination.officialLanguage}
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
              <p className="text-muted-foreground text-sm">{destination.popularActivities}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Travel Tips</h3>
              <p className="text-muted-foreground text-sm">{destination.travelTips}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Local Cuisine</h3>
              <p className="text-muted-foreground text-sm">{destination.localCuisine}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Cultural Significance</h3>
              <p className="text-muted-foreground text-sm">{destination.culturalSignificance}</p>
            </div>

            {/* Buttons */}
            {trip && (
              <div className="mt-4 flex justify-center">
                <DeleteTripButton tripId={trip.tripId} />
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <DeleteDestinationButton destinationId={destination.destinationId} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Create Trip Section (appears when button is clicked) */}
      {tripCreationOpen && (
        <div className="flex h-full flex-col justify-between">
          <CreateTrip location={destination} />
          <img
            src="/Wooster-map-planning.png"
            className="mt-4 h-auto opacity-80 dark:opacity-70"
            alt="Map Planning"
          />
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-700 dark:text-green-100">
      {icon}
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-sm">{value}</p>
      </div>
    </div>
  );
}

export default DestinationDetail;
