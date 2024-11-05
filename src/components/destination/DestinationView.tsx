import { Destination } from '@/types/types';
import { Map } from '../shared/map';
import DeleteDestinationButton from './DeleteDestinationButton';
import { useState } from 'react';
import { MapPinIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import CreateTrip from '../shared/CreateTrip';
import { formatTemperature } from '@/utils/temperature';

interface DestinationViewProps {
  destination: Destination;
}

function DestinationView({ destination }: DestinationViewProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);

  const hasMapCoordinates = destination.latitude && destination.longitude;

  return (
    <div className={cn('space-y-8 transition-all duration-300', tripCreationOpen ? 'mr-96' : '')}>
      {/* Hero Section */}
      <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
        <div className="p-6 md:p-8">
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-green-900 dark:text-white/95">
                {destination.destinationName}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-green-100/70">
                <MapPinIcon className="mr-1 h-4 w-4" />
                <span>{destination.country}</span>
              </div>
            </div>
            <p className="max-w-3xl text-gray-600 dark:text-green-100/70">
              {destination.description}
            </p>
            <div className="pt-4">
              <Button
                className="bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                onClick={() => setTripCreationOpen(true)}
              >
                Plan a Trip
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Map Section */}
        <div className="overflow-hidden rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
          {hasMapCoordinates ? (
            <Map
              latitude={destination.latitude}
              longitude={destination.longitude}
              className="h-[400px] w-full"
              isInteractive={true}
              showZoomControls={true}
            />
          ) : (
            <div className="flex h-[400px] w-full flex-col items-center justify-center space-y-3 bg-white/50 px-4 text-center dark:bg-green-800/20">
              <div className="rounded-full bg-gray-100 p-3 dark:bg-green-900/50">
                <MapPinIcon className="h-6 w-6 text-gray-400 dark:text-green-100/50" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-green-100/70">
                  No map available for this destination.
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100/50">
                  Coordinates haven't been set for this location.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="divide-y divide-gray-100 rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:divide-white/10 dark:bg-green-800/30 dark:shadow-green-900/20">
          <div className="space-y-6 p-6 md:p-8">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries({
                'Best Time to Visit': destination.bestTimeToVisit,
                'Temperature Range': formatTemperature(
                  Number(destination.averageTemperatureLow),
                  Number(destination.averageTemperatureHigh),
                ),

                Language: destination.officialLanguage,
                Currency: destination.currency,
              }).map(([label, value]) => (
                <InfoItem key={label} label={label} value={value} />
              ))}
            </section>

            {Object.entries({
              'Popular Activities': destination.popularActivities,
              'Travel Tips': destination.travelTips,
              'Local Cuisine': destination.localCuisine,
              'Cultural Significance': destination.culturalSignificance,
            }).map(([title, content]) => (
              <section key={title}>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white/95">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-green-100/70">{content}</p>
              </section>
            ))}
          </div>

          <div className="bg-gray-50/50 p-6 dark:bg-green-800/40 md:p-8">
            <div className="flex justify-end">
              <DeleteDestinationButton destinationId={destination.destinationId} />
            </div>
          </div>
        </div>
      </div>

      {tripCreationOpen && (
        <div className="fixed right-0 top-0 h-full w-96 overflow-y-auto border-l border-gray-100 bg-white/80 p-6 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-green-800/80">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-900 dark:text-white/95">
                Plan Your Trip
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTripCreationOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-green-100/70 dark:hover:text-green-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CreateTrip location={destination} onClose={() => setTripCreationOpen(false)} />
            <div className="mt-auto text-center">
              <img
                src="/wooster-on-maps-no-bg.png"
                alt="Wooster"
                className="mx-auto w-32 opacity-80 dark:opacity-60 dark:hover:opacity-80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-gray-700 dark:text-green-100">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-gray-600 dark:text-green-100/70">{value}</p>
    </div>
  );
}

export default DestinationView;
