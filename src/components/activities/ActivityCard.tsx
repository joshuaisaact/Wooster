import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import {
  MapPinIcon,
  DollarSignIcon,
  CheckCircle,
  ExternalLink,
  Clock,
  Sun,
  Gauge,
  Tag,
} from 'lucide-react';
import { Activity } from '@/types/types';

interface ActivityCardProps {
  activity: Activity;
  isSelected: boolean;
  onSelect: () => void;
}

export function ActivityCard({ activity, isSelected, onSelect }: ActivityCardProps) {
  return (
    <Card onClick={onSelect} className="relative cursor-pointer transition-shadow hover:shadow-lg">
      {isSelected && (
        <div className="absolute -right-2 -top-2 z-10">
          <CheckCircle className="h-6 w-6 fill-white text-green-500" />
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-start justify-between text-xl font-semibold">
          <span className="text-green-900">{activity.activityName}</span>
          <Badge variant="outline" className="text-xs">
            <Tag className="mr-1 h-3 w-3" /> {activity.category}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">{activity.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center text-gray-600">
            <DollarSignIcon className="mr-2 h-4 w-4 text-gray-400" />
            <span>{activity.price}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="mr-2 h-4 w-4 text-gray-400" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Gauge className="mr-2 h-4 w-4 text-gray-400" />
            <span>{activity.difficulty}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Sun className="mr-2 h-4 w-4 text-gray-400" />
            <span>{activity.bestTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="text-muted-foreground flex items-center text-sm">
          <MapPinIcon className="mr-1 h-4 w-4" />
          <span className="max-w-[200px] truncate">{activity.location}</span>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-muted-foreground ml-2 rounded-full p-2 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
