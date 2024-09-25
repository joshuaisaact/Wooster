import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Destination, Trip } from '@/types/types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Map from './Map';

interface TripCardProps {
  trip: Trip;
  destination?: Destination | null | undefined;
}

function TripCard({ trip, destination }: TripCardProps) {
  // Check if destination is defined and has required properties
  if (!destination || !destination.latitude || !destination.longitude) {
    return null; // Return null to avoid rendering if the destination is not ready
  }

  const { trip_id, destination_name, num_days, start_date } = trip;
  const formatted_start_date = format(start_date, 'E, do MMMM yyyy');

  return (
    <Link to={`/trips/${trip_id}`}>
      <div className="flex w-full flex-row items-stretch gap-1">
        <div className="w-1/3">
          <Map
            latitude={destination.latitude}
            longitude={destination.longitude}
            className="h-full rounded-lg shadow-md"
            isInteractive={false}
            showZoomControls={false}
          />
        </div>
        <div className="w-2/3">
          <Card className="flex flex-col rounded-lg transition-all hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{destination_name}</CardTitle>
              <p className="text-sm text-gray-500">{formatted_start_date}</p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="mb-2 flex justify-between"></div>
              <p className="mb-4 text-sm text-gray-600">{destination.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {num_days} {num_days === 1 ? 'day' : 'days'}
                  </span>
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span className="truncate">{destination.country}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
