import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

interface TripBadgesProps {
  numDays: number;
  country: string;
}

export function TripBadges({ numDays, country }: TripBadgesProps) {
  return (
    <div className="mt-auto flex items-center justify-between">
      <Badge variant="secondary" className="flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        <span>
          {numDays} {numDays === 1 ? 'day' : 'days'}
        </span>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        <MapPinIcon className="h-4 w-4" />
        <span className="truncate">{country}</span>
      </Badge>
    </div>
  );
}
