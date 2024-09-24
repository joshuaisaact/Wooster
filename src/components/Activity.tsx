import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, DollarSignIcon, CheckCircleIcon } from 'lucide-react';
import { Activity as ActivityType } from '@/types/types';

interface ActivityProps {
  activity: ActivityType;
  isSelected: boolean;
  onSelect: () => void;
}

function Activity({ activity, isSelected, onSelect }: ActivityProps) {
  const { activity_name, description, location, price } = activity;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  return (
    <Card
      className={`flex w-full max-w-sm flex-col overflow-hidden border ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
      } relative cursor-pointer text-gray-900 shadow-md transition-colors duration-200 ease-in-out`} // Added relative positioning
      onClick={onSelect}
    >
      <CardHeader className="flex flex-shrink-0 flex-row justify-between">
        <CardTitle className="text-2xl">{activity_name}</CardTitle>
        {isSelected && (
          <img
            src="/wooster-look-left-no-bg.png" // URL of the image
            alt={`${activity_name} image`} // Alternative text for the image
            className="absolute right-2 top-2 h-16 w-16" // Style for the image
          />
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className={`${isSelected ? 'text-gray-800' : 'text-muted-foreground'}`}>{description}</p>
      </CardContent>
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
    </Card>
  );
}

export default Activity;
