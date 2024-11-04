import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TripHeaderProps {
  destinationName: string;
  onShare: () => void;
}

export function TripHeader({ destinationName, onShare }: TripHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-bold text-gray-900 dark:text-green-100 sm:text-xl md:text-2xl">
        {destinationName} Trip
      </h1>
      <Button
        size="sm"
        className="flex items-center bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:text-green-100 dark:hover:bg-green-600"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Share</span>
      </Button>
    </div>
  );
}
