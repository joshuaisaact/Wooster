import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TripHeaderProps {
  destinationName: string;
  onShare: () => void;
}

export function TripHeader({ destinationName, onShare }: TripHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-green-100">
        {destinationName} Trip
      </h1>
      <Button
        className="flex items-center bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
        onClick={onShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share Trip
      </Button>
    </div>
  );
}
