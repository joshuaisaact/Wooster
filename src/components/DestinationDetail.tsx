import React from 'react';
import { Destination } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer, Globe, Info } from 'lucide-react';
import Map from './Map';

interface DestinationDetailProps {
  destination: Destination;
}

function DestinationDetail({ destination }: DestinationDetailProps) {
  return (
    <div className="flex h-[800px] w-full flex-col gap-4 md:flex-row">
      <div className="h-full w-full md:w-1/2">
        <Map
          latitude={destination.latitude}
          longitude={destination.longitude}
          destinationName={destination.destination_name}
          className="h-full w-full"
        />
      </div>
      <Card className="h-full w-full overflow-auto md:w-1/2">
        <CardHeader>
          <CardTitle className="text-2xl">{destination.destination_name}</CardTitle>
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
        </CardContent>
      </Card>
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
