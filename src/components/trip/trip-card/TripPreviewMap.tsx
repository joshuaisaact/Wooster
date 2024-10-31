import { Map } from '@/components/shared/map';
import { Destination } from '@/types/types';

interface TripPreviewMapProps {
  destination: Destination;
}

export function TripPreviewMap({ destination }: TripPreviewMapProps) {
  if (!destination.latitude || !destination.longitude) return null;

  return (
    <div className="hidden h-48 w-80 lg:block">
      <Map
        latitude={destination.latitude}
        longitude={destination.longitude}
        className="h-full w-full rounded-lg shadow-md"
        isInteractive={false}
        showZoomControls={false}
      />
    </div>
  );
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
