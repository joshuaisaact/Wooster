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
    <Card
      onClick={onSelect}
      className="relative cursor-pointer transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-green-800/30 dark:hover:shadow-green-900/20"
    >
      {isSelected && (
        <div className="absolute -right-2 -top-2 z-10">
          <CheckCircle className="h-6 w-6 fill-white text-green-500 dark:text-green-400" />
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-start justify-between text-xl font-semibold">
          <span className="text-green-900 dark:text-white/95">{activity.activityName}</span>
          <Badge
            variant="outline"
            className="text-xs dark:border-green-100/20 dark:bg-green-900/60 dark:text-green-100"
          >
            <Tag className="mr-1 h-3 w-3" /> {activity.category}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-3 text-sm text-gray-600 dark:text-green-100/70">
          {activity.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <DollarSignIcon className="mr-2 h-4 w-4 text-gray-400 dark:text-green-100/50" />
            <span>{activity.price}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Clock className="mr-2 h-4 w-4 text-gray-400 dark:text-green-100/50" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Gauge className="mr-2 h-4 w-4 text-gray-400 dark:text-green-100/50" />
            <span>{activity.difficulty}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-green-100/70">
            <Sun className="mr-2 h-4 w-4 text-gray-400 dark:text-green-100/50" />
            <span>{activity.bestTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/10">
        <div className="flex items-center text-sm text-gray-600 dark:text-green-100/70">
          <MapPinIcon className="mr-1 h-4 w-4 text-gray-400 dark:text-green-100/50" />
          <span className="max-w-[200px] truncate">{activity.location}</span>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="ml-2 rounded-full p-2 text-gray-500 transition-all duration-200 hover:bg-green-50 hover:text-green-700 dark:text-green-100/70 dark:hover:bg-green-700/50 dark:hover:text-green-100"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
