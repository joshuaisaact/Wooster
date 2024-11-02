import { Map } from '@/components/shared/map';
import { Destination } from '@/types/types';

interface TripPreviewMapProps {
  destination: Destination;
}

export function TripPreviewMap({ destination }: TripPreviewMapProps) {
  if (!destination.latitude || !destination.longitude) return null;

  return (
    <div className="h-48 w-full md:w-64">
      {' '}
      {/* Adjust width as needed */}
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
