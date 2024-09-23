import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Trip } from '@/types/types';
import { Link } from 'react-router-dom';

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  const { trip_id, destination_name, num_days, start_date } = trip;

  return (
    <Link to={`/trips/${trip_id}`}>
      <Card className="flex flex-col transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            <span>Trip to {destination_name}</span>
            <span>{start_date}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <div className="mb-4"></div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              <span className="truncate">{destination_name}</span>
            </Badge>
            <Badge variant="secondary" className="mt-auto flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              {num_days} {num_days === 1 ? 'day' : 'days'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default TripCard;
