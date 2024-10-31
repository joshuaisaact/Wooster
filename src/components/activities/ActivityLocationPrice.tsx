import { Badge } from '@/components/ui/badge';
import { MapPinIcon, DollarSignIcon } from 'lucide-react';

interface ActivityLocationPriceProps {
  location: string;
  price: string | number;
}

export function ActivityLocationPrice({ location, price }: ActivityLocationPriceProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <div className="mt-2 flex flex-row flex-wrap justify-between gap-2 p-5">
      <Badge variant="secondary" className="flex items-center gap-1">
        <MapPinIcon className="h-3 w-3" />
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[150px] truncate transition-colors duration-200 hover:text-blue-600"
        >
          {location}
        </a>
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        <DollarSignIcon className="h-3 w-3" />
        {price}
      </Badge>
    </div>
  );
}
