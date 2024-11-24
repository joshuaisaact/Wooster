import React, { useState } from 'react';
import { Destination } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer, Globe, Info } from 'lucide-react';
import { Map } from './shared/map';
import CreateTrip from './shared/CreateTrip';
import { Trip as TripType } from '@/types';
import DeleteTripButton from './trip/DeleteTripButton';
import DeleteDestinationButton from './destination/DeleteDestinationButton';
import { formatTemperature } from '@/utils/temperature';
import { Link } from 'react-router-dom';

interface DestinationDetailProps {
  destination: Destination;
  trip?: TripType;
  onDeleteTrip?: (tripId: string) => void;
}

function DestinationDetail({ destination, trip }: DestinationDetailProps) {
  const [tripCreationOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      {/* Map Section */}
      <div className="h-80 md:h-[800px] md:w-1/2">
        {destination.latitude && destination.longitude ? (
          <Map
            latitude={destination.latitude}
            longitude={destination.longitude}
            className="h-full w-full"
          />
        ) : (
          <p className="text-gray-700 dark:text-green-100/70">
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
            <div className="flex items-center justify-between">
              <Link
                to={`/destinations/${destination.destinationName}`}
                className="transition-colors hover:text-green-600 dark:hover:text-green-400"
              >
                <CardTitle className="text-2xl text-gray-900 dark:text-white/95">
                  {destination.destinationName}
                </CardTitle>
              </Link>

              <Link
                to={`/destinations/${destination.destinationName}/activities`}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-green-900 transition-colors hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40"
              >
                View Activities
              </Link>
            </div>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900/60 dark:text-green-100"
              >
                <MapPinIcon className="h-3 w-3" />
                <span>{destination.country}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900/60 dark:text-green-100"
              >
                💰 {destination.costLevel}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 dark:bg-green-900/60 dark:text-green-100"
              >
                🛡️ {destination.safetyRating}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-green-100/70">{destination.description}</p>

            {/* Information Items */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                icon={<Calendar className="h-4 w-4" />}
                label="Best Time to Visit"
                value={destination.bestTimeToVisit}
              />
              <InfoItem
                icon={<Thermometer className="h-4 w-4" />}
                label="Temperature Range"
                value={formatTemperature(
                  Number(destination.averageTemperatureLow),
                  Number(destination.averageTemperatureHigh),
                )}
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
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">
                Popular Activities
              </h3>
              <p className="text-sm text-gray-600 dark:text-green-100/70">
                {destination.popularActivities}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">Travel Tips</h3>
              <p className="text-sm text-gray-600 dark:text-green-100/70">
                {destination.travelTips}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">Local Cuisine</h3>
              <p className="text-sm text-gray-600 dark:text-green-100/70">
                {destination.localCuisine}
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">
                Cultural Significance
              </h3>
              <p className="text-sm text-gray-600 dark:text-green-100/70">
                {destination.culturalSignificance}
              </p>
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
            className="mt-4 h-auto opacity-80 dark:opacity-60 dark:hover:opacity-80"
            alt="Map Planning"
          />
        </div>
      )}
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-600 dark:text-green-100/70">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white/95">{label}</p>
        <p className="text-sm text-gray-600 dark:text-green-100/70">{value}</p>
      </div>
    </div>
  );
}

export default DestinationDetail;
