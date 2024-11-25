import { Destination } from '@/types';
import { Map } from '../shared/map';
import DeleteDestinationButton from './buttons/DeleteDestinationButton';
import { useState } from 'react';
import { MapPinIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import CreateTrip from '../shared/CreateTrip';
import { formatTemperature } from '@/utils/temperature';
import { SaveDestinationButton } from './buttons/SaveDestinationButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

interface DestinationViewProps {
  destination: Destination;
}

function DestinationView({ destination }: DestinationViewProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);

  const hasMapCoordinates = destination.latitude && destination.longitude;

  return (
    <div className={cn('space-y-8 transition-all duration-300')}>
      {/* Hero Section */}
      <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
        <div className="p-6 md:p-8">
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold text-green-900 dark:text-white/95">
                  {destination.destinationName}
                </h1>
                <SaveDestinationButton destination={destination} />
              </div>
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

      {/* Trip Creation Dialog */}
      <Dialog open={tripCreationOpen} onOpenChange={setTripCreationOpen} modal={false}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <DialogTitle className="text-lg font-semibold text-green-900 dark:text-white/95">
              Plan Your Trip
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-800 hover:text-green-900 dark:text-green-100 dark:hover:text-white"
              onClick={() => setTripCreationOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <div className="space-y-6">
            <CreateTrip
              location={destination}
              onClose={() => setTripCreationOpen(false)}
              title={true}
            />
          </div>
        </DialogContent>
      </Dialog>
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
